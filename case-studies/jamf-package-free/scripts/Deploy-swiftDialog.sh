#!/bin/zsh --no-rcs

# Deploy - swiftDialog
#
# Purpose:
# Installs or updates swiftDialog using the approved local
# Installomator instance.
#
# Dependency:
# Installomator must already exist at:
# /usr/local/Installomator/Installomator.sh
#
# Logging:
# - stdout/stderr -> Jamf Policy Log
# - root execution -> /var/log/hillman-app-updates.log
# - local non-root testing -> /tmp/hillman-app-updates.log

SCRIPT_NAME="Deploy - swiftDialog"

INSTALLOMATOR="/usr/local/Installomator/Installomator.sh"
DIALOG="/usr/local/bin/dialog"
LABEL="swiftdialog"

# ---------------------------------------------------------
# Logging
# ---------------------------------------------------------

if [[ "$EUID" -eq 0 ]]; then
    LOG_FILE="/var/log/hillman-app-updates.log"
else
    LOG_FILE="/tmp/hillman-app-updates.log"
fi

if ! /usr/bin/touch "$LOG_FILE" 2>/dev/null; then
    LOG_FILE=""
fi

if [[ "$EUID" -eq 0 && -n "$LOG_FILE" ]]; then
    /usr/sbin/chown root:wheel "$LOG_FILE" 2>/dev/null
    /bin/chmod 640 "$LOG_FILE" 2>/dev/null
fi

log() {
    local LEVEL="$1"
    shift

    local TIMESTAMP
    TIMESTAMP=$(/bin/date "+%Y-%m-%d %H:%M:%S")

    local MESSAGE="[${LEVEL}] [${SCRIPT_NAME}] $*"

    # Jamf Policy Log
    /bin/echo "$MESSAGE"

    # Persistent endpoint log
    if [[ -n "$LOG_FILE" ]]; then
        /bin/echo "${TIMESTAMP} ${MESSAGE}" >> "$LOG_FILE"
    fi
}

log "INFO" "Starting swiftDialog prerequisite deployment."

# ---------------------------------------------------------
# Verify Installomator prerequisite
# ---------------------------------------------------------

if [[ ! -x "$INSTALLOMATOR" ]]; then
    log "ERROR" "Installomator not found or not executable at ${INSTALLOMATOR}."
    log "ERROR" "swiftDialog deployment cannot continue."
    exit 1
fi

INSTALLOMATOR_VERSION=$("$INSTALLOMATOR" version 2>/dev/null)

if [[ -z "$INSTALLOMATOR_VERSION" ]]; then
    log "ERROR" "Unable to determine Installomator version."
    exit 2
fi

log "INFO" "Installomator version: ${INSTALLOMATOR_VERSION}"
log "INFO" "Installomator label: ${LABEL}"

# ---------------------------------------------------------
# Detect existing swiftDialog
# ---------------------------------------------------------

if [[ -x "$DIALOG" ]]; then

    CURRENT_VERSION=$("$DIALOG" --version 2>/dev/null)

    log "INFO" "swiftDialog is already installed."
    log "INFO" "Installed swiftDialog version: ${CURRENT_VERSION:-Unknown}"
    log "INFO" "Installomator will check for an available update."

else

    log "INFO" "swiftDialog is not currently installed."
    log "INFO" "Installomator will install the current approved vendor release."

fi

# ---------------------------------------------------------
# Install / update swiftDialog
# ---------------------------------------------------------

log "INFO" "Invoking Installomator for swiftDialog."

"$INSTALLOMATOR" "$LABEL" \
    DEBUG=0 \
    NOTIFY=silent

RESULT=$?

if [[ "$RESULT" -ne 0 ]]; then
    log "ERROR" "Installomator returned exit code ${RESULT}."
    log "ERROR" "swiftDialog deployment failed."
    exit "$RESULT"
fi

# ---------------------------------------------------------
# Post-install verification
# ---------------------------------------------------------

if [[ ! -x "$DIALOG" ]]; then
    log "ERROR" "Installomator completed, but ${DIALOG} was not found or is not executable."
    exit 3
fi

INSTALLED_VERSION=$("$DIALOG" --version 2>/dev/null)

if [[ -z "$INSTALLED_VERSION" ]]; then
    log "ERROR" "swiftDialog exists but its installed version could not be determined."
    exit 4
fi

# ---------------------------------------------------------
# Success
# ---------------------------------------------------------

log "SUCCESS" "swiftDialog installation verified."
log "INFO" "Installed swiftDialog version: ${INSTALLED_VERSION}"
log "INFO" "Binary: ${DIALOG}"
log "SUCCESS" "swiftDialog prerequisite deployment completed successfully."

exit 0