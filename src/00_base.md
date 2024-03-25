---
# General content information
author-meta: 'Eleanor Roosevelt'
bibliography_main: ./src/references.bib
bibliography_sources: ./src/sources.bib
citecolor: black
color-links: true # See https://ctan.org/pkg/xcolor for colors
#csl: https://www.zotero.org/styles/chicago-note-bibliography
csl: https://www.zotero.org/styles/ieee
date-meta: 2022
endnote: false
keywords: # list of keywords to be included in HTML, PDF, ODT, pptx, docx and AsciiDoc metadata; repeat as for author, above
lang: en-US
link-citations: true
link-bibliography: true
linkcolor: black
suppress-bibliography: false
title: 'My Title'
subtitle: 'Subtitle'
urlcolor: blue
# nocite - but best not combined with numeric IEEE-like citation styles, as it messes with the order
#nocite: |
#  @brown2016

# HTML
header-includes:
    <script src="./scripts/live_reload.js"></script>
    <meta name="description" content="My description"/>

include-after: # contents specified by -A/--include-after-body (may have multiple values)
indent: # if true, pandoc will use document class settings for indentation (the default LaTeX template otherwise removes indentation and adds space between paragraphs)
linestretch: 1.5 # adjusts line spacing using the setspace package, e.g. 1.25, 1.5
lof: false
lofTitle: Figures
lot: false
pagestyle: # control \pagestyle{}: the default article class supports plain (default), empty (no running heads or page numbers), and headings (section titles in running heads)
papersize: # paper size, e.g. letter, a4
secnumdepth: # numbering depth for sections (with --number-sections option or numbersections variable)
toc-depth: 2
toc-title: 'Contents'

# Fonts
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

