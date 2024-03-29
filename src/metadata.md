---
#==============================================================
# Metadata - general document configuration
#
# Notes:
#   - values can also be set in other markdown files
#   - some of these config values can also be set in the yaml
#   - comment out with '#'
#   - <https://pandoc.org/MANUAL.html#metadata-variables>
#   - <http://lierdakil.github.io/pandoc-crossref/#settings-file>
#==============================================================

author:
  - "John Doe"
  - "Senne Van Baelen"
bibliography_main: ./src/references.bib
bibliography_sources: ./src/sources.bib
#csl: https://www.zotero.org/styles/chicago-note-bibliography
csl: https://www.zotero.org/styles/ieee
date-meta: 2022
endnote: false
keywords:
  - cowkit
  - academic

lang: en_GB
link-citations: true
link-bibliography: true
suppress-bibliography: false
title: 'My Doc Title'
subtitle: 'This is a subtitle'
toc-title: 'Contents'

# http://lierdakil.github.io/pandoc-crossref/#reference-format
eqnPrefix: Eq.
figPrefix: Fig.
secPrefix: Sec.
lstPrefix: Lst.
tblPrefix: Table

ccsDelim: "; &nbsp;"
ccsLabelSep: ": &nbsp;"
#subfigGrid: true

# ref: crossref

# nocite (best not combined with numeric IEEE citation styles; it messes with the order)
#nocite: |
#  @brown2016

# HTML
# ======

# Download pdf: requires a PDF with this name in the build directory 
# (-> can be compiled with $ cowkit -s -f pdf)
download-pdf: out.pdf

header-includes:
  - <link rel="icon" type="image/x-icon" href="img/cowicon.svg"/>
  - <script src="./scripts/sidebar.js"></script>
  - <script src="./scripts/live_reload.js"></script>
  - <script src="./scripts/captions.js"></script>
  - <script src="./scripts/code.js"></script>
  - <script src="./scripts/subfigs.js"></script>

# Latex
# ======
# margin-left: 3cm   # can also set in templates
# margin-right: 3cm  # can also set in templates

# ListOfX (in html, make a dedicated .md, e.g., with \listoffigures inside)
lof: false
lot: false
#lofTitle: |
#  # List of Figures
# add {-} to skip section number
#lofTitle: |
#  # List of Figures {-}

citecolor: black
color-links: true # See https://ctan.org/pkg/xcolor for colors
include-after: # contents specified by -A/--include-after-body (may have multiple values)
indent: # if true, pandoc will use document class settings for indentation (the default LaTeX template otherwise removes indentation and adds space between paragraphs)
linestretch: 1 # adjusts line spacing using the setspace package, e.g. 1.25, 1.5

pagestyle: # control \pagestyle{}: the default article class supports plain (default), empty (no running heads or page numbers), and headings (section titles in running heads)
papersize: # paper size, e.g. letter, a4
secnumdepth: # numbering depth for sections (with --number-sections option or numbersections variable)

# Fonts
# ======
fontenc: # allows font encoding to be specified through fontenc package (with pdflatex); default is T1 (see LaTeX font encodings guide)
fontfamily: # font package for use with pdflatex: TeX Live includes many options, documented in the LaTeX Font Catalogue. The default is Latin Modern.
fontfamilyoptions: # options for package used as fontfamily; repeat for multiple options.
fontsize: # font size for body text. The standard classes allow 10pt, 11pt, and 12pt. To use another size, set documentclass to one of the KOMA-Script classes, such as scrartcl or scrbook.
mainfont:
sansfont:
monofont:
mathfont:
mainfontoptions:
sansfontoptions:
monofontoptions:
mathfontoptions:

# Word
category: # document category, included in docx and pptx metadata
description: # document description, included in ODT, docx and pptx metadata. Some applications show this as Comments metadata.
subject: # document subject, included in ODT, PDF, docx, EPUB, and pptx metadata
---