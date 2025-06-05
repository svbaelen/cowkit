# Templates

Cowkit uses Pandoc templates to control the final output appearance and structure for different formats. Templates can be customized to match your specific needs.

## Template Locations

Templates are stored in format-specific directories:

- **HTML**: `config/html/templates/`
- **PDF/LaTeX**: `config/tex/templates/`
- **PDF-specific**: `config/pdf/templates/`

## Default Templates

Cowkit includes several built-in templates:

### HTML Templates

- `config/html/templates/default.html` - Single-page HTML output
- `config/html/templates/default.chunked.html` - Multi-page chunked HTML

### LaTeX Templates

- `config/tex/templates/default.tex` - Standard article/report template
- `config/tex/templates/ieeeconf.tex` - IEEE conference paper format

## Using Custom Templates

### Specify Template in Configuration

In your format-specific config file:

```yaml
# config/html/config.yaml
template: config/html/templates/my-custom.html

# config/tex/config.yaml
template: config/tex/templates/my-paper.tex
```

### Template Variables

Templates use Pandoc's variable system. Common variables include:

#### Document Variables
```
$title$           # Document title
$author$          # Author name(s)
$date$            # Document date
$abstract$        # Abstract content
$body$            # Main document body
$toc$             # Table of contents
```

#### Metadata Variables
```
$version$         # Custom version number
$subtitle$        # Document subtitle
$keywords$        # Document keywords
$lang$            # Document language
```

#### Conditional Variables
```
$if(toc)$         # Include if TOC enabled
$if(abstract)$    # Include if abstract exists
$if(title)$       # Include if title set
```

## HTML Templates

### Basic HTML Template Structure

```html
<!DOCTYPE html>
<html lang="$lang$">
<head>
    <meta charset="utf-8">
    <title>$if(title)$$title$$endif$</title>
    $if(author)$<meta name="author" content="$author$">$endif$
    
    $for(css)$
    <link rel="stylesheet" href="$css$">
    $endfor$
    
    $for(header-includes)$
    $header-includes$
    $endfor$
</head>
<body>
    $if(title)$
    <header>
        <h1 class="title">$title$</h1>
        $if(subtitle)$<p class="subtitle">$subtitle$</p>$endif$
        $if(author)$<p class="author">$author$</p>$endif$
        $if(date)$<p class="date">$date$</p>$endif$
    </header>
    $endif$
    
    $if(abstract)$
    <div class="abstract">
        <h2>Abstract</h2>
        $abstract$
    </div>
    $endif$
    
    $if(toc)$
    <nav id="$idprefix$TOC" role="doc-toc">
        $toc$
    </nav>
    $endif$
    
    <main>
        $body$
    </main>
    
    $for(include-after)$
    $include-after$
    $endfor$
</body>
</html>
```

### Chunked HTML Templates

For multi-page documents, use `default.chunked.html`:

```html
<!DOCTYPE html>
<html lang="$lang$">
<head>
    <meta charset="utf-8">
    <title>$pagetitle$</title>
    <!-- Navigation between chapters -->
    $if(prev-chapter)$
    <link rel="prev" href="$prev-chapter.url$" title="$prev-chapter.title$">
    $endif$
    $if(next-chapter)$
    <link rel="next" href="$next-chapter.url$" title="$next-chapter.title$">
    $endif$
</head>
<body>
    <!-- Chapter navigation -->
    <nav class="chapter-nav">
        $if(prev-chapter)$
        <a href="$prev-chapter.url$">← $prev-chapter.title$</a>
        $endif$
        $if(next-chapter)$
        <a href="$next-chapter.url$">$next-chapter.title$ →</a>
        $endif$
    </nav>
    
    $body$
</body>
</html>
```

## LaTeX Templates

### Basic LaTeX Template

