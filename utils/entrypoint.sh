#!/bin/sh

#---------------------------------------------------------
# Author(s):    Senne Van Baelen
# Contact:      senne@svbaelen.me
# Date created: 2024-03-25
#---------------------------------------------------------
# Short:        Cowkit entrypoint for dockerfile
#---------------------------------------------------------

# <https://pandoc.org/MANUAL.html>

#=========================================================
# Config
#=========================================================

INIT=0
RUN_ONCE=0
HTTP_SERVE=1
HTTP_PORT=8000
OUTPUT_DIR="./build"
FMT_OUT="<fmt>"
FMT_OUT_DEFAULT="html"
FMT_TMPL="${FMT_OUT}"
CONFIG_MAIN="./config/config.yaml"
CONFIG_FORMAT="./config/${FMT_OUT}/layout.yaml"
TEMPLATE="./config/${FMT_OUT}/templates/default.${FMT_TMPL}"
TEMPLATE_IN=""
CONFIG_FORMAT_IN=""
LAUNCH_EXAMPLES="https://github.com/svbaelen/cowkit#examples"

#=========================================================
# Options and positional arugments
#=========================================================

usage()
{
    # In the here-doc (inside EOF - EOF):
    USAGE=$(
    cat << EOF | sed 's/\t\+\t/\t\t\t    /g'
Usage: cowkit [OPTIONS]
Options:
    -h|--help|--usage       show usage
    -n|--new|--init         initialize new project (based on default example)
    -s|--single-run         run pandoc once and serve, no file watcher
    -ns|--no-serve          no HTTP server
    -f|--format FMT         output format (=fmt)
                            available options: {$FMT_OUT_DEFAULT (default), pdf, tex}
    -o|--output-dir DIR     output directory (default '$OUTPUT_DIR'). Note that
                            this need to match the output in '${CONFIG_FORMAT}'
    -t|--template FILE      template file (default: '${TEMPLATE}')
                            note: for the pdf format, use a .tex template
    -l|--layout FILE        layout + config (default: '${CONFIG_FORMAT}')
EOF
)
printf "${USAGE}\n"
}


# update defaults
FMT_OUT="${FMT_OUT_DEFAULT}"

while [ -n "$1" ]; do
    case "$1" in
        -n|--init|--new) INIT=1
            ;;
        -s|--single-run) RUN_ONCE=1
            ;;
        -ns|--no-serve) HTTP_SERVE=0
            ;;
        -o|--output-dir) OUTPUT_DIR=$2
            shift;
            ;;
        -f|--format) FMT_OUT=$2
            shift;
            ;;
        -t|--template) TEMPLATE_IN=$2
            shift;
            ;;
        -l|--layout) CONFIG_FORMAT_IN=$2
            shift;
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
# Prep & config
#=========================================================

# update configs
CONFIG_FORMAT="./config/${FMT_OUT}/layout.yaml"

# make latex stuff available
#TEXDIR=$( kpsewhich -var-value=TEXMFLOCAL )
export TEXINPUTS="./config/pdf/templates:"

if [ "${FMT_OUT}" = "pdf" ];then
    FMT_TMPL="tex"
    #TEMPLATE="eisvogel"
    # https://github.com/pandoc/dockerfiles/blob/master/ubuntu/Dockerfile#L191
    #TEMPLATE="./config/${FMT_OUT}/templates/default.${FMT_TMPL}"
    #cp "$TEMPLATE" /.pandoc/templates/default.latex
else
    FMT_TMPL=$FMT_OUT
fi

if [ -z "${TEMPLATE_IN}" ];then
    TEMPLATE="./config/${FMT_OUT}/templates/default.${FMT_TMPL}"
else
    TEMPLATE="${TEMPLATE_IN}"
fi

if [ -z "${CONFIG_FORMAT_IN}" ];then
    CONFIG_FORMAT="./config/${FMT_OUT}/layout.yaml"
else
    CONFIG_FORMAT="${CONFIG_FORMAT_IN}"
fi


if [ "${FMT_OUT}" = "pdf" ] || [ "${FMT_OUT}" = "tex" ];then
    HTTP_SERVE=0
