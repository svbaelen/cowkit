# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cowkit is a document generation toolkit that converts markdown content to HTML, PDF, and LaTeX formats using Pandoc. It's designed as a zero-setup, Docker-first solution for academic and professional document writing.

## Development Commands

### Docker-Based Workflow
All development happens through Docker containers using the `pandoc/latex` base image.

**Initialize new project:**
```bash
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit --init
```

**Default development (HTML with live reload):**
```bash
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit
```

**Single builds:**
- HTML: `cowkit -s -f html`
- PDF: `cowkit -s -f pdf`
- LaTeX: `cowkit -s -f tex`
- All formats: `cowkit -s -f all`

### Docker Image Development
**Build image:**
```bash
docker build -t svbaelen/cowkit:latest -t svbaelen/cowkit:v0.1.0 .
```

**Update base image:**
```bash
docker image pull svbaelen/cowkit:latest
```

## Project Architecture

### Core Components
- **Entrypoint**: `utils/entrypoint.sh` - Main CLI handler and build orchestrator
- **File Watcher**: `utils/watcher_docker.sh` - Auto-rebuild on file changes (3-second debounce)
- **HTML Post-processing**: `utils/html_modify.js` and `utils/html_search_index.js`

### Configuration Structure
- `/config/config.yaml` - Main Pandoc configuration with filters and input files
- `/config/<format>/config.yaml` - Format-specific overrides (html, pdf, tex)
- `/config/<format>/templates/` - Output format templates
- `/src/_base.md` - Base metadata and document configuration

### Content Organization
- `/src/` - Markdown source files (ordered by filename)
- `/src/filters/` - Custom Pandoc Lua filters for processing
- `/src/scripts/` - JavaScript for HTML functionality (search, navigation, etc.)
- `/src/assets/` - Images and static assets

### Build Process
1. Pandoc processes markdown files with crossref and bibliography filters
2. Format-specific templates applied
3. Output generated to `/build/` directory
4. For HTML: Node.js post-processing creates search index and applies modifications
5. For chunked HTML: Files copied to `/build/html/` with assets

## Development Notes

### File Watching and Live Reload
- Uses `inotify-tools` to monitor source file changes
- Automatic rebuild with 3-second debounce to prevent rapid rebuilds
- Browser live reload via LiveJS (may require manual refresh on layout changes)
- HTTP server runs on port 8000 during development

### Pandoc Configuration
- Multiple bibliography support via custom Lua filter
- Cross-references using pandoc-crossref
- Resource paths include `./src`, `.`, and relative asset directories
- Filters can be commented out in `config.yaml` for faster builds during development

### Build Performance
For faster development builds, comment out:
1. `src/filters/multiple-bibliographies.lua` (skips bibliography rebuilds)
2. Sections/chapters in input-files list

### Known Limitations
- Fatal Pandoc errors crash the file watcher (requires restart)
- File watcher doesn't work with `--format all`
- Search index only rebuilds on manual restart, not file watches
- Docker-dependent workflow (no native development setup)

### Template and Styling
- HTML templates support chunked output for multi-page documents
- Custom CSS includes Tufte, ET Book, Ubuntu, and Merriweather fonts
- Templates located in `/config/<format>/templates/`
- Custom JavaScript for search, sidebar navigation, and subfigure handling