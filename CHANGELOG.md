# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-01-06

### Added
- Help button in sidebar with keyboard shortcuts dialog
  - Shows available keyboard shortcuts (/, ?, s, Esc)
  - Accessible via click or ? key
  - Styled with clean tooltip design
- Content width slider control (desktop only)
  - Adjustable main content width from 600px to 1200px
  - Saves preference to localStorage
  - Visual indicator for default width (800px)
  - Automatic sidebar shrinking when content width exceeds 900px
  - Smooth transitions with easing functions
- Right-side table of contents navigation
  - Auto-generated from document headers
  - Smooth scrolling to sections
  - Active section highlighting

### Fixed
- Sidebar background color consistency on mobile
  - Changed from main background color to proper sidebar gray
  - Fixed hamburger menu icon background
  - Ensured all sidebar elements have consistent gray background
- JavaScript error in sidebar.js (removed undefined lbarButtons reference)

### Changed
- Improved sidebar width transitions for smoother UI experience
- Enhanced mobile sidebar styling for better visual consistency

## [0.1.0] - Initial Release

### Added
- Initial release of cowkit
- Docker-based document generation toolkit
- Support for HTML, PDF, and LaTeX output formats
- Live reload functionality for development
- Pandoc integration with custom templates