# Introduction {#sec:introduction}

This could be your intro. Let's start with an image (see
[@fig:logo](#fig:logo)). Check [the github
project](https://github.com/svbaelen/cowkit) for more info. A **raw version** of
this content is available
[here](https://github.com/svbaelen/cowkit/raw/refs/heads/main/src/01_intro.md).

![The cowkit logo](img/cowkit_logo.svg){#fig:logo}

## Heading 2

All human beings are born free and equal in dignity and rights. All human beings
are born free and equal in dignity and rights. All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights.

All human beings are born free and equal in dignity and rights. All human beings
are born free and equal in dignity and rights. All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights.

### Heading 3

All human beings are born free and equal in dignity and rights. All human beings
are born free and equal in dignity and rights. All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights.

#### Heading 4

All human beings are born free and equal in dignity and rights. All human beings
are born free and equal in dignity and rights. All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights.

## Bold

**All human beings are born free and equal in dignity and rights.** All human
beings are born free and equal in dignity and rights. All human beings are born
free and equal in dignity and rights. All human beings are born free and equal
in dignity and rights.

## Italic

_All human beings are born free and equal in dignity and rights._ All human
beings are born free and equal in dignity and rights. All human beings are born
free and equal in dignity and rights. All human beings are born free and equal
in dignity and rights.

## Bold and italic

**_All human beings are born free and equal in dignity and rights._** All human
beings are born free and equal in dignity and rights. All human beings are born
free and equal in dignity and rights. All human beings are born free and equal
in dignity and rights.

## Struck through

~~All human beings are born free and equal in dignity and rights.~~ All human
beings are born free and equal in dignity and rights. All human beings are born
free and equal in dignity and rights. All human beings are born free and equal
in dignity and rights.

## Numbered lists

1. All human beings are born free and equal in dignity and rights.
1. All human beings are born free and equal in dignity and rights.
1. All human beings are born free and equal in dignity and rights.
1. All human beings are born free and equal in dignity and rights.

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Unnumbered lists

- All human beings are born free and equal in dignity and rights.
  - All human beings are born free and equal in dignity and rights.
- All human beings are born free and equal in dignity and rights.

    All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Mixed lists

- All human beings are born free and equal in `dignity and rights`.
    1. All human beings are born free and equal in `dignity and rights`.
        - All human beings are born free and equal in `dignity and rights`.
    2. All human beings are born free and equal in dignity and rights.
- All human beings are born free and equal in dignity and rights.

    All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Figures and captions

![Eleanor Roosevelt hält die englische Version der Allgemeinen Erklärung der Menschenrechte (FDR Presidential Library & Museum, CC BY 2.0
<https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons)](img/eleanor.jpeg){#fig:eleanor}

All human beings are born free and equal in dignity and rights. All human beings
are born free and equal in dignity and rights. All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights.

We can also generate subfigures (within `div` element):

<div id="fig:my-subfig-ref">
![first figure](img/eleanor.jpeg){#fig:subfig1 width=45%}\hfill
![and another one](img/cowicon.svg){#fig:subfig2 width=40%}

<!-- hack https://github.com/lierdakil/pandoc-crossref/issues/381 -->

This is the main caption of this figure
</div>


## Code

Let's start with some `inline code` and then move on to code blocks.

A bash script:

```bash
ping wikipedia.org
```

Some haskell code with a caption. It is important to use the `lst` prefix here.

<div id="lst:code" class="listing">
My haskell Listing, no line numbers
```haskell
main :: IO ()
main = putStrLn "Hello World!"
```
</div>

More info [here](http://lierdakil.github.io/pandoc-crossref/#code-block-labels) (other syntax also possible).


Here is some python code:

```{#code:test .python .numberLines}
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
fib(1000)
```

And now for some C code, using different caption syntax:

```{#lst:test2 .c .numberLines caption="Also with a caption"}
#include<stdio.h>
int main()
{
    int a, b = 10;
    a = -b--;
    printf("a = %d, b = %d", a, b);
    return 0;
}
```

## URLs and email addresses

[wikipedia.org](https://www.wikipedia.org/),
[info@wikipedia.org](mailto:info@wikipedia.org). All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights. All human beings are born free and equal in dignity and
rights. All human beings are born free and equal in dignity and rights.

## Tables

Check out some options [here](https://pandoc.org/chunkedhtml-demo/8.9-tables.html).

| column 1                                                        | column 2                                                        |
| ---                                                             | ---                                                             |
| All human beings are born free and equal in dignity and rights. | All human beings are born free and equal in dignity and rights. |
| All human beings are born free and equal in dignity and rights. | All human beings are born free and equal in dignity and rights. |

: Table caption goes here {#tbl:example_tbl}

And a more simple table, with custom `HTML class` for styling. With the amount of `---` we can set the relative width of a column too.

<div class="simple-table">

 col 1   | col 2  | col 3
 ---     | ---    | --------------
 row-1a  | row-1b | row1-c is a very long row, let's see how that will look
 row-2a  | row-2b | row2-c

: Simple table with custom styling {#tbl:simple}
</div>

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are
born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

And here goes a rather wide table (scrollable in x). Optionally, we can add a HTML `div` wrapper to set minimal column widths, or some other styling
spec. For `min-width`, the `class` options are: `c75`, `c100`,`c125`, `c150`, `c175`, `c200`, `c250`, `c300`, `cfull` (number corresponds to pixels). The
last one sets each column to full width of it's content. Note that this styling only applies to the HTML output. LaTeX is styled via the corresponding
LaTeX template.

<div class="cfull">
| column 1  | column 2           | column 3        | column 4    | column 5    | column 6         | column 7         |
| ---       | ---                | ---             | ---         | ---         | ---              | ---              |
| All human | beings are born    | free and equal  | in dignity  | and rights  | Period.          | Big row          |
| All human | beings are born    | free and equal  | in dignity  | and rights  | End of sentence  | check mobile     |

: A table with full column width (`class=cfull`)
</div>

A LaTeX table (other tex snippets also possible) that will be ignored in HTML, but allowed in `PDF` and `Tex` formats.

```{=tex}
\begin{center}
\captionof{table}{My table caption here}
\begin{tabular}{|l|l|}\hline
Age & Frequency \\ \hline
18--25  & 15 \\
26--35  & 33 \\
36--45  & 22 \\ \hline
\end{tabular}
\end{center}
```

## Footnotes

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are
born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.^[A footnote with an image inside the footnote. Pretty cool, but very ugly in a PDF doc of course. ![](img/eleanor.jpeg){height=5cm}] And you should now it's like this yeah. And not something else.

## Quotes

::: {lang=de}

> Alle Menschen sind frei und gleich an Würde und Rechten geboren.

:::

All human beings are born free and equal in dignity and rights. All human beings
are born free and equal in dignity and rights. All human beings are born free
and equal in dignity and rights. All human beings are born free and equal in
dignity and rights.

## Scientific citations

Syntax: `[@<ref-in-bibfile>`].

> All human beings are born free and equal in dignity and rights. They are
> endowed with reason and conscience and should act towards one another in a
> spirit of brotherhood [@unitednations1948].

All human beings are born free and equal in dignity and rights, and we can
combine multiple citations [@unitednations1948; @brown2016].

And let's try another one [@brown2016].

## Equations

$$x^2 + y^2 = z^2$$ {#eq:pythagoras}

## Cross-references

Thanks to [pandoc-crossref](https://lierdakil.github.io/pandoc-crossref/) you
can crossreference equations [@eq:pythagoras], figures ([@fig:eleanor]) and
tables ([@tbl:example_tbl]). We can also refer to sections in different files,
such as [@sec:conclusion].

Or, you can also do [@eq:pythagoras](#eq:pythagoras) to actually link it.

It is also possible to refer to a codeblock, e.g., [@Lst:code](#lst:code).

## Section with custom metadata {#sec:customsection}

Here, instead of the default `#section-with-custom-metadata`, the ID becomes
`#sec:customsection`). Now you can refer to it like
[@sec:customsection](#sec:customsection), with pre-configured prefixes like in
LaTeX.
