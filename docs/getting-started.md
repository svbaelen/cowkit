# Getting Started with Cowkit

Cowkit is a zero-setup document generation toolkit that converts markdown to HTML, PDF, and LaTeX formats using Pandoc.

## Prerequisites

- Docker installed on your system
- Basic familiarity with markdown and command line

## Quick Start

### 1. Initialize a New Project

Create a new directory for your document and initialize it with Cowkit's template structure:

```bash
mkdir my-document
cd my-document
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit --init
```

This creates the basic project structure with example content.

### 2. Start Development Mode

Run Cowkit in development mode with live reload:

```bash
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit
```

This will:
- Start watching your markdown files for changes
- Build HTML output with live reload
- Serve the document at http://localhost:8000

### 3. Edit Your Content

- Add markdown files to the `src/` directory
- Files are processed in the order specified in `config/config.yaml` (input-files section)
- Edit `src/_base.md` for document metadata (title, author, etc.)
- Place images in `src/img/`

### 4. Build Other Formats

Generate PDF:
```bash
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" svbaelen/cowkit -s -f pdf
```

Generate LaTeX:
```bash
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" svbaelen/cowkit -s -f tex
```

Generate all formats:
```bash
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" svbaelen/cowkit -s -f all
```

## Project Structure

After initialization, your project will have:

```
my-document/
├── config/
│   ├── config.yaml         # Main Pandoc configuration
│   ├── html/              # HTML-specific config and templates
│   ├── pdf/               # PDF-specific config and templates
│   └── tex/               # LaTeX-specific config and templates
├── src/
│   ├── _base.md           # Document metadata
│   ├── 01_intro.md        # Example introduction
│   ├── 02_chapter_1.md    # Example chapter
│   ├── bibliography/      # Bibliography files
│   ├── filters/           # Custom Pandoc filters
│   └── img/              # Images and assets
└── build/                # Generated output (created on build)
```

## Key Features

- **Live Reload**: Changes to markdown files automatically rebuild and refresh browser
- **Multiple Formats**: Single source generates HTML, PDF, and LaTeX
- **Academic Features**: Citations, cross-references, equations, and more
- **Zero Setup**: Everything runs in Docker, no local dependencies needed

## Next Steps

- Explore the [examples](../examples/README.md) for advanced features
- Customize templates in `config/<format>/templates/`
- Add custom styles to `config/html/css/`
- Configure Pandoc options in `config/config.yaml`

## Tips

- For faster development, comment out bibliography filters in `config/config.yaml`
- Use `--format all` only for final builds (file watcher doesn't support it)
- Check the [main documentation](README.md) for detailed configuration options