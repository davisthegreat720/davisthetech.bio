#!/bin/zsh --no-rcs

# Extension Attribute: Installomator - SHA256
# Reports the SHA-256 hash of the installed Installomator script.

INSTALL="/usr/local/Installomator/Installomator.sh"

if [[ ! -f "$INSTALL" ]]; then
    echo "<result>Not Installed</result>"
    exit 0
fi

SHA256=$(/usr/bin/shasum -a 256 "$INSTALL" 2>/dev/null | /usr/bin/awk '{print $1}')

if [[ -z "$SHA256" ]]; then
    echo "<result>Unknown</result>"
    exit 0
fi

echo "<result>${SHA256}</result>"

exit 0