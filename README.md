# cowkit

## A Comfortable Open Writing Kit

Comfortable, that is:
- standardized <b>open formats</b>: Markdown, plain HTML, and/or LateX
- zero setup, no framework dependencies (only requires docker)
- fully customizable
- <b>focus on productivity</b> (write with auto watch + auto tab reload)
- comfortable enough, though [far from perfect](#caveats-and-known-limitations)

Built on top of [Pandoc](https://pandoc.org/) (file format converter), and inspired by this [pandoc book template](https://github.com/wikiti/pandoc-book-template).

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
- `config/<outputtype.yaml>`: output-specific config + document outline.
- `src/00_base.md`: main document info, such as metadata, titlepage, headers, bibliographies, etc.
- `src/templates/<file>`: templates related to various output formats

To turn off <b>auto-reload</b> for HTML output, simply comment out the `header-includes` line related to `live_reload.js` script in the
[00_base.md](./src/00_base.md) file.

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

