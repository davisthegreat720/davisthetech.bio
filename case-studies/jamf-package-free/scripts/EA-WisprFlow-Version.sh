#!/bin/zsh

###############################################################################
# Extension Attribute: Wispr Flow - Latest Version
#
# Purpose:
#   Returns the latest Wispr Flow version available from the vendor's
#   latest-release endpoint.
#
# Expected results:
#   1.6.957
#   Unknown
#
# Vendor source:
#   https://dl.wisprflow.ai/mac-apple/latest
###############################################################################

VENDOR_URL="https://dl.wisprflow.ai/mac-apple/latest"

###############################################################################
# GET LATEST RELEASE URL
###############################################################################

LATEST_URL=$(
    /usr/bin/curl \
        --silent \
        --show-error \
        --location \
        --head \
        --max-time 15 \
        --write-out '%{url_effective}' \
        --output /dev/null \
        "$VENDOR_URL" 2>/dev/null
)

###############################################################################
# EXTRACT VERSION
#
# Expected redirect URL contains:
#   Flow-v1.6.957.dmg
###############################################################################

LATEST_VERSION=$(
    echo "$LATEST_URL" |
        /usr/bin/sed -nE 's/.*Flow-v([0-9]+(\.[0-9]+)+)\.dmg.*/\1/p'
)

###############################################################################
# RETURN JAMF EA RESULT
###############################################################################

if [[ -n "$LATEST_VERSION" ]]; then
    echo "<result>${LATEST_VERSION}</result>"
else
    echo "<result>Unknown</result>"
fi

exit 0