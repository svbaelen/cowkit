// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

/* Additional sidebar functionality */

function sidebarBtns() {
  const location = window.location;


  const fullUrl = location.protocol + '//' + location.host + location.pathname;
  const locationSplit = location.pathname.split("/");
  const locationPathMain = locationSplit.slice(0, locationSplit.length - 1).join('/');

  const baseUrl = location.protocol + '//' + location.host + locationPathMain;

  const btnDownloadPdf = document.querySelector("#btn-download-pdf");
  btnDownloadPdf.style.display = "flex";
  btnDownloadPdf.addEventListener("click", (ev) => {
    window.open(
      `${baseUrl}/${btnDownloadPdf.dataset.filename}`,
      '_blank'
    );
  });

  const btnDownloadTex = document.querySelector("#btn-download-tex");
  btnDownloadTex.style.display = "flex";
  btnDownloadTex.addEventListener("click", (ev) => {
    window.open(
      `${baseUrl}/${btnDownloadTex.dataset.filename}`,
    );
  });

  const btnHome = document.querySelector("#btn-home");
  btnHome.style.display = "flex";
  btnHome.addEventListener("click", (ev) => {
    window.location.href = baseUrl;
  });

}

function sidebarDropdown() {
  const btnDownSvg = ``;
  const mainTocElements = document.querySelectorAll(`#toc-content > ul > li > a`);
  const svgBtnDown = `<svg class="btn-svg-down" width="20" height="10">
      <polyline points="16,0 8,8, 0,0"/>
  </svg>`;
  const svgBtnUp = `<svg class="btn-svg-up" width="20" height="20">
      <polyline points="16,8 8,0 0,8"/>
  </svg>`;

  mainTocElements.forEach((tocEl) => {
    // tocEl == first <a> element in <li>
    const container = document.createElement("span");
    const dropdownBtn = document.createElement("a");
    const tocElParent = tocEl.parentElement; // the li element
    const tocElSublist = tocEl.parentElement.querySelector(`ul`);

    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    dropdownBtn.classList.add("btn-toc-toggle");

    tocElParent.insertBefore(container, tocEl);
    container.appendChild(tocEl);
    container.appendChild(dropdownBtn);

    //tocElParent.innerHTML += `<a class="btn-toc-toggle" href=""></a>`;
    //const btn = tocElParent.querySelector(`.btn-toc-toggle`);
    dropdownBtn.style.display = "block";

    if (tocElSublist){
      // init
      dropdownBtn.innerHTML = svgBtnDown;
      dropdownBtn.addEventListener("click", (ev) => {
        if (tocElSublist.style.display === "none" || !tocElSublist.style.display) {
          tocElSublist.style.display = "block";
          dropdownBtn.innerHTML = svgBtnUp;
        } else {
          tocElSublist.style.display = "none";
          dropdownBtn.innerHTML = svgBtnDown;
        }
      });
    }
  });
}

function sidebarScrollBtns() {
  // container
  const scrollBtnContainer = document.querySelector("#scroll-buttons");
  scrollBtnContainer.style.display = "flex";

  // up
  const btnScrollTop = document.querySelector("#lbar-buttons #btn-scroll-top");
  btnScrollTop.style.display = "flex";
  btnScrollTop.addEventListener("click", (ev) => {
    hideMenu();
    window.scrollTo(0, 0);
    history.pushState(
      "", document.title, window.location.pathname + window.location.search
    );
    //document.location.href="/";
    //console.log(window.location.href);
  });
  // down
  /*const btnScrollBottom = document.querySelector("#lbar-buttons #btn-scroll-bottom");*/
  /*btnScrollBottom.style.display = "flex";*/
  /*btnScrollBottom.addEventListener("click", (ev) => {*/
  /*window.scrollTo(0, document.body.scrollHeight);*/
  /*});*/
}

function spacingAroundNumberedToc(){
  const tocElWithNr = document.querySelectorAll(
    `#toc-content ul > li:has(.toc-section-number)`
  );

  const firstTocWithNr = tocElWithNr[0];
  const lastTocWithNr = tocElWithNr[tocElWithNr.length - 1];

  firstTocWithNr.style.marginTop = "8px";
  lastTocWithNr.style.marginBottom = "12px";
}


function hideMenu()  {
  const btnMobile = document.querySelector(`#btn-mobile`);
  const btnBurger = document.querySelector(`#btn-burger`);
  const btnClose = document.querySelector(`#btn-close`);
  const sidebarLeft = document.querySelector(`#sidebar-left`);

  if (btnBurger.style.display === "none" || !btnBurger.style.display) {
    btnBurger.style.display = "block";
    btnClose.style.display = "none";
    sidebarLeft.style.display = "none";
    btnMobile.classList.remove("in-menu");
  }
}

function sidebarMobileMenu() {
  const btnMobile = document.querySelector(`#btn-mobile`);
  const btnBurger = document.querySelector(`#btn-burger`);
  const btnClose = document.querySelector(`#btn-close`);
  const sidebarLeft = document.querySelector(`#sidebar-left`);
  const textBody = document.querySelector(`#text-body`);

  const tocLinks = document.querySelectorAll(`#toc-content > ul a`);

  btnBurger.style.display = "block";
  btnClose.style.display = "none";

  // init
  btnBurger.addEventListener("click", (ev) => {
    if (btnClose.style.display === "none" || !btnClose.style.display) {
      btnClose.style.display = "block";
      btnBurger.style.display = "none";
      sidebarLeft.style.display = "block";
      btnMobile.classList.add("in-menu");
    }
  });
  btnClose.addEventListener("click", (ev) => {
    hideMenu()
  });

  tocLinks.forEach((link) => {
    link.addEventListener("click", (ev) => {
      hideMenu()
    })
  });

  textBody.addEventListener("click", (ev) => {
    hideMenu()
  });
}



/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
  sidebarMobileMenu();
  sidebarDropdown();
  //sidebarScrollBtns();
  sidebarBtns();
  spacingAroundNumberedToc();

    const urlPathArray = window.location.pathname.split('/');
    const urlLast = urlPathArray[urlPathArray.length - 1];

    const allTocLis = document.querySelectorAll(`#toc-content > ul > li`);
    allTocLis.forEach((tocElLi) => {
        const currentTocLink = tocElLi.querySelector(`[href*="${urlLast}"]`)
        if (currentTocLink){
            tocElLi.classList.add("toc-a-current");
            tocElLi.firstChild.classList.add("toc-li-current");
        } else {
            tocElLi.firstChild.classList.remove("toc-li-current");
            tocElLi.classList.remove("toc-a-current");
        }
    })

})
