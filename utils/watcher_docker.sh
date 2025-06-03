#!/bin/sh

# SPDX-FileCopyrightText: 2024 Senne Van Baelen
#
# SPDX-License-Identifier: Apache-2.0

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
CHUNKED_HTML=$5
SUBDIR_CHUNKED_HTML=$6
ASSETS_DIR=$7
CONFIG_MAIN_DIR=$8
SCRIPTS_DIR=$9
SERVER_DIR=${10}

#=========================================================
# Functions
#=========================================================

run_pandoc () {

    pandoc \
      --defaults=${CONFIG_MAIN} \
      --defaults=${CONFIG_FORMAT} \
      --template=${TEMPLATE} \
      --output="${SERVER_DIR}_tmp"

    # html_modify <file-in> <file-out> <jstemplate>
    node /usr/local/bin/html_modify.js \
            "${SERVER_DIR}_tmp/index.html"
}

#run_pandoc () {
    #config_format=$1
    #template=$2

    #if [ $CHUNKED_HTML = 1 ]; then
        #html_chunkdir="$OUTPUT_DIR/$SUBDIR_CHUNKED_HTML"
        #echo $html_chunkdir
        ## make sure it's empty
        #rm -rf $html_chunkdir
    #fi

    #pandoc \
        #--defaults=${CONFIG_MAIN} \
        #--defaults=${config_format} \
        #--template=${template}

    ## check if unzipping chunked HTML is necessary
    ## unzipping is not necessary as it can be done through pandoc too, however,
    ## the copying still is
    #if [ $CHUNKED_HTML = 1 ]; then

        ## unzip if chunked html
        #html_chunkdir="$OUTPUT_DIR/$SUBDIR_CHUNKED_HTML"
        #htmlcnfdir="$html_chunkdir/$CONFIG_MAIN_DIR/html"
        #html_assetsdir="$html_chunkdir/assets"
        #mkdir -p $htmlcnfdir
        #mkdir -p $html_assetsdir

        #cp -rf $CONFIG_MAIN_DIR/html/*  $htmlcnfdir
        #cp -rf $SCRIPTS_DIR $html_chunkdir

        ## create search index
        ## html_search_index <file-in> <file-out> <jstemplate>
        #node /usr/local/bin/html_search_index.js \
            #"$html_chunkdir/index.html" \
            #"$ASSETS_DIR/search.json"

        ## html_modify <file-in> <file-out> <jstemplate>
        #node /usr/local/bin/html_modify.js \
            #"$html_chunkdir/index.html"

        #cp -rf "$ASSETS_DIR/search.json" $html_assetsdir/
    #fi
#}


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
        #run_pandoc
        run_pandoc $CONFIG_FORMAT $TEMPLATE

        echo "[INFO - watcher] done - build output updated"

        # next two lines are to avoid pandoc error "createDirectory" failed (alreayd exist)
        rsync --remove-source-files  --include "*.html" -a ${SERVER_DIR}_tmp/* $SERVER_DIR/
        rm -rf ${SERVER_DIR}_tmp

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
            # next two lines are to avoid pandoc error "createDirectory" failed (alreayd exist)
            #run_pandoc
            run_pandoc $CONFIG_FORMAT $TEMPLATE
            rsync --remove-source-files  --include "*.html" -a ${SERVER_DIR}_tmp/* $SERVER_DIR/
            rm -rf ${SERVER_DIR}_tmp
        else
            echo "[INFO - watcher] skipping rerun (timediff set to $TIME_UNTIL_RERUN sec)"
        fi
    fi
done
