# Package-Free Patch Management in Jamf Pro

Case study write-up: https://www.davisthetech.bio/portfolio/jamf-package-free

A Jamf administrator take-home exercise: keep Google Chrome, ChatGPT, Codex, Slack, and Wispr Flow on the vendor's latest stable release across 100 Apple silicon Macs without packages stored or managed in Jamf Pro. Company name: Hillman Inc (fictional).

The design uses [Installomator](https://github.com/Installomator/Installomator) to download and verify vendor releases (Developer ID signature, notarization, and expected Team ID), [swiftDialog](https://github.com/swiftDialog/swiftDialog) for user messaging when an app is open, and Jamf Patch Management or Extension Attribute data for Smart Group scoping.

## Contents

| Path | Jamf object | Purpose |
| --- | --- | --- |
| `scripts/HillmanPackageFree_UpdatorFinal.sh` | Script (policy) | Runs Installomator for one app per policy. Parameters `$4` to `$9`: Installomator label, app display name, app path, process name, deferral profile (`standard` or `executive`), DEBUG mode (`0`, `1`, `2`). Updates installed apps only, runs silently when the app is closed, prompts with swiftDialog and a staged deferral when it is open, and never force-quits. |
| `scripts/Deploy-swiftDialog.sh` | Script (policy) | Installs or updates swiftDialog through the local Installomator at `/usr/local/Installomator/Installomator.sh`, then verifies `/usr/local/bin/dialog`. |
| `scripts/EA-Installomator-SHA256.sh` | Extension Attribute | Reports the SHA-256 of the installed Installomator script, `Not Installed`, or `Unknown`. |
| `scripts/EA-WisprFlow-Version.sh` | Extension Attribute | Returns the latest Wispr Flow version from `https://dl.wisprflow.ai/mac-apple/latest`, or `Unknown`. |
| `logs/Exec24message.txt` | n/a | Test log: Google Chrome open at the executive 24-hour stage, user selected Defer. |
| `configuration-worksheet.csv` | n/a | Configuration worksheet: 73 Jamf objects, 15 columns. |

## Deferral stages (from the updater script)

| Profile | Available | 48-hour warning | 24-hour warning | Required |
| --- | --- | --- | --- | --- |
| standard | day 0 to 3 | day 3 to 4 | day 4 to 5 | day 5+ |
| executive | day 0 to 5 | day 5 to 6 | day 6 to 7 | day 7+ |

Logs: `/var/log/hillman-app-updates.log` when run as root, `/tmp/hillman-app-updates.log` for local non-root testing. Per-app deferral state: `/Library/Application Support/Hillman/AppUpdates/<App>/state`.
