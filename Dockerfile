# SPDX-FileCopyrightText: 2024 Senne Van Baelen
# SPDX-License-Identifier: Apache-2.0

ARG APP_NAME=cowkit
ARG PANDOC_VERSION=latest-ubuntu
#ARG PANDOC_VERSION=latest
#FROM rust:${RUST_VERSION}-slim-bullseye AS build

FROM pandoc/latex:$PANDOC_VERSION
WORKDIR /app

RUN apt-get update && apt-get upgrade -y
# <https://github.com/krallin/tini>
# apt-get install tini
RUN apt-get install -y \
    inotify-tools \
    tini \
    python3

RUN rm -rf /var/lib/apt/lists/*

RUN mkdir example
COPY . /data/example/

# move executables to PATH
RUN mv /data/example/utils/watcher_docker.sh /usr/local/bin/watcher.sh
RUN mv /data/example/utils/entrypoint.sh /usr/local/bin/cowkit.sh

#CMD ["app"]
#ENTRYPOINT ["pandoc", "--version"]
#ENTRYPOINT ["/usr/bin/tini", "-g", "--"]
ENTRYPOINT ["/usr/bin/tini", "-g", "--", "cowkit.sh"]
