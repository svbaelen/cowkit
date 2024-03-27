# Introduction {#sec:introduction label="Introduction"}

This could be your intro. Let's go.

## Heading 2

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

### Heading 3

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

#### Heading 4

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Bold

**All human beings are born free and equal in dignity and rights.** All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Italic

_All human beings are born free and equal in dignity and rights._ All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Bold and italic

**_All human beings are born free and equal in dignity and rights._** All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Struck through

~~All human beings are born free and equal in dignity and rights.~~ All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

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

- All human beings are born free and equal in dignity and rights.
    1. All human beings are born free and equal in dignity and rights.
    2. All human beings are born free and equal in dignity and rights.
- All human beings are born free and equal in dignity and rights.

    All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Figures and captions

![Eleanor Roosevelt hält die englische Version der Allgemeinen Erklärung der Menschenrechte (FDR Presidential Library & Museum, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons)](img/Eleanor_Roosevelt_and_Human_Rights_Declaration.jpeg){#fig:eleanor}

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

What about this figure.


## Code

Let's start with some `inline code` and then move on to code blocks.

A bash script

```bash
ping wikipedia.org
```

Some haskell code with a caption. It is important to use the `lst` prefix here.

<div id="lst:code" class="listing">
My haskell Listing caption
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

[wikipedia.org](https://www.wikipedia.org/), [info@wikipedia.org](mailto:info@wikipedia.org). All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Tables

| column 1                                                        | column 2                                                        |
| --------------------------------------------------------------- | --------------------------------------------------------------- |
| All human beings are born free and equal in dignity and rights. | All human beings are born free and equal in dignity and rights. |
| All human beings are born free and equal in dignity and rights. | All human beings are born free and equal in dignity and rights. |
| All human beings are born free and equal in dignity and rights. | All human beings are born free and equal in dignity and rights. |
| All human beings are born free and equal in dignity and rights. | All human beings are born free and equal in dignity and rights. |

: Table caption {#tbl:example_tbl}

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

<table>
<tr>
<th>Company</th>
<th>Contact</th>
<th>Country</th>
</tr>
<tr>
<td>Alfreds Futterkiste</td>
<td>Maria Anders</td>
<td>Germany</td>
</tr>
<tr>
<td>Centro comercial Moctezuma</td>
<td>Francisco Chang</td>
<td>Mexico</td>
</tr>
</table>


## Footnotes

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are
born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.^[All human beings are born free and equal
in dignity and rights. ![Some image](img/Eleanor_Roosevelt_and_Human_Rights_Declaration.jpeg)] And you should now it's like this yeah. And not something else.

## Quotes

::: {lang=de}

> Alle Menschen sind frei und gleich an Würde und Rechten geboren.

:::

All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights. All human beings are born free and equal in dignity and rights.

## Scientific citations

> All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a
> spirit of brotherhood [@unitednations1948].

All human beings are born free and equal in dignity and rights, and we can combine multiple citations [@unitednations1948; @brown2016].

And let's try another one [@brown2016].

## Equations

$$x^2 + y^2 = z^2$$ {#eq:pythagoras}

## Cross-references

Thanks to [pandoc-crossref](https://lierdakil.github.io/pandoc-crossref/) you can crossreference equations [@eq:pythagoras], figures
([@fig:eleanor]) and tables ([@tbl:example_tbl]). We can also refer to sections in different files, such as ([@sec:conclusion]).

Or, you can also do [@eq:pythagoras](#eq:pythagoras) to actually link it.

It is also possible to refer to a codeblock, e.g., [@Lst:code](#lst:code).
