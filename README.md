# Cow kit

Comfortable {Open Online}  Writing Kit

- zero platform dependencies, only a well established document converter (https://pandoc.org/)
- zero setup costs (runs in docker)
- standardized writing formats: plain HTML5, Markdown, and/or LateX.

## Dev

```sh
docker run --rm --volume "$(pwd):/data" \
  --user $(id -u):$(id -g)  pandoc/latex:latest-ubuntu \
  --defaults=./config.yaml \
  --defaults=./layouts/html.yaml --template ./src/templates/default.html
```

## Refs

- https://pandoc.org/MANUAL.html
- https://github.com/maehr/academic-pandoc-template?tab=readme-ov-file
- https://github.com/wikiti/pandoc-book-template