fi


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

if [ $INIT = 1 ];then
    printf "[INFO - main] initializing new cowkit project...\n"

    if [ -d /app/config ];then
        printf "\n[ERROR - main] './config' directory already exists here\n"
        printf "[ERROR - main] exiting (better safe than sorry)\n"
        exit 1
    fi
    if [ -d /app/src ];then
        printf "\n[ERROR - main] './src' directory already exists here\n"
        echo "[ERROR - main] exiting (better safe than sorry)\n"
        exit 1
    fi
    cp -r /data/example/config /app
    cp -r /data/example/src /app

    if [ $RUN_ONCE = 1 ];then
        echo "[INFO - main] running pandoc once"
        mkdir -p /app/${OUTPUT_DIR}
        echo "[INFO - main] initializing: {format='$FMT_OUT', output directory '$OUTPUT_DIR'}"
        echo "[INFO - main] use ${FMT_OUT} config '$CONFIG_FORMAT'"
        echo "[INFO - main] use ${FMT_OUT} template '$TEMPLATE'"
        cd /app
        run_pandoc
        echo "[INFO - main] finished - output in ${OUTPUT_DIR}"
        exit 1
    else
        echo "[INFO - main] some examples: $LAUNCH_EXAMPLES"
        echo "[INFO - main] Success. Next up: launch!"
    fi

    exit 1
fi

# make build dir
mkdir -p /app/${OUTPUT_DIR}
echo "[INFO - main] initializing: {format='$FMT_OUT', output directory '$OUTPUT_DIR'}"
echo "[INFO - main] use ${FMT_OUT} config '$CONFIG_FORMAT'"
echo "[INFO - main] use ${FMT_OUT} template '$TEMPLATE'"

if [ $RUN_ONCE = 1 ];then
    echo "[INFO - main] running pandoc once..."
    cd /app
    run_pandoc
    #echo "[INFO - main] done"
    #if [ "${FMT_OUT}" = "html" ];then
        #echo "[INFO - main] generate PDF for download (only first time)"
        #sed -e  "s/to:.*/to:pdf/g" "$CONFIG_FORMAT" > "$CONFIG_FORMAT.tmp"
        #sed -e  "s/.html/.pdf/g" "$CONFIG_FORMAT.tmp" > "$CONFIG_FORMAT.tmp2"
        #mv -- "$CONFIG_FORMAT.tmp2" "$CONFIG_FORMAT.tmp"
    #fi
    echo "[INFO - main] finished - output in ${OUTPUT_DIR}"
    exit 1
    # serve
    #if [ $HTTP_SERVE = 1 ];then
        #printf "[INFO - main] "
        #printf "=> ----------------------------------------------\n"
        #echo "[INFO - main] => serving at http://localhost:$HTTP_PORT (in $OUTPUT_DIR)"
        #printf "[INFO - main] "
        #printf "=> ----------------------------------------------\n"
        #cd /app/build
        #python3 -m http.server $HTTP_PORT > /dev/null 2>&1
    #fi
else
    # assumes -v "$(pwd):/app" in docker run
    # run once
    cd /app
    echo "[INFO - main] running initial build... (takes several seconds)"
    run_pandoc
    echo "[INFO - main] finished - output in ${OUTPUT_DIR}"

    # serve
    if [ $HTTP_SERVE = 1 ];then
        cd /app/$OUTPUT_DIR
        printf "[INFO - main] "
        printf "=> ----------------------------------------------\n"
        echo "[INFO - main] => serving at http://localhost:$HTTP_PORT (in $OUTPUT_DIR)"
        printf "[INFO - main] "
        printf "=> ----------------------------------------------\n"
        python3 -m http.server $HTTP_PORT > /dev/null 2>&1 &
    fi
    # watch
    cd /app
    echo "[INFO - main] launching file watcher..."
    # run ./utils/watcher_docker.sh in docker container
    watcher.sh "$CONFIG_MAIN" "$CONFIG_FORMAT" "$TEMPLATE" "$OUTPUT_DIR"
fi
