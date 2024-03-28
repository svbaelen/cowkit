#!/bin/sh

#---------------------------------------------------------
# Author(s):    Senne Van Baelen
# Contact:      senne@svbaelen.me
# Date created: 2024-03-25
#---------------------------------------------------------
# Short:        File watcher for pandoc conversion
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

# reload
#DO_BROWSER_RELOAD=1             # choose 1 or 0
#RELOAD_KEYS="CTRL+R"            # can also be F5 or something
#DEFAULT_BROWSER="firefox"
#BROWSER=${DEFAULT_BROWSER}      # set to 0 to disable browser reload

#=========================================================
# Options and positional arugments
#=========================================================

CONFIG_MAIN=$1
CONFIG_FORMAT=$2
TEMPLATE=$3
OUTPUT_DIR=$4

#=========================================================
# Functions
#=========================================================

run_pandoc () {
    pandoc \
      --defaults=${CONFIG_MAIN} \
      --defaults=${CONFIG_FORMAT} \
      --template=${TEMPLATE}
}

#=========================================================
# Main
#=========================================================

set -o errexit
set -o nounset

# Main program
IS_WAITING=0
echo "[INFO - watcher] watching files for pandoc rebuild"

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
        echo "[INFO - watcher] running pandoc"
        run_pandoc
        echo "[INFO - watcher] done - output file(s) updated"

        # reload
        # first arg, or default to firefox if not set
        #if [ $DO_BROWSER_RELOAD = 1 ];then
            #reload_browser
        #fi
    else
        if [ $IS_WAITING = 0 ];then
            LAST_EVENT=$EVENT
            LAST_EVENT_TIME=$EVENT_TIME
            IS_WAITING=1
            echo "[INFO - watcher] skipping rerun (timediff set to $TIME_UNTIL_RERUN sec)"
            sleep $TIME_DIFF
            echo "[INFO - watcher] running pandoc"
            run_pandoc
        else
            echo "[INFO - watcher] skipping rerun (timediff set to $TIME_UNTIL_RERUN sec)"
        fi
    fi
done