```latex
\documentclass[$if(fontsize)$$fontsize$,$endif$$if(lang)$$babel-lang$,$endif$$if(papersize)$$papersize$paper,$endif$$for(classoption)$$classoption$$sep$,$endfor$]{$documentclass$}

% Packages
\usepackage{amsmath,amssymb}
\usepackage{graphicx}
\usepackage{hyperref}
$if(bibliography)$
\usepackage{natbib}
$endif$

% Metadata
$if(title)$
\title{$title$}
$endif$
$if(author)$
\author{$for(author)$$author$$sep$ \and $endfor$}
$endif$
$if(date)$
\date{$date$}
$endif$

\begin{document}

$if(title)$
\maketitle
$endif$

$if(abstract)$
\begin{abstract}
$abstract$
\end{abstract}
$endif$

$if(toc)$
\tableofcontents
\newpage
$endif$

$body$

$if(bibliography)$
\bibliography{$for(bibliography)$$bibliography$$sep$,$endfor$}
$endif$

\end{document}
```

### Academic Paper Template

For conference papers or journals:

```latex
\documentclass[conference]{IEEEtran}

\usepackage{cite}
\usepackage{amsmath,amssymb,amsfonts}
\usepackage{algorithmic}
\usepackage{graphicx}
\usepackage{textcomp}
\usepackage{xcolor}

\begin{document}

\title{$title$}

\author{
$for(author)$
\IEEEauthorblockN{$author.name$}
\IEEEauthorblockA{$author.affiliation$\\
$author.email$}
$sep$ \and
$endfor$
}

\maketitle

$if(abstract)$
\begin{abstract}
$abstract$
\end{abstract}
$endif$

$if(keywords)$
\begin{IEEEkeywords}
$keywords$
\end{IEEEkeywords}
$endif$

$body$

\bibliographystyle{IEEEtran}
\bibliography{$bibliography$}

\end{document}
```

## Custom CSS for HTML

### Integrating with Templates

Reference CSS files in your HTML template:

```html
$for(css)$
<link rel="stylesheet" href="$css$">
$endfor$
```

### Template-Specific Styling

Create CSS that targets template elements:

```css
/* Template header styling */
header .title {
    font-size: 2.5em;
    margin-bottom: 0.5em;
}

header .subtitle {
    font-size: 1.2em;
    color: #666;
}

/* Abstract styling */
.abstract {
    background: #f9f9f9;
    padding: 1em;
    border-left: 4px solid #007acc;
    margin: 2em 0;
}

/* Navigation for chunked HTML */
.chapter-nav {
    display: flex;
    justify-content: space-between;
    padding: 1em 0;
    border-bottom: 1px solid #ddd;
}
```

## Template Development

### Testing Templates

Test template changes quickly:

```bash
# Test single format
docker run --rm -v "$(pwd):/app" svbaelen/cowkit -s -f html

# Test with custom template
docker run --rm -v "$(pwd):/app" svbaelen/cowkit -s -f html --template=config/html/templates/my-template.html
```

### Template Variables Available

Common variables automatically available:

- Document metadata from `_base.md`
- Configuration values from YAML files
- Generated content (TOC, bibliography, etc.)
- File paths and URLs
- Build information

### Debugging Templates

Enable verbose output to see template processing:

```yaml
# In config/config.yaml
verbosity: INFO
```

Check generated intermediate files in `build/` directory.

## Template Examples

### Minimal HTML Template

```html
<!DOCTYPE html>
<html>
<head>
    <title>$title$</title>
    <style>
        body { font-family: serif; max-width: 800px; margin: 0 auto; padding: 2em; }
        h1, h2, h3 { color: #333; }
    </style>
</head>
<body>
    <h1>$title$</h1>
    $body$
</body>
</html>
```

### Report LaTeX Template

```latex
\documentclass[11pt,a4paper]{report}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{hyperref}

\title{$title$}
\author{$author$}
\date{$date$}

\begin{document}
\maketitle
\tableofcontents
\chapter{Introduction}
$body$
\end{document}
```

## Best Practices

1. **Start with defaults**: Copy and modify existing templates rather than starting from scratch
2. **Test incrementally**: Make small changes and test frequently
3. **Use conditionals**: Handle optional content with `$if()$` blocks
4. **Maintain consistency**: Keep similar styling across formats
5. **Document variables**: Comment custom variables in templates
6. **Version control**: Track template changes alongside content