# Cow kit

Comfortable Open Writing Kit

- standardized open writing formats: plain HTML5, Markdown, and/or LateX
- zero platform dependencies (except for docker)
- zero setup costs or dependency issues (docker container)

## Run (and watch)

```sh
./utils/watcher.sh
```

(Defaults to Firefox active tab(s) reload, change/turn-off with `-b` option.)

### More info:

```sh
./utils/watcher.sh -h
```

## More comfort

If re-running build process is too slow for you, open `./layouts/html.yaml` and comment out stuff. Start with the <b>Lua filters</b> (which will skip
bibliography rebuilds). If still too slow, uncomment sections/chapters etc.

With the `utils/watcher.sh` you can update this at runtime.

## Dev

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest \
  --defaults=./config.yaml \
  --defaults=./layouts/html.yaml --template ./src/templates/default.html
```

## Refs

- https://pandoc.org/MANUAL.html
- https://github.com/maehr/academic-pandoc-template?tab=readme-ov-file
- https://github.com/wikiti/pandoc-book-template
