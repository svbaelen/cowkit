<!--
SPDX-FileCopyrightText: 2024 Senne Van Baelen

SPDX-License-Identifier: Apache-2.0
-->

# Cowkit CLI examples

## Important remarks

- These examples assume you set [the alias](../README.md#create-alias) `cowkit` for the docker `run` command. Alternatively, use the [full docker
command](../README.md#get-started).
- All commands here have the `-s` options: this ensures a <b>single run</b>, i.e., no file watching or HTTP serving.

## HTML

TODO

## PDF / LaTeX

PDF outputs are generated based on `latex` templates (and a `tex` compiler). Of course, you might want to adjust things here and there before
publishing, so as <b>an intermediate step</b>, compile to `.tex` first, do the finetuning, and then convert to PDF yourself.


### Default

(See [template](https://github.com/svbaelen/cowkit/tree/main/config/tex/templates/default.tex))

To PDF (default output: `./build/index.pdf`)

```sh
cowkit -s -f pdf
```

To TEX as intermediate step (default output: `./build/index.tex`)

```sh
cowkit -s -f tex
```

### IEEEConf (two columns)

To PDF (default output: `./build/index.pdf`)

```sh
cowkit -s -f pdf -t config/tex/templates/ieeeconf.tex
```

To TEX as intermediate step (default output: `./build/index.tex`)

```sh
cowkit -s -f tex -t config/tex/templates/ieeeconf.tex
```
