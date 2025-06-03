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

# ----------
# Main
# ----------

author:
  - Senne Van Baelen
  - "[Pandoc Contributors](https://github.com/jgm/pandoc/graphs/contributors)"
author-title: '<b><i>Authors:</i></b>'
date: "<i>2024-03-30</i>"
title: 'cowkit'
subtitle: 'A Comfortable Open Writing Kit<br> (example document)'
toc-title: 'Contents'

keywords:
  - cowkit
  - academic writing
endnote: false
lang: en_GB

# HTML-only
author-meta:
  - Senne Van Baelen
date-meta: 2024


# ----------
# Citations
# ----------
bibliography_main: ./src/bibliography/references.bib
<!--bibliography_sources: ./src/bibliography/sources.bib-->
<!-- Link your style: <https://www.zotero.org/styles> (not possibly local!) -->
#csl: https://www.zotero.org/styles/chicago-note-bibliography
<!-- DOWNLOAD your style: <https://www.zotero.org/styles> -->
csl: ./src/bibliography/ieee.csl
link-citations: true
link-bibliography: true

suppress-bibliography: false

# nocite (best not combined with numeric IEEE citation styles; it messes with the order)
#nocite: |
#  @brown2016

# ----------
# Listings
# ----------
listings: true                   # needed together with listings: true in yaml config
                                 # (for default pandoc crossref listing style, simply
                                 #  set both to false)

# ----------
# Prefixes
# ----------
# http://lierdakil.github.io/pandoc-crossref/#reference-format
eqnPrefix: Eq.
figPrefix: Fig.
secPrefix: Sec.
lstPrefix: Lst.
tblPrefix: Table

ccsDelim: "; &nbsp;"
ccsLabelSep: ": &nbsp;"


# nocite (best not combined with numeric IEEE citation styles; it messes with the order)
#nocite: |
#  @brown2016

# headers for HTML and/or LaTeX
header-includes:
  - <link rel="icon" type="image/x-icon" href="img/cowicon.svg"/>
  - <script src="./scripts/sidebar.js"></script>
  - <script src="./scripts/live_reload.js"></script>
  - <script src="./scripts/captions.js"></script>
  - <script src="./scripts/code.js"></script>
  - <script src="./scripts/subfigs.js"></script>
  - <script src="./scripts/scroll.js"></script>
  - <script src="./scripts/toc-right.js"></script>
  - <script src="./scripts/minisearch.js"></script>
  - <script src="./scripts/search.js"></script>
  - \definecolor{myhrefcolor}{HTML}{0645AD}


# --------------
# Custom options
# --------------
code-lang: true  # show code language in code blocks
code-copy: true  # add copy-to-clipboard button in code blocks
# Download other outputs: requires a .pdf/.tex with this name in your server directory
# (-> can be compiled with $ cowkit -s --format pdf|tex|all)
download-pdf: index.pdf  # comment out to remove button
download-tex: index.tex  # comment out to remove button

# Latex
# ======
# margin-left: 3cm   # can also set in templates
# margin-right: 3cm  # can also set in templates

# ListOfX (in html, make a dedicated .md, e.g., with \listoffigures inside)
lof: false # we choose to manually set the location of the figure list via a .md file (appendix.md)
lot: false # we choose to manually set the location of the table list via a .md file (appendix.md)
#lofTitle: |
#  # List of Figures
# add {-} to skip section number
#lofTitle: |
#  # List of Figures {-}

color-links: true # See https://ctan.org/pkg/xcolor for colors
citecolor: black
linkcolor: myhrefcolor # requires header-includes def above
urlcolor: myhrefcolor

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

---
