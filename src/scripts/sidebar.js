/* Additional sidebar functionality */

function downloadPdf() {
 const btnDownload = document.querySelector("#btn-download-pdf");
  btnDownload.addEventListener("click", (ev) => {
    window.open(
      `/${btnDownload.dataset.filename}`,
      '_blank'
    );
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
    tocEl.innerHTML += `<a class="btn-toc-toggle" href=""></a>`;
    const btn = tocEl.querySelector(`.btn-toc-toggle`);
    btn.style.display = "block";

    if (tocEl.parentElement.querySelector(`ul`)){
      // init
      btn.innerHTML = svgBtnDown;
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        const nestedEl = tocEl.parentElement.querySelector(`ul`);
        if (nestedEl.style.display === "none" || !nestedEl.style.display) {
          nestedEl.style.display = "block";
          btn.innerHTML = svgBtnUp;
        } else {
          nestedEl.style.display = "none";
          btn.innerHTML = svgBtnDown;
        }
      });
    }
  });
}

function sidebarScrollUp() {
  // up
  const btnScrollTop = document.querySelector("#lbar-buttons #btn-scroll-top");
  btnScrollTop.style.display = "flex";
  btnScrollTop.addEventListener("click", (ev) => {
    window.scrollTo(0, 0);
    document.location.href="/";
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

/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
  sidebarDropdown();
  sidebarScrollUp();
  spacingAroundNumberedToc();
  downloadPdf();
})
