#!/bin/sh

#---------------------------------------------------------
# Author(s):    Senne Van Baelen
# Contact:      senne@svbaelen.me
# Date created: 2024-03-25
#---------------------------------------------------------
# Short:        Cowkit entrypoint for dockerfile
#---------------------------------------------------------

#=========================================================
# Config
#=========================================================

INIT=0
RUN_ONCE=0
HTTP_PORT=8000

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
    -i|--init               initialize new project
    -r|--run-once           run pandoc once, no watcher

Note: requires Docker to be installed
EOF
)
printf "${USAGE}\n"
}

while [ -n "$1" ]; do
    case "$1" in
        -i|--init) INIT=1
            ;;
        -r|--run-once) RUN_ONCE=1
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

run_pandoc () {
    pandoc \
      --defaults=./config.yaml \
      --defaults=./layouts/html.yaml --template ./src/templates/default.html
}

#=========================================================
# Main
#=========================================================

# make build dir
mkdir -p /app/build/

if [ $INIT = 1 ];then
    echo "Initializing new project..."
    echo "OOSP: not yet implementend"
    #mv build/index.html /app/newfile.html
elif [ $RUN_ONCE = 1 ];then
    python3 -V
    echo "[INFO - main] running pandoc once..."
    run_pandoc
else
    # assumes -v "$(pwd):/app" in docker run
    # run once
    cd /app
    echo "[INFO - main] running pandoc (first time)..."
    run_pandoc
    # serve
    echo "[INFO - main] serving at http://localhost:$HTTP_PORT"
    cd /app/build
    python3 -m http.server $HTTP_PORT > /dev/null 2>&1 &
    # watch
    cd /app
    echo "[INFO - main] launcher file watcher..."
    watcher.sh
fi
