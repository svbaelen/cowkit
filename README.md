# cowkit

![cowkit](./assets/img/cowkit_logo.svg)

## Comfortable features

- convenient yet [far from perfect](#caveats-and-known-limitations)
- standardized <b>open formats</b>: Markdown, plain HTML, and/or LateX
- zero setup, no framework dependencies (only requires docker)
- fully customizable
- <b>focus on writing</b> instead of compiling (filewatcher + live build + reload)

Built on top of [Pandoc](https://pandoc.org/) (file format converter), and partially inspired by this [pandoc book template](https://github.com/wikiti/pandoc-book-template).

## Get started (using docker)

```sh
docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" -p 8000:8000 cowkit:latest
```

For native runtime environment, see [development](#development) section.

## More info:

```sh
docker run cowkit:latest --help
```

## Config

- `config/config.yaml`: main pandoc config
- `config/<fmt>/layout.yaml`: output-specific config + layout (can overwrite parts of main `config.yaml`).
- `config/<fmt>/templates/<file>`: templates related to various output formats
- `src/<file>.md`: in the metadata section of each markdown file (between `---`) one can add all kinds of metadata and config options supported by pandoc
   (and pandoc extensions), e.g., [see here](https://github.com/svbaelen/cowkit/blob/main/src/00_base.md?plain=1#L3).

<b>Additional functionality</b> such as auto-reload <b>can be disabled</b> or <b>extended</b> via the `header-includes` section in the markdown metadata, e.g., see [this example](https://github.com/svbaelen/cowkit/blob/main/src/00_base.md?plain=1#L33).

One can also specify specific config or template files via `cowkit` CLI arguments.

## More comfort

If re-running build process is too slow for you, open `./layouts/html.yaml` and comment out stuff. Start with the <b>Lua-based filters</b> (which will skip
bibliography rebuilds). If still too slow, uncomment sections/chapters etc.

With the `watcher` utility you can update this at runtime.

## Caveats and known limitations

### HTML output

- browser auto-reload after rebuild is based on [LiveJS](https://livejs.com/), however, sometimes a manual refresh is necessary on the browser tab
  to re-initialize this script. This seems to occur on layout changes (not always). Need to inspect!

## Development

### Build HTML

```sh
pandoc --defaults=./config/config.yaml --defaults=./config/html/html.yaml \
  --template ./config/html/templates/default.html
```

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml \
  --defaults=./config/html/html.yaml --template ./config/html/templates/default.html
```

### Build PDF

```sh
pandoc   --defaults=./config/config.yaml   --defaults=./config/pdf/layout.yaml
```

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config/config.yaml   --defaults=./config/pdf/pdf.yaml
```

### Build docker image

Example:

```sh
docker build -t cowkit:latest -t cowkit:v0.1.0 .
```

### Watcher

```sh
./utils/watcher.sh
```

## Refs

- https://pandoc.org/MANUAL.html
- https://github.com/maehr/academic-pandoc-template?tab=readme-ov-file
- https://github.com/wikiti/pandoc-book-template

