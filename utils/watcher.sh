#!/bin/sh

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

# reload
DO_BROWSER_RELOAD=1             # choose 1 or 0
RELOAD_KEYS="CTRL+R"            # can also be f5 or something
DEFAULT_BROWSER="firefox"
BROWSER=${DEFAULT_BROWSER}      # if "" (empty), no browser reload

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
    -b|--browser BROWSER    reload active browser tab. Default browser: ${DEFAULT_BROWSER}
                            (options: 0, firefox, chromium, chrome, safari)
                            set to 0 to disable browser reloads
    -h|--help|--usage       show usage

Dependencies: this script uses Docker. Make sure this is installed on your system.
EOF
)
printf "${USAGE}\n"
}

while [ -n "$1" ]; do
    case "$1" in
        -b|--browser) BROWSER=$2
            case "$BROWSER" in
                "0")
                    printf "[INFO - watcher] skipping browser reloads\n"
                    DO_BROWSER_RELOAD=0
                    ;;
                firefox) ;;
                chrome)  ;;
                chromium) ;;
                "")
                    printf "[ERROR - watcher] browser cannot be empty\n"
                    usage;
                    exit 1
                    ;;
                *)
                    printf "[WARNING - watcher] browser '$BROWSER' unknown\n"
                    printf "[WARNING - watcher] program likely search \
and reload all open browser tabs\n"
                    ;;
            esac
            shift
            ;;
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
    docker run --rm --volume "$(pwd):/data" \
      --user $(id -u):$(id -g)  pandoc/latex:latest \
      --defaults=./config.yaml \
      --defaults=./layouts/html.yaml --template ./src/templates/default.html
}

reload_browser() {
    # find all visible browser windows
    browser_windows="$(xdotool search --sync --all --onlyvisible --name ${BROWSER})"

    # Send keystroke
    for bw in $browser_windows; do
        xdotool key --window "$bw" "$RELOAD_KEYS"
    done
}

#=========================================================
# Main
#=========================================================

set -o errexit
set -o nounset

# Main program
IS_WAITING=0
echo "[INFO - watcher] watching files for pandoc re-run (docker)"
if [ $DO_BROWSER_RELOAD = 1 ];then
    echo "[INFO - watcher] activating browser reload for $BROWSER"
fi

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
        if [ $DO_BROWSER_RELOAD = 1 ];then
            reload_browser
        fi
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
