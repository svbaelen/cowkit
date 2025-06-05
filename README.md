<!--
SPDX-FileCopyrightText: 2024 Senne Van Baelen

SPDX-License-Identifier: Apache-2.0
-->

# cowkit

[![REUSE
status](https://api.reuse.software/badge/github.com/svbaelen/cowkit)](https://api.reuse.software/info/github.com/svbaelen/cowkit)

![cowkit](./assets/img/cowkit_logo.svg)

## Comfortable features

Write and compose in markdown (or HTML) - [convert to HTML](https://svbaelen.github.io/cowkit/), LaTeX, and PDF.

- Convenient, though [far from perfect](#caveats-and-known-limitations)
- Can handle **interconnected content structures** (auto numbering of sections, tables, figures, etc.; `.bib`-based references and citations;
  among many other things. Also see [example output](https://svbaelen.github.io/cowkit/))
- Zero setup, no frameworks (requires only [Docker](https://docs.docker.com/engine/install/) with [Pandoc](https://pandoc.org/)-based image)
- Fully customizable (styling, metadata, layout, ...)
- <b>Focus on writing</b> instead of compiling (file-watcher + auto build)

Built on top of [Pandoc](https://pandoc.org/) (file format converter), and inspired by this [pandoc book template](https://github.com/wikiti/pandoc-book-template).

## Documentation

📚 **[View the full documentation](docs/README.md)** for detailed guides on configuration, templates, filters, and more.

## Get started

### Initialize new (example) project

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit --init
```

**Custom port example:**
```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 9500:8000 -e HOST_PORT=9500 svbaelen/cowkit --init
```

### Run

For default HTML output (and file watcher + HTTP server):

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit
```

**Custom port example:**
```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 9500:8000 -e HOST_PORT=9500 svbaelen/cowkit
```

See the [config section](#configuration) to find out where to put what.
<b>Other examples</b> can be [found here](./examples/examples_cli.md).

You can specify a `cowkit` <b>version</b> with the image tag, e.g.,
`cowkit:latest`.  For a non-docker runtime environment, see
[development](#development) section.

### CLI options

Check <b>available options</b> for the `cowkit` utility with `--help`:

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit --help
```

### Update to latest version

```sh
docker image pull svbaelen/cowkit:latest
```

## Configuration

- `config/config.yaml`: main (output-independent) <b>config</b>
- `config/<fmt>/config.yaml`: output-specific <b>config</b> (can overwrite values set in main `config.yaml`).
- `config/<fmt>/templates/<file>`: <b>templates</b> related to specific output formats
- `src/<file>.md`: <b>content</b> files written in **markdown**. Every section, subsection, paragraph, figure, etc. *can*
  have a separate file. In the <b>metadata section</b> of each markdown file (between `---`) you can add all kinds of metadata and config options supported
  by pandoc (and pandoc extensions), e.g., [see here](https://github.com/svbaelen/cowkit/blob/main/src/_base.md?plain=1#L3).

Set (different) config and/or template files via `cowkit` <b>[CLI arguments](#cli-options)</b>.

<b>Additional functionality</b> such as auto-reload <b>can be disabled</b> or <b>extended</b> via the `header-includes` section in the markdown metadata, e.g., see [this example](https://github.com/svbaelen/cowkit/blob/main/src/_base.md?plain=1#L60).

## Examples

- See [cowkit CLI examples here](./examples/examples_cli.md)
- For an <b>example output</b> document, check out [this webpage](https://svbaelen.github.io/cowkit/).

## More comfort

### Create alias

Create an <b>alias</b> to one or more relevant docker commands. Note that you can replace `.bash_aliases` with `.bashrc` or some other shell config file in your `PATH`:

```sh
# map to `cowkit`
CMD='docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 svbaelen/cowkit'
echo "alias cowkit='$CMD'" >> ~/.bash_aliases && source ~/.bash_aliases
```

Note that CLI arguments still work, e.g.:
 - `cowkit --init`
 - `cowkit --format pdf --template /path/to/template`

Naturally, these commands can be updated or removed anytime in `~/.bash_aliases`.

### Speed up building

If re-running build process is too slow for you, open a `./config/<fmt>/config.yaml` file and comment out stuff. Start with the <b>Lua-based
filters</b> (which will skip bibliography rebuilds). If still too slow, uncomment sections/chapters etc.

## Caveats and known limitations

### General:

- Tested only on
  - Ubuntu 22.04 and 24.04

### CLI utility

- A fatal Pandoc error can crash the program (and file-watcher/builder), requiring the user to re-launch

### HTML output

- browser auto-reload after rebuild is based on [LiveJS](https://livejs.com/),
  however, sometimes a manual refresh is necessary on the browser tab to
  re-initialize this script. This seems to occur on layout changes (not always).
  Need to inspect!

## Development

### Test with one command (host port 9500)

#### Initially

```sh
docker build -t svbaelen/cowkit:latest -t svbaelen/cowkit:v0.2.0 . \
    && mkdir -p test && cd test \
    && rm -rf * \
    && docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" \
        -p 9500:8000 -e HOST_PORT=9500 svbaelen/cowkit --init \
    && docker run -u $(id -u):$(id -g) --rm \
        -v "$(pwd):/app" -p 9500:8000 -e HOST_PORT=9500 svbaelen/cowkit
```

#### When already in `test` dir

```sh
cd ../ \
    && docker build -t svbaelen/cowkit:latest -t svbaelen/cowkit:v0.2.0 . \
    && cd test \
    && rm -rf * \
    && docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" \
        -p 9500:8000 -e HOST_PORT=9500 svbaelen/cowkit --init \
    && docker run -u $(id -u):$(id -g) --rm \
        -v "$(pwd):/app" -p 9500:8000 -e HOST_PORT=9500 svbaelen/cowkit
```


### Build docker image

Example:

```sh
docker build -t svbaelen/cowkit:latest -t svbaelen/cowkit:v0.2.0 .
```

Push to repo:

```sh
docker push svbaelen/cowkit --all-tags
```

### Build HTML

Native Pandoc:

```sh
pandoc --defaults=./config/config.yaml --defaults=./config/html/config.yaml \
  --template ./config/html/templates/default.html
```

With docker:

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml \
  --defaults=./config/html/config.yaml --template ./config/html/templates/default.html
```

### Build PDF

```sh
pandoc --defaults=./config/config.yaml --defaults=./config/pdf/config.yaml
```

With docker:

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml   --defaults=./config/pdf/config.yaml
```
## Acknowledgements

This project is built on, or inspired by:

- [Markdown](https://en.wikipedia.org/wiki/Markdown)
- [Pandoc](https://github.com/jgm/pandoc)
- [Edward Tufte](https://github.com/edwardtufte/tufte-css)
- [Pandoc crossref](https://github.com/lierdakil/pandoc-crossref)
- Other Pandoc-based projects:
    - [Pandoc book template](https://github.com/wikiti/pandoc-book-template)
    - [Pandoc academic templates](https://github.com/maehr/academic-pandoc-template)
