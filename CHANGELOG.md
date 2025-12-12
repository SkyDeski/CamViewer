# Changelog

All notable changes to this project will be documented in this file.

## [1.0.15] - 2025-12-12
### Fixed
- **Auto-Update Configuration**: Added missing `repository` field to `package.json` to ensure the updater knows where to fetch updates from.

## [1.0.14] - 2025-12-12
### Added
- **Test Release**: Dummy version to verify auto-update functionality on Windows.

## [1.0.13] - 2025-12-12
### Fixed
- **Windows Auto-Update**: Disabled code signature verification to allow auto-updates from GitHub without a paid certificate.

## [1.0.12] - 2025-12-12
### Added
- **Configuration Editor**: New graphical interface to edit URLs, labels, and refresh interval. Accessible via "Edit Configuration" in the right-click menu.

## [1.0.11] - 2025-12-12
### Added
- **Windows Support**: Added build configuration to generate Windows installers (`.exe`) alongside Linux builds.

## [1.0.10] - 2025-12-12
### Security
- Updated `electron` to latest version to resolve security vulnerabilities.

## [1.0.9] - 2025-12-12
### Added
- **Auto-Update System**: Application now automatically checks for updates on startup, downloads them in the background, and prompts the user to restart and install.

## [1.0.8] - 2025-12-12
### Added
- **Startup Logging**: Application now logs startup events and errors to `~/camviewer.log` for troubleshooting.
- **Global Error Handling**: Added dialog boxes to alert users of critical startup failures.
- **Robustness**: Improved error catching in both main and renderer processes.

## [1.0.7] - 2025-12-11
### Added
- **Camera Labels**: Configurable labels for each camera (via `camviewer-config.json`).
- **Context Menu**: Right-click menu on cameras with options for Reload and Zoom.
- **Zoom Controls**: Zoom In, Zoom Out, and Reset Zoom functionality.

## [1.0.6] - 2025-12-05
### Changed
- **Dynamic Configuration**: `camviewer-config.json` is now located in the user's home directory.
- **Live Reload**: Changes to the configuration file are applied immediately without restarting the app.

## [1.0.5] - 2025-12-05
### Fixed
- Resolved URL loading timing issues by adding initialization delay.
- Removed debug logging for cleaner production build.

## [1.0.4] - 2025-12-05
### Fixed
- Fixed corrupted `index.html` structure.
- Removed unused overlay elements and styles.
- Improved webview reliability using `loadURL` with fallback.

## [1.0.3] - 2025-12-05
### Fixed
- Fixed GitHub Actions permissions error (403 Forbidden) during release creation.

## [1.0.2] - 2025-12-05
### Fixed
- Corrected author format in `package.json` for Linux builds.

## [1.0.0] - 2025-12-04
### Initial Release
- Basic functionality: Display 4 webviews in a 2x2 grid.
- Fullscreen kiosk mode.
- Configurable URLs via `config.json`.
- Auto-refresh functionality.
