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
        ev.preventDefault();
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
