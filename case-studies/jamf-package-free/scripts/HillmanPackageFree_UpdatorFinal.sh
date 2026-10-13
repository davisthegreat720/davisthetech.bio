#!/bin/zsh

###############################################################################
# Hillman Inc Package-Free Application Updater
#
# Jamf Pro Parameters:
#   $4 = Installomator label
#   $5 = Application display name
#   $6 = Application path
#   $7 = Process name
#   $8 = Deferral profile: standard | executive
#   $9 = Installomator DEBUG mode: 0 | 1 | 2
#
# Behavior:
#   - Updates installed applications only.
#   - Does NOT install an application that is absent.
#   - Closed applications update silently.
#   - Open applications receive swiftDialog messaging.
#   - User deferral state is persisted locally.
#   - Standard and Executive profiles calculate notification stage automatically.
#   - Application quit is graceful. No force-kill is performed.
#   - Installomator notifications remain silent.
#   - Successful remediation clears local timing state.
###############################################################################

set -u

###############################################################################
# PARAMETERS
###############################################################################

INSTALL_LABEL="${4:-}"
APP_NAME="${5:-}"
APP_PATH="${6:-}"
PROCESS_NAME="${7:-}"
DEFERRAL_PROFILE="${8:-standard}"
DEBUG_MODE="${9:-0}"

###############################################################################
# PATHS
###############################################################################

INSTALLER="/usr/local/Installomator/Installomator.sh"
DIALOG="/usr/local/bin/dialog"

STATE_ROOT="/Library/Application Support/Hillman/AppUpdates"

if [[ "$(id -u)" -eq 0 ]]; then
    LOG_FILE="/var/log/hillman-app-updates.log"
else
    LOG_FILE="/tmp/hillman-app-updates.log"
fi

###############################################################################
# TIMING_CONSTANTS
###############################################################################

SECONDS_PER_HOUR=3600
SECONDS_PER_DAY=86400

# Standard profile
# Day 0-3: Available
# Day 3-4: 48-hour warning
# Day 4-5: 24-hour warning
# Day 5+: Required
STANDARD_48_HOUR_START=$((3 * SECONDS_PER_DAY))
STANDARD_24_HOUR_START=$((4 * SECONDS_PER_DAY))
STANDARD_REQUIRED_START=$((5 * SECONDS_PER_DAY))

# Executive profile
# Day 0-5: Available
# Day 5-6: 48-hour warning
# Day 6-7: 24-hour warning
# Day 7+: Required
EXEC_48_HOUR_START=$((5 * SECONDS_PER_DAY))
EXEC_24_HOUR_START=$((6 * SECONDS_PER_DAY))
EXEC_REQUIRED_START=$((7 * SECONDS_PER_DAY))

###############################################################################
# LOGGING
###############################################################################

log() {
    local level="$1"
    shift
    local message="$*"

    echo "$(date '+%Y-%m-%d %H:%M:%S') [$level] [$APP_NAME] $message" \
        | tee -a "$LOG_FILE"
}

###############################################################################
# VALIDATE PARAMETERS
###############################################################################

if [[ -z "$INSTALL_LABEL" || -z "$APP_NAME" || -z "$APP_PATH" || -z "$PROCESS_NAME" ]]; then
    log "ERROR" "Missing required Jamf parameter."
    exit 1
fi

case "$DEFERRAL_PROFILE" in
    standard|executive)
        ;;
    *)
        log "ERROR" "Invalid deferral profile: $DEFERRAL_PROFILE. Expected standard or executive."
        exit 1
        ;;
esac

case "$DEBUG_MODE" in
    0|1|2)
        ;;
    *)
        log "ERROR" "Invalid DEBUG mode: $DEBUG_MODE. Expected 0, 1, or 2."
        exit 1
        ;;
esac

###############################################################################
# INSTALLED-ONLY GUARDRAIL
###############################################################################

if [[ ! -d "$APP_PATH" ]]; then
    log "INFO" "$APP_NAME is not installed at $APP_PATH. No action taken."
    exit 0
fi

###############################################################################
# VERSION_FUNCTION
###############################################################################

get_app_version() {
    local app_path="$1"
    local plist="${app_path}/Contents/Info.plist"
    local version=""

    if [[ ! -f "$plist" ]]; then
        return 1
    fi

    version=$(/usr/bin/defaults read "$plist" CFBundleShortVersionString 2>/dev/null)

    if [[ -z "$version" ]]; then
        return 1
    fi

    echo "$version"
}

CURRENT_VERSION="$(get_app_version "$APP_PATH")"

if [[ -z "$CURRENT_VERSION" ]]; then
    log "ERROR" "Unable to determine installed version."
    exit 1
fi

log "INFO" "Installed version: $CURRENT_VERSION"

###############################################################################
# DEPENDENCY CHECKS
###############################################################################

if [[ ! -x "$INSTALLER" ]]; then
    log "ERROR" "Installomator dependency not found at $INSTALLER."
    exit 1
fi

INSTALLER_VERSION="$("$INSTALLER" version 2>/dev/null)"

if [[ -n "$INSTALLER_VERSION" ]]; then
    log "INFO" "Installomator version: $INSTALLER_VERSION"
else
    log "WARN" "Unable to determine Installomator version."
fi

if [[ -x "$DIALOG" ]]; then
    DIALOG_VERSION="$("$DIALOG" --version 2>/dev/null)"

    if [[ -n "$DIALOG_VERSION" ]]; then
        log "INFO" "swiftDialog version: $DIALOG_VERSION"
    else
        log "WARN" "Unable to determine swiftDialog version."
    fi
else
    log "WARN" "swiftDialog not found at $DIALOG."
fi

###############################################################################
# DEBUG MODE
#
# DEBUG > 0 is intended for Installomator validation/testing.
# Do not create or modify production deferral state during debug testing.
###############################################################################

if [[ "$DEBUG_MODE" != "0" ]]; then

    log "INFO" "DEBUG mode $DEBUG_MODE enabled."
    log "INFO" "Running Installomator validation for label: $INSTALL_LABEL"

    "$INSTALLER" "$INSTALL_LABEL" \
        DEBUG="$DEBUG_MODE" \
        NOTIFY=silent

    INSTALL_EXIT=$?

    if [[ "$INSTALL_EXIT" -eq 0 ]]; then
        log "INFO" "Installomator DEBUG validation completed successfully."
        exit 0
    else
        log "ERROR" "Installomator DEBUG validation failed with exit code $INSTALL_EXIT."
        exit "$INSTALL_EXIT"
    fi
fi

###############################################################################
# STATE
###############################################################################

SAFE_APP_NAME="${APP_NAME// /_}"
SAFE_APP_NAME="${SAFE_APP_NAME//\//_}"

STATE_DIR="${STATE_ROOT}/${SAFE_APP_NAME}"
STATE_FILE="${STATE_DIR}/state"

mkdir -p "$STATE_DIR"

FIRST_SEEN_EPOCH=""
BASE_VERSION=""
NEXT_PROMPT_EPOCH="0"

if [[ -f "$STATE_FILE" ]]; then
    source "$STATE_FILE" 2>/dev/null
fi

NOW_EPOCH="$(date +%s)"

###############################################################################
# RESET STATE WHEN THE VERSION CHANGES OUTSIDE THIS WORKFLOW
###############################################################################

if [[ -n "${BASE_VERSION:-}" && "$BASE_VERSION" != "$CURRENT_VERSION" ]]; then
    log "INFO" "Installed version changed from tracked version $BASE_VERSION to $CURRENT_VERSION. Resetting update timing state."

    FIRST_SEEN_EPOCH="$NOW_EPOCH"
    BASE_VERSION="$CURRENT_VERSION"
    NEXT_PROMPT_EPOCH="0"
fi

###############################################################################
# INITIALIZE STATE
###############################################################################

if [[ -z "${FIRST_SEEN_EPOCH:-}" ]]; then
    FIRST_SEEN_EPOCH="$NOW_EPOCH"
fi

if [[ -z "${BASE_VERSION:-}" ]]; then
    BASE_VERSION="$CURRENT_VERSION"
fi

if [[ -z "${NEXT_PROMPT_EPOCH:-}" ]]; then
    NEXT_PROMPT_EPOCH="0"
fi

write_state() {
    cat > "$STATE_FILE" <<EOF
FIRST_SEEN_EPOCH=${FIRST_SEEN_EPOCH}
BASE_VERSION="${BASE_VERSION}"
NEXT_PROMPT_EPOCH=${NEXT_PROMPT_EPOCH}
EOF

    chmod 600 "$STATE_FILE"
}

write_state

###############################################################################
# CALCULATE NOTIFICATION STAGE
###############################################################################

ELAPSED_SECONDS=$((NOW_EPOCH - FIRST_SEEN_EPOCH))

case "$DEFERRAL_PROFILE" in

    standard)

        if (( ELAPSED_SECONDS >= STANDARD_REQUIRED_START )); then
            NOTIFICATION_STAGE="required"

        elif (( ELAPSED_SECONDS >= STANDARD_24_HOUR_START )); then
            NOTIFICATION_STAGE="24hour"

        elif (( ELAPSED_SECONDS >= STANDARD_48_HOUR_START )); then
            NOTIFICATION_STAGE="48hour"

        else
            NOTIFICATION_STAGE="available"
        fi
        ;;

    executive)

        if (( ELAPSED_SECONDS >= EXEC_REQUIRED_START )); then
            NOTIFICATION_STAGE="required"

        elif (( ELAPSED_SECONDS >= EXEC_24_HOUR_START )); then
            NOTIFICATION_STAGE="24hour"

        elif (( ELAPSED_SECONDS >= EXEC_48_HOUR_START )); then
            NOTIFICATION_STAGE="48hour"

        else
            NOTIFICATION_STAGE="available"
        fi
        ;;

esac

log "INFO" "Deferral profile: $DEFERRAL_PROFILE"
log "INFO" "Notification stage: $NOTIFICATION_STAGE"
log "INFO" "Elapsed update age: $((ELAPSED_SECONDS / SECONDS_PER_HOUR)) hour(s)"

###############################################################################
# APPLICATION STATE
###############################################################################

if pgrep -x "$PROCESS_NAME" >/dev/null 2>&1; then
    APP_IS_OPEN=true
    log "INFO" "$APP_NAME is currently open."
else
    APP_IS_OPEN=false
    log "INFO" "$APP_NAME is closed. Update will run silently."
fi

###############################################################################
# SWIFTDIALOG MESSAGE
###############################################################################

show_update_dialog() {

    local title="$APP_NAME Update Available"
    local message=""
    local allow_defer=true

    case "$NOTIFICATION_STAGE" in

        available)

            message="Hello! A $APP_NAME app update is now available.

Select Update Now to close $APP_NAME and complete the update.

Select Defer to complete the update later."
            ;;

        48hour)

            message="Hello! A $APP_NAME update is available and must be completed within 48 hours.

Select Update Now to close $APP_NAME and complete the update.

Select Defer to complete the update later."
            ;;

        24hour)

            message="Hello! An $APP_NAME update is available and must be completed within 24 hours.

Please select Update Now to close $APP_NAME and complete this update.

Select Defer to complete the update later."
            ;;

        required)

            title="$APP_NAME Update Required"

            message="Hello! $APP_NAME requires an update.

$APP_NAME must be closed to complete the update.

Please select Update Now to close $APP_NAME and complete the update."

            allow_defer=false
            ;;

    esac

    if [[ ! -x "$DIALOG" ]]; then
        log "ERROR" "swiftDialog is required because $APP_NAME is open, but swiftDialog is unavailable."
        return 10
    fi

    if [[ "$allow_defer" == true ]]; then

        "$DIALOG" \
            --title "$title" \
            --message "$message" \
            --button1text "Update Now" \
            --button2text "Defer" \
            --width 540 \
            --height 400

    else

        "$DIALOG" \
            --title "$title" \
            --message "$message" \
            --button1text "Update Now" \
            --width 540 \
            --height 400

    fi

    return $?
}

###############################################################################
# DEFERRAL
###############################################################################

if [[ "$APP_IS_OPEN" == true ]]; then

    # Respect a previous deferral until its next scheduled prompt.
    # Required stage always overrides NEXT_PROMPT_EPOCH.
    if [[ "$NOTIFICATION_STAGE" != "required" ]] &&
       (( NOW_EPOCH < NEXT_PROMPT_EPOCH )); then

        REMAINING=$((NEXT_PROMPT_EPOCH - NOW_EPOCH))

        log "INFO" "Existing deferral is active. Next prompt in approximately $((REMAINING / SECONDS_PER_HOUR)) hour(s)."
        exit 0
    fi

    show_update_dialog
    DIALOG_EXIT=$?

    case "$DIALOG_EXIT" in

        0)
            log "INFO" "User selected Update Now."
            ;;

        2)

            if [[ "$NOTIFICATION_STAGE" == "required" ]]; then
                log "WARN" "Deferral was requested during required stage and was ignored."
            else
                #
                # Prompt again on the next daily cycle.
                # Stage boundaries still control escalation.
                #
                NEXT_PROMPT_EPOCH=$((NOW_EPOCH + SECONDS_PER_DAY))
                write_state

                log "INFO" "User deferred update. Next prompt scheduled in 24 hours."
                exit 0
            fi
            ;;

        *)

            if [[ "$NOTIFICATION_STAGE" == "required" ]]; then
                log "WARN" "Required update dialog exited unexpectedly with code $DIALOG_EXIT."
                exit 1
            else
                NEXT_PROMPT_EPOCH=$((NOW_EPOCH + SECONDS_PER_DAY))
                write_state

                log "WARN" "Update dialog exited with code $DIALOG_EXIT. Treating as a deferral."
                exit 0
            fi
            ;;

    esac
fi

###############################################################################
# GRACEFUL APPLICATION QUIT
###############################################################################

if [[ "$APP_IS_OPEN" == true ]]; then

    log "INFO" "Requesting graceful quit for $APP_NAME."

    /usr/bin/osascript \
        -e "tell application \"$APP_NAME\" to quit" \
        >/dev/null 2>&1

    QUIT_WAIT=0
    QUIT_TIMEOUT=15

    while pgrep -x "$PROCESS_NAME" >/dev/null 2>&1; do

        if (( QUIT_WAIT >= QUIT_TIMEOUT )); then

            log "ERROR" "$APP_NAME did not close within ${QUIT_TIMEOUT} seconds. No force-quit will be performed."

            "$DIALOG" \
                --title "$APP_NAME Update Failed" \
                --message "$APP_NAME could not be closed safely. The update was not attempted.

Please save your work, close $APP_NAME, and try again.

If you continue to have trouble, please reach out to Hillman IT in #ask-hillman-IT on Slack for assistance." \
                --button1text "OK" \
                --width 540 \
                --height 400 \
                >/dev/null 2>&1

            exit 1
        fi

        sleep 1
        ((QUIT_WAIT++))
    done

    log "INFO" "$APP_NAME closed successfully."
fi

###############################################################################
# REMEDIATION
###############################################################################

log "INFO" "Starting Installomator remediation."
log "INFO" "Installomator label: $INSTALL_LABEL"

"$INSTALLER" "$INSTALL_LABEL" \
    DEBUG="$DEBUG_MODE" \
    NOTIFY=silent

INSTALL_EXIT=$?

if [[ "$INSTALL_EXIT" -ne 0 ]]; then

    log "ERROR" "Installomator failed with exit code $INSTALL_EXIT."

    if [[ "$APP_IS_OPEN" == true && -x "$DIALOG" ]]; then

        "$DIALOG" \
            --title "$APP_NAME Update Failed" \
            --message "$APP_NAME has failed to update.

Error: Installomator exited with code $INSTALL_EXIT.

Please reach out to Hillman IT in #ask-hillman-IT on Slack for assistance." \
            --button1text "OK" \
            --width 540 \
            --height 400 \
            >/dev/null 2>&1
    fi

    exit "$INSTALL_EXIT"
fi

###############################################################################
# VERIFY RESULT
###############################################################################

if [[ ! -d "$APP_PATH" ]]; then

    log "ERROR" "$APP_NAME is no longer present after remediation."

    if [[ "$APP_IS_OPEN" == true && -x "$DIALOG" ]]; then

        "$DIALOG" \
            --title "$APP_NAME Update Failed" \
            --message "$APP_NAME could not be verified after the update.

Please reach out to Hillman IT in #ask-hillman-IT on Slack for assistance." \
            --button1text "OK" \
            --width 540 \
            --height 400 \
            >/dev/null 2>&1
    fi

    exit 1
fi

UPDATED_VERSION="$(get_app_version "$APP_PATH")"

if [[ -z "$UPDATED_VERSION" ]]; then

    log "ERROR" "Unable to determine installed version after remediation."

    if [[ "$APP_IS_OPEN" == true && -x "$DIALOG" ]]; then

        "$DIALOG" \
            --title "$APP_NAME Update Failed" \
            --message "$APP_NAME completed remediation, but the installed version could not be verified.

Please reach out to Hillman IT in #ask-hillman-IT on Slack for assistance." \
            --button1text "OK" \
            --width 540 \
            --height 400 \
            >/dev/null 2>&1
    fi

    exit 1
fi

###############################################################################
# SUCCESS
###############################################################################

if [[ "$UPDATED_VERSION" == "$CURRENT_VERSION" ]]; then
    log "INFO" "Installomator completed successfully. Installed version remains $UPDATED_VERSION."
else
    log "INFO" "Update completed successfully: $CURRENT_VERSION -> $UPDATED_VERSION."
fi

# Successful remediation clears the update timing state.
rm -rf "$STATE_DIR"

log "INFO" "Update state cleared."

###############################################################################
# SUCCESS NOTIFICATION
#
# Only show completion messaging when the user participated in the interactive
# open-application workflow. Closed applications remain silent.
###############################################################################

if [[ "$APP_IS_OPEN" == true && -x "$DIALOG" ]]; then

    "$DIALOG" \
        --title "$APP_NAME Update Complete" \
        --message "$APP_NAME has completed updating." \
        --button1text "OK" \
        --width 540 \
        --height 400 \
        >/dev/null 2>&1
fi

exit 0