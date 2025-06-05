# Configuration

Cowkit uses a hierarchical configuration system based on YAML files that control Pandoc's behavior for different output formats.

## Configuration Hierarchy

1. **Main Config**: `/config/config.yaml` - Base configuration applied to all formats
2. **Format-Specific Configs**: `/config/<format>/config.yaml` - Overrides for specific formats (html, pdf, tex)
3. **Metadata**: `/src/_base.md` - Document metadata and variables

## Main Configuration (`config/config.yaml`)

### Input Files

The `input-files` section determines which markdown files are processed and in what order:

```yaml
input-files:
  - ./src/_base.md          # Document metadata (always first)
  - ./src/abstract.md       # Abstract section
  - ./src/01_intro.md       # Introduction
  - ./src/02_chapter_1.md   # Main content chapters
  - ./src/03_conclusion.md  # Conclusion
  - ./src/04_acknowledgment.md
  - ./src/bibliography/references.md
```

### Filters

Pandoc filters for processing content:

```yaml
filters:
  - pandoc-crossref                              # Cross-references
  - src/filters/multiple-bibliographies.lua     # Multiple bibliography support
  # - src/filters/pandoc-quotes.lua             # Custom quote processing
```

**Performance Tip**: Comment out `multiple-bibliographies.lua` for faster development builds when not working with citations.

### Document Structure

```yaml
from: markdown
to: html                    # Default output format
standalone: false           # Embed in template vs standalone document
toc: true                   # Generate table of contents
number-sections: true       # Number headings
toc-depth: 3               # TOC depth level
top-level-division: default # part, chapter, section, or default
```

### Citations and References

```yaml
cite-method: citeproc       # citeproc, natbib, or biblatex
reference-location: block   # block, section, or document
```

### Resource Paths

Directories where Pandoc looks for images and assets:

```yaml
resource-path:
  - ./src
  - .
  - ${.}/../
  - ${.}/../assets/img
  - ${.}/../src/
```

## Format-Specific Configuration

### HTML Configuration (`config/html/config.yaml`)

```yaml
# Additional input files for HTML only
input-files:
  - ./src/appendix/appendix.md

# CSS styling
css:
  - ./config/html/css/main.css
  - ./config/html/css/print.css
  - ./config/html/css/font_ubuntu.css

# Output options
embed-resources: false      # For chunked HTML
to: chunkedhtml            # Single HTML or chunked HTML
output-file: build/html    # Output directory for chunked HTML
log-file: build/html.log   # Build log location
```

#### HTML Output Modes

**Single HTML File**:
```yaml
to: html
output-file: build/index.html
embed-resources: true
```

**Chunked HTML** (recommended for long documents):
```yaml
to: chunkedhtml
output-file: build/html
embed-resources: false
```

### PDF Configuration (`config/pdf/config.yaml`)

```yaml
to: pdf
output-file: build/document.pdf
pdf-engine: xelatex        # or pdflatex, lualatex
geometry: margin=1in
fontsize: 11pt
```

### LaTeX Configuration (`config/tex/config.yaml`)

```yaml
to: latex
output-file: build/document.tex
template: config/tex/templates/default.tex
```

## Document Metadata (`src/_base.md`)

Set document-wide variables and metadata:

```yaml
---
title: "Your Document Title"
author: "Your Name"
date: "2024"
abstract: |
  Your abstract text here.
  
# Bibliography settings
bibliography: src/bibliography/references.bib
csl: src/bibliography/ieee.csl

# PDF-specific settings
documentclass: article
classoption:
  - 11pt
  - a4paper

# Custom variables
version: "1.0"
---
```

## Advanced Configuration

### Custom Templates

Place custom templates in:
- HTML: `config/html/templates/`
- PDF/LaTeX: `config/tex/templates/`
- PDF-only: `config/pdf/templates/`

### Custom Filters

Create Lua filters in `src/filters/` and reference them in the main config:

```yaml
filters:
  - pandoc-crossref
  - src/filters/your-custom-filter.lua
```

### Environment Variables

Override configuration via environment variables when running Docker:

```bash
docker run -e PANDOC_FORMAT=pdf svbaelen/cowkit -s
```

## Debugging Configuration

### Enable Verbose Logging

```yaml
verbosity: INFO  # ERROR, WARNING, or INFO
log-file: build/pandoc.log
```

### Test Configuration

Validate your config without building:

```bash
docker run --rm -v "$(pwd):/app" svbaelen/cowkit --dry-run
```

## Common Configuration Patterns

### Academic Paper
```yaml
# In config/config.yaml
number-sections: true
cite-method: citeproc
reference-location: block
toc: false

# In src/_base.md
documentclass: article
classoption: [11pt, a4paper]
bibliography: src/bibliography/references.bib
csl: src/bibliography/ieee.csl
```

### Book/Report
```yaml
# In config/config.yaml
top-level-division: chapter
toc: true
toc-depth: 2
number-sections: true

# For HTML - chunked output
to: chunkedhtml
```

### Presentation/Slides
```yaml
# In config/config.yaml
to: revealjs
output-file: build/slides.html
```

## Troubleshooting

- **Build fails**: Check `verbosity: INFO` and examine log files
- **Missing assets**: Verify `resource-path` includes asset directories
- **Citations not working**: Ensure bibliography files are referenced in `_base.md`
- **Styling issues**: Check CSS file paths and order in format-specific configs