#!/bin/sh

# SPDX-FileCopyrightText: 2024 Senne Van Baelen
#
# SPDX-License-Identifier: Apache-2.0

#---------------------------------------------------------
# Author(s):    Senne Van Baelen
# Contact:      senne@svbaelen.me
# Date created: 2024-03-25
#---------------------------------------------------------
# Short:        .
#---------------------------------------------------------

# Refs
# <https://linux.die.net/man/1/inotifywait>

#=========================================================
# Config
#=========================================================

MONITORDIR="./"
EVENT="close_write"
LAST_EVENT=
LAST_EVENT_TIME=0
VIM_FILE="4913"
TIME_UNTIL_RERUN=3
BUILD_DIR="build"               # TODO: make this configurable
BUILD_DIR_CHUNKED="build/html"  # TODO: make this configurable

#=========================================================
# Options and positional arugments
#=========================================================

usage()
{
    # In the here-doc (inside EOF - EOF):
    USAGE=$(
    cat << EOF | sed 's/\t\+\t/\t\t\t    /g'
Usage: $0 [OPTIONS]
Options:
    -h|--help|--usage       show usage

Note: requires Docker to be installed
EOF
)
printf "${USAGE}\n"
}

while [ -n "$1" ]; do
    case "$1" in
        -h|--help|--usage)
            usage;
            exit 1
            ;;
        -*|--*)
            printf "[ERROR] option not recognized. Exiting...\n"
            usage;
            exit 1
            ;;
        *)  # Default case:
            # this is requred to obtain a positional arugment at $1 later
            # (if desired)
            break
    esac
    shift
done

#=========================================================
# Functions
#=========================================================

run_docker () {
    echo "AA"
    rm -rf $BUILD_DIR_CHUNKED

    docker run --rm --volume "$(pwd):/data" \
      --user $(id -u):$(id -g)  pandoc/latex:latest \
      --defaults=./config/config.yaml \
      --defaults=./config/html/html.yaml \
      --template ./config/html/templates/default.chunked.html
}


#=========================================================
# Main
#=========================================================

set -o errexit
set -o nounset

mkdir -p ./build/

# Main program
IS_WAITING=0
echo "[INFO - watcher] watching files for pandoc re-run (docker)"

inotifywait -m -r -e ${EVENT} -q \
   --timefmt "%s" --format '%f##@@##%e##@@##%w##T%T' "${MONITORDIR}" | while read line
do
    DEL_TIME="##T"
    DEL_FILE="##@"
    EVENT_TIME=$(echo "$line" | awk -v delimeter="$DEL_TIME" \
        '{split($0,a,delimeter)} END{print a[2]}')
    EVENT=$(echo "$line" | awk -v delimeter="$DEL_TIME" \
        '{split($0,a,delimeter)} END{print a[1]}')
    TIME_DIFF=$(( $EVENT_TIME - $LAST_EVENT_TIME ))

    FILE=$(echo "$line" | awk -v delimeter="$DEL_FILE" \
        '{split($0,a,delimeter)} END{print a[1]}')

    DIR=$(echo "$EVENT" | awk -v delimeter="##" \
        '{split($0,a,delimeter)} END{print a[5]}')

    if [ "${FILE}" = "${VIM_FILE}" ];then
        continue;
    fi

    # dirs to exclude
    case "$DIR" in
        *build*)
            continue
            ;;
    esac

    if [ $TIME_DIFF -gt $TIME_UNTIL_RERUN ]; then
        #echo "$EVENT"
        IS_WAITING=0
        echo "[INFO - watcher] updated ${FILE}"

        LAST_EVENT_TIME=$EVENT_TIME
        echo "[INFO - watcher] running pandoc in docker"
        run_docker
        echo "[INFO - watcher] pandoc finished"

        # reload
        # first arg, or default to firefox if not set
    else
        if [ $IS_WAITING = 0 ];then
            LAST_EVENT=$EVENT
            LAST_EVENT_TIME=$EVENT_TIME
            IS_WAITING=1
        fi
        #echo $FILE
        echo "[INFO - watcher] skipping rerun (timediff set to $TIME_UNTIL_RERUN sec)"
    fi
done
