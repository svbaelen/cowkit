#!/bin/sh

# SPDX-FileCopyrightText: 2024 Senne Van Baelen
#
# SPDX-License-Identifier: Apache-2.0

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
SUBDIR_CHUNKED_HTML='html' # default: `./build/html`
SCRIPTS_DIR='./src/scripts'
ASSETS_DIR='./src/assets/'
FMT_OUT="<fmt>"
FMT_OUT_DEFAULT="html"
FMT_TMPL="${FMT_OUT}"
CHUNKED_HTML=0
SUBPATH=""
CONFIG_MAIN_DIR="./config"
CONFIG_MAIN="$CONFIG_MAIN_DIR/config.yaml"
CONFIG_FORMAT="$CONFIG_MAIN_DIR/${FMT_OUT}/config.yaml"
TEMPLATE="$CONFIG_MAIN_DIR/${FMT_OUT}/templates/default.${FMT_TMPL}"
TEMPLATE_IN=""
TEMPLATE_CHUNKEDHTML="default.chunked.html"
CONFIG_FORMAT_IN=""
LAUNCH_EXAMPLES="https://github.com/svbaelen/cowkit#examples"

# chunked
#csplit -z somefile /ABC/ '{*}'

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
    -s|--single-run         run pandoc once, no file watcher or server
    -f|--format FMT         output format
                            options: {$FMT_OUT_DEFAULT (default), pdf, tex, all}
    -o|--output-dir DIR     output directory (default '$OUTPUT_DIR'). Note that this
                            needs to match the output in '${CONFIG_FORMAT}'
    -t|--template FILE      template file (default: '${TEMPLATE}')
                            note: for the pdf format, use a .tex template
    -c|--config FILE        config (default: '${CONFIG_FORMAT}')
    -ns|--no-serve          no HTTP server
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
        -c|--config) CONFIG_FORMAT_IN=$2
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
# Functions
#=========================================================

config(){
    fmt_out=$1
    # update configs
    CONFIG_FORMAT="./config/${fmt_out}/config.yaml"

    # make latex stuff available
    #TEXDIR=$( kpsewhich -var-value=TEXMFLOCAL )
    export TEXINPUTS="./config/pdf/templates:"

    if [ "${fmt_out}" = "pdf" ];then
        FMT_TMPL="tex"
        #TEMPLATE="eisvogel"
        # https://github.com/pandoc/dockerfiles/blob/master/ubuntu/Dockerfile#L191
        #TEMPLATE="./config/${fmt_out}/templates/default.${FMT_TMPL}"
        #cp "$TEMPLATE" /.pandoc/templates/default.latex
    elif [ "${fmt_out}" = "html" ];then
        # 0 = found, 1 not found
        chunkedhtml=$( cat $config_format | grep "^to: chunkedhtml" | echo $? )
        if [ $chunkedhtml = 0 ]; then
            CHUNKED_HTML=1
            FMT_TMPL='chunked.html'
            SUBPATH="/$SUBDIR_CHUNKED_HTML"
        fi
    else
        FMT_TMPL=$fmt_out
    fi

    if [ -z "${TEMPLATE_IN}" ];then
        TEMPLATE="./config/${fmt_out}/templates/default.${FMT_TMPL}"
    else
        TEMPLATE="${TEMPLATE_IN}"
    fi

    if [ -z "${CONFIG_FORMAT_IN}" ];then
        CONFIG_FORMAT="./config/${fmt_out}/config.yaml"
    else
        CONFIG_FORMAT="${CONFIG_FORMAT_IN}"
    fi

    echo "[INFO - main] > initializing: {format='$fmt_out', output directory '$OUTPUT_DIR'}"
    echo "[INFO - main] use ${fmt_out} config '$CONFIG_FORMAT'"
    echo "[INFO - main] use ${fmt_out} template '$TEMPLATE'"
}

process_html_files() {
    file=$1
    echo $file
}

