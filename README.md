# cowkit

![cowkit](./assets/img/cowkit_logo.svg)

## Comfortable features

- Convenient, though [far from perfect](#caveats-and-known-limitations)
- Standardized <b>open formats</b>: Markdown, HTML5, and/or LateX
- Zero setup, no frameworks (requires only [Docker](https://docs.docker.com/engine/install/) or [Pandoc](https://pandoc.org/))
- Easy on the eyes & fully customizable (styling, metadata, layout, ...)
- <b>Focus on writing</b> instead of compiling (file-watcher + auto build)

Built on top of [Pandoc](https://pandoc.org/) (file format converter), and partially inspired by this [pandoc book template](https://github.com/wikiti/pandoc-book-template).

## Get started (using docker)

For default HTML output + file watcher:

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit:latest
```

Check <b>available options</b> for `cowkit` CLI utility:

```sh
docker run cowkit:latest --help
```

For native non-docker runtime, see [development](#development) section.

### Initialize new project

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit:latest --init
```

## Configuration

- `config/config.yaml`: main pandoc config
- `config/<fmt>/layout.yaml`: output-specific layout + config (can overwrite values set in `config.yaml`).
- `config/<fmt>/templates/<file>`: templates related to various output formats
- `src/<file>.md`: in the metadata section of each markdown file (between `---`) one can add all kinds of metadata and config options supported by pandoc
   (and pandoc extensions), e.g., [see here](https://github.com/svbaelen/cowkit/blob/main/src/00_base.md?plain=1#L3).


Set (different) config and/or template files via `cowkit` <b>CLI arguments</b>.

<b>Additional functionality</b> such as auto-reload <b>can be disabled</b> or <b>extended</b> via the `header-includes` section in the markdown metadata, e.g., see [this example](https://github.com/svbaelen/cowkit/blob/main/src/00_base.md?plain=1#L33).


## More comfort

If re-running build process is too slow for you, open `./layouts/html.yaml` and comment out stuff. Start with the <b>Lua-based filters</b> (which will skip
bibliography rebuilds). If still too slow, uncomment sections/chapters etc.

With the `watcher` utility you can update this at runtime.

## Caveats and known limitations

### General:

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
pandoc  --defaults=./config/config.yaml   --defaults=./config/pdf/layout.yaml
```

With docker:

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml   --defaults=./config/pdf/layout.yaml
```
