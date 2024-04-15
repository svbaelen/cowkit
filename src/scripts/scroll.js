// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

/* Additional scroll functionality */

/* config */
let SCROLL_SHOW = false;
let LAST_SCROLL_TOP = 0;
let IN_TIMEOUT = false;
const TIME_SHOW_SCROLL_MS = 3000;

function mainScrollBtns() {
  // container
  const scrollBtnContainer = document.querySelector("#scroll-buttons");
  scrollBtnContainer.style.display = "flex";
  /* trigger on scroll */
  let newTimeout = null;

  // up
  const btnScrollTop = document.querySelector("#btn-scroll-top");
  //btnScrollTop.style.display = "flex";
  btnScrollTop.addEventListener("click", (ev) => {
    ev.preventDefault();
    window.scrollTo(0, 0);
    if (newTimeout) clearTimeout(newTimeout);
    history.pushState(
      "", document.title, window.location.pathname + window.location.search
    );
    // wait until scroll to top (very brute, should listen to event!!)
    setTimeout(() => {
      btnScrollTop.style.display = 'none';
    }, 200);

  });
  // down
  /*const btnScrollBottom = document.querySelector("#lbar-buttons #btn-scroll-bottom");*/
  /*btnScrollBottom.style.display = "flex";*/
  /*btnScrollBottom.addEventListener("click", (ev) => {*/
  /*window.scrollTo(0, document.body.scrollHeight);*/
  /*});*/

  window.addEventListener('scroll', e => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > LAST_SCROLL_TOP) {
      // downscroll code
      if (newTimeout) clearTimeout(newTimeout);
      btnScrollTop.style.display = 'none';
    } else if (scrollTop < LAST_SCROLL_TOP) {
      // upscroll code
      btnScrollTop.style.display = 'flex';
      SCROLL_SHOW = true;
      IN_TIMEOUT = true;
      if (newTimeout) clearTimeout(newTimeout);
      newTimeout = setTimeout(() => {
        btnScrollTop.style.display = 'none';
        IN_TIMEOUT = false;
      }, TIME_SHOW_SCROLL_MS);
    } // else was horizontal scroll
    LAST_SCROLL_TOP = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  // for desktop
  const sidebarRight = document.querySelector("#sidebar-right");
  sidebarRight.addEventListener('mouseover', e => {
    if (newTimeout) clearTimeout(newTimeout);
    btnScrollTop.style.display = 'flex';
    SCROLL_SHOW = true;
  });
  sidebarRight.addEventListener('mouseleave', e => {
    btnScrollTop.style.display = 'none';
    SCROLL_SHOW = false;
  });
}


/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
  mainScrollBtns();
})