run_pandoc () {
    config_format=$1
    template=$2

    if [ $CHUNKED_HTML = 1 ]; then
        html_chunkdir="$OUTPUT_DIR/$SUBDIR_CHUNKED_HTML"
        # make sure it's empty
        rm -rf $html_chunkdir
    fi

    pandoc \
        --defaults=${CONFIG_MAIN} \
        --defaults=${config_format} \
        --template=${template}

    # check if unzipping chunked HTML is necessary
    # unzipping is not necessary as it can be done through pandoc too, however,
    # the copying still is
    if [ $CHUNKED_HTML = 1 ]; then

        # unzip if chunked html
        html_chunkdir="$OUTPUT_DIR/$SUBDIR_CHUNKED_HTML"
        htmlcnfdir="$html_chunkdir/$CONFIG_MAIN_DIR/html"
        html_assetsdir="$html_chunkdir/assets"
        mkdir -p $htmlcnfdir
        mkdir -p $html_assetsdir

        cp -rf $CONFIG_MAIN_DIR/html/*  $htmlcnfdir
        cp -rf $SCRIPTS_DIR $html_chunkdir

        # create search index
        # html_parsers <file-in> <file-out> <jstemplate>
        node /usr/local/bin/html_parser.js \
            "$html_chunkdir/index.html" \
            "$ASSETS_DIR/search.json"

        cp -rf "$ASSETS_DIR/search.json" $html_assetsdir/

        #find $html_chunkdir -name "*.html" | while read file; do
            #process_html_files "$file";
        #done
    fi
}



#=========================================================
# Main
#=========================================================

# global NPM modules
NPM_GLOBAL_NM=$( npm root -g)
case ":$NODE_PATH:" in
  *":$NPM_GLOBAL_NM:"*) ;;
  *) export NODE_PATH="$NODE_PATH:$NPM_GLOBAL_NM" ;;
esac

# create list of formats (generally just one)
if [ "$FMT_OUT" = "all" ];then
    L_FMT_OUT="tex pdf html"
else
    L_FMT_OUT="${FMT_OUT}"
fi

# check for HTTP server
if [ "${FMT_OUT}" = "pdf" ] || [ "${FMT_OUT}" = "tex" ];then
    HTTP_SERVE=0
fi


if [ $INIT = 1 ];then
    printf "[INFO - main] Initializing new cowkit project...\n"

    if [ -d /app/config ];then
        printf "[ERROR - main] './config' directory already exists here\n"
        printf "[ERROR - main] exiting (better safe than sorry)\n"
        exit 1
    fi
    if [ -d /app/src ];then
        printf "[ERROR - main] './src' directory already exists here\n"
        echo "[ERROR - main] exiting (better safe than sorry)\n"
        exit 1
    fi
    cp -r /data/example/config /app
    cp -r /data/example/src /app

    if [ $RUN_ONCE = 1 ];then
        echo "[INFO - main] running pandoc once"
        mkdir -p /app/${OUTPUT_DIR}
        for fmt in $L_FMT_OUT
        do
            config $fmt
            cd /app
            run_pandoc $CONFIG_FORMAT $TEMPLATE
            echo "[INFO - main] finished - output in ${OUTPUT_DIR}"
        done
        exit 0
    else
        echo "[INFO - main] Success. Next up: launch!"
        echo "[INFO - main] ----------------------------------------------"
        echo "[INFO - main] EXAMPLES:"
        echo "[INFO - main] - default launch (build and serve HTML):"
        echo '[INFO - main]   $ docker run -u $(id -u):$(id -g) --rm -v "$(pwd):/app" \'
        echo '                  -p 8000:8000 svbaelen/cowkit'
        echo "[INFO - main] - more examples: $LAUNCH_EXAMPLES"
        echo "[INFO - main] ----------------------------------------------"
        echo "[INFO - main] OK, let's go!"
    fi
else
    # make build dir
    mkdir -p /app/${OUTPUT_DIR}

    if [ $RUN_ONCE = 1 ];then
        echo "[INFO - main] running pandoc once..."
        cd /app
        for fmt in $L_FMT_OUT
        do
            config $fmt
            run_pandoc $CONFIG_FORMAT $TEMPLATE
            echo "[INFO - main] finished - output in ${OUTPUT_DIR}"
        done

        servedir="$OUTPUT_DIR$SUBPATH" # subpath by default = ""
        cd /app/$servedir
        # move everything from build dir to chunked html dir
        if [ $CHUNKED_HTML = 1 ];then
            mv -f ../*.tex .
            mv -f ../*.pdf .
        fi

        exit 0
    else
        # assumes -v "$(pwd):/app" in docker run
        # run once
        cd /app
        for fmt in $L_FMT_OUT
        do
            config $fmt
            echo "[INFO - main] running initial build... (takes several seconds)"
            run_pandoc $CONFIG_FORMAT $TEMPLATE
            echo "[INFO - main] finished - output in ${OUTPUT_DIR}"
        done

        servedir="$OUTPUT_DIR$SUBPATH" # subpath by default = ""
        cd /app/$servedir
        # move everything from build dir to chunked html dir
        if [ $CHUNKED_HTML = 1 ];then
            mv -f ../*.tex .
            mv -f ../*.pdf .
        fi


        if [ $HTTP_SERVE = 1 ];then

            cd /app/$servedir

            printf "[INFO - main] "
            printf "=> ----------------------------------------------\n"
            echo "[INFO - main] => serving at http://localhost:$HTTP_PORT (in $servedir)"
            printf "[INFO - main] "
            printf "=> ----------------------------------------------\n"

            if [ "$FMT_OUT" = "all" ];then
                echo "[WARN - main] cannot run file watcher on 'all' formats"
                echo "[INFO - main] choose html, tex, or pdf for auto watch & rebuild"
                echo "[INFO - main] single run OK (press ctrl-c to exit HTTP server)"
                python3 -m http.server $HTTP_PORT > /dev/null 2>&1
            else
                # watcher comes next
                python3 -m http.server $HTTP_PORT > /dev/null 2>&1 &
            fi
        fi
        # watch
        if [ "$FMT_OUT" != "all" ];then
            cd /app
            echo "[INFO - main] launching file watcher..."
            # run ./utils/watcher_docker.sh in docker container
            watcher.sh "$CONFIG_MAIN" "$CONFIG_FORMAT" "$TEMPLATE" "$OUTPUT_DIR"
        fi
    fi
fi
