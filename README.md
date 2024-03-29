# cowkit

![cowkit](./assets/img/cowkit_logo.svg)

## Comfortable features

- Convenient, though [far from perfect](#caveats-and-known-limitations)
- Standardized <b>open formats</b>: Markdown, HTML5, and/or LateX
- Zero setup, no frameworks (requires only [Docker](https://docs.docker.com/engine/install/) with [Pandoc](https://pandoc.org/)-based image)
- Easy on the eyes & fully customizable (styling, metadata, layout, ...)
- <b>Focus on writing</b> instead of compiling (file-watcher + auto build)

Built on top of [Pandoc](https://pandoc.org/) (file format converter), and inspired by this [pandoc book template](https://github.com/wikiti/pandoc-book-template).

## Get started

For default HTML output (and file watcher + HTTP server):

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit
```

You can specify a `cowkit` <b>version</b> with the image tag, e.g., `cowkit:latest`.  For a non-docker runtime environment, see [development](#development)
section.

### CLI options

Check <b>available options</b> for the `cowkit` utility with `--help`:

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit --help
```

### Initialize new project

This will initialize an example project with defaults you can easily adjust.

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit --init
```

### Update to latest version

```sh
docker image pull cowkit:latest
```

## Configuration

- `config/config.yaml`: main pandoc config
- `config/<fmt>/layout.yaml`: output-specific layout + config (can overwrite values set in `config.yaml`).
- `config/<fmt>/templates/<file>`: templates related to various output formats
- `src/<file>.md`: in the metadata section of each markdown file (between `---`) one can add all kinds of metadata and config options supported by pandoc
   (and pandoc extensions), e.g., [see here](https://github.com/svbaelen/cowkit/blob/main/src/00_base.md?plain=1#L3).


Set (different) config and/or template files via `cowkit` <b>CLI arguments</b>.

<b>Additional functionality</b> such as auto-reload <b>can be disabled</b> or <b>extended</b> via the `header-includes` section in the markdown metadata, e.g., see [this example](https://github.com/svbaelen/cowkit/blob/main/src/00_base.md?plain=1#L41).

## Examples

See [here](./examples/README.md)

## More comfort

### Create alias

Create an <b>alias</b> to one or more relevant docker commands. Note that you can replace `.bash_aliases` with `.bashrc` or some other shell config file in your `PATH`:

```sh
# map to `cowkit`
CMD='docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit'
echo "alias cowkit='$CMD'" >> ~/.bash_aliases && source ~/.bash_aliases
```

Note that CLI arguments still work, e.g.:
 - `cowkit --init`
 - `cowkit --format pdf --template /path/to/template`

Naturally, these commands can be updated or removed anytime in `~/.bash_aliases`.

### Speed up building

If re-running build process is too slow for you, open a `./config/<fmt>/layout.yaml` file and comment out stuff. Start with the <b>Lua-based
filters</b> (which will skip bibliography rebuilds). If still too slow, uncomment sections/chapters etc.

## Caveats and known limitations

### General:

- Designed to render on browser-desktop environments, <i>not</i> yet optimized for mobile
- Tested only on
  - Ubuntu 22.04

### CLI utility

- A fatal Pandoc error can crash the program (and file-watcher/builder), requiring the user to re-launch

### HTML output

- browser auto-reload after rebuild is based on [LiveJS](https://livejs.com/), however, sometimes a manual refresh is necessary on the browser tab
  to re-initialize this script. This seems to occur on layout changes (not always). Need to inspect!

## Development

### Build docker image

Example:

```sh
docker build -t cowkit:latest -t cowkit:v0.1.0 .
```

### Build HTML

Native Pandoc:

```sh
pandoc --defaults=./config/config.yaml --defaults=./config/html/layout.yaml \
  --template ./config/html/templates/default.html
```

With docker:

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml \
  --defaults=./config/html/layout.yaml --template ./config/html/templates/default.html
```

### Build PDF

```sh
pandoc --defaults=./config/config.yaml --defaults=./config/pdf/layout.yaml
```

With docker:

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml   --defaults=./config/pdf/layout.yaml
```
