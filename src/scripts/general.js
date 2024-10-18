// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

/* General adjustments to content and site navigation */
/* Not meant to (un)set by users: can be directly integrated in template */

/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
    const body = document.body;
    const html = document.documentElement;

    // height of the "body"
    /*const height = Math.max( body.scrollHeight, body.offsetHeight,*/
        /*html.clientHeight, html.scrollHeight, html.offsetHeight );*/

    const height = Math.max( body.scrollHeight );
    const width = Math.max( body.scrollWidth );

    const bottomBar = document.querySelector("#sitenav-bottom");
    //console.log(bottomBar, width, height);

    if (bottomBar && height < 1100 && width > 600 ) {
        bottomBar.style.display = 'none';
    }
    else if (bottomBar && height < 950 && width > 300 ) {
        bottomBar.style.display = 'none';
    }
})
