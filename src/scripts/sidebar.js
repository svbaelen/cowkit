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
  if (btnDownloadPdf) {
    btnDownloadPdf.style.display = "flex";
    btnDownloadPdf.addEventListener("click", (ev) => {
      window.open(
        `${baseUrl}/${btnDownloadPdf.dataset.filename}`,
        '_blank'
      );
    });
  }

  const btnDownloadTex = document.querySelector("#btn-download-tex");
  if (btnDownloadTex) {
    btnDownloadTex.style.display = "flex";
    btnDownloadTex.addEventListener("click", (ev) => {
      window.open(
        `${baseUrl}/${btnDownloadTex.dataset.filename}`,
      );
    });
  }

  // Find existing home button and add click handler
  const btnHome = document.querySelector("#btn-home");
  if (btnHome) {
    btnHome.style.display = "flex";
    btnHome.addEventListener("click", (ev) => {
      window.location.href = baseUrl;
    });
  }

  // Add click handler to existing help button
  const btnHelp = document.querySelector("#btn-help");
  console.log("Help button found:", btnHelp);
  if (btnHelp) {
    btnHelp.style.display = "flex";
    console.log("Help button display set to flex");

    // Toggle help tooltip on click
    btnHelp.addEventListener("click", (ev) => {
      ev.preventDefault();
      btnHelp.classList.toggle("show-help");
    });

    // Close help when clicking outside
    document.addEventListener("click", (ev) => {
      if (!btnHelp.contains(ev.target)) {
        btnHelp.classList.remove("show-help");
      }
    });
  }

  // Add click handler to reset defaults button
  const btnResetDefaults = document.querySelector("#btn-reset-defaults");
  console.log("Reset defaults button found:", btnResetDefaults);
  if (btnResetDefaults) {
    btnResetDefaults.style.display = "flex";
    console.log("Reset defaults button display set to flex");

    btnResetDefaults.addEventListener("click", (ev) => {
      ev.preventDefault();
      
      // Confirm with user before resetting
      if (confirm("Reset all settings to defaults? This will:\n• Reset content width to 800px\n• Show left sidebar (sticky)\n• Show right sidebar\n• Clear all cached preferences\n\nThis action cannot be undone.")) {
        resetToDefaults();
      }
    });
  }

}

function resetToDefaults() {
  console.log("Resetting all settings to defaults...");
  
  // Clear all cowkit-related localStorage items
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('cowkit-')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    console.log("Removing localStorage key:", key);
    localStorage.removeItem(key);
  });
  
  // Reset content width slider to default (800px)
  const widthSlider = document.querySelector('#width-slider');
  const widthValue = document.querySelector('#width-value');
  if (widthSlider && widthValue) {
    widthSlider.value = '800';
    widthValue.textContent = '800';
    document.documentElement.style.setProperty('--main-max-width', '800px');
    document.documentElement.style.setProperty('--lbar-max-width', '350px');
    
    // Update visual indicators
    const defaultIndicator = document.querySelector('.width-default-indicator');
    widthSlider.classList.add('at-default');
    if (defaultIndicator) defaultIndicator.style.display = 'inline';
  }
  
  // Reset left sidebar to sticky (default)
  const stickyToggle = document.querySelector('#input-toggle-sidebar');
  if (stickyToggle) {
    stickyToggle.checked = true;
  }
  
  // Show right sidebar
  const sidebarRight = document.querySelector('#sidebar-right');
  if (sidebarRight) {
    sidebarRight.classList.remove('hidden');
    sidebarRight.style.display = 'block';
  }
  
  // Hide left sidebar on mobile if it's showing
  const sidebarLeft = document.querySelector('#sidebar-left');
  if (sidebarLeft && window.innerWidth <= 1023) {
    sidebarLeft.classList.remove('show');
    const btnBurger = document.querySelector('#btn-burger');
    const btnClose = document.querySelector('#btn-close');
    const btnMobile = document.querySelector('#btn-mobile');
    
    if (btnBurger && btnClose && btnMobile) {
      btnBurger.style.display = "block";
      btnClose.style.display = "none";
      btnMobile.classList.remove("in-menu");
    }
  }
  
  console.log("All settings reset to defaults");
  
  // Show a brief confirmation
  const resetBtn = document.querySelector("#btn-reset-defaults");
  if (resetBtn) {
    const originalText = resetBtn.querySelector('.btn-text').textContent;
    resetBtn.querySelector('.btn-text').textContent = 'Reset!';
    setTimeout(() => {
      resetBtn.querySelector('.btn-text').textContent = originalText;
    }, 1500);
  }
}

function setupWidthControl() {
  // Skip width control setup on mobile devices
  if (window.innerWidth < 1024) {
    console.log("Width control skipped on mobile");
    return;
  }
  
  const widthControl = document.querySelector('#width-control');
  const widthSlider = document.querySelector('#width-slider');
  const widthValue = document.querySelector('#width-value');
  const mainContent = document.querySelector('#main-content');

  console.log("Width control elements:", {widthControl, widthSlider, widthValue, mainContent});
  if (!widthControl || !widthSlider || !widthValue || !mainContent) return;

  // Only show width control on desktop (let CSS media query handle it)
  // Remove the forced display:block so CSS media queries work properly
  console.log("Width control initialized, display controlled by CSS media queries");

  // Load saved width from localStorage
  const savedWidth = localStorage.getItem('cowkit-content-width');
  if (savedWidth) {
    widthSlider.value = savedWidth;
    widthValue.textContent = savedWidth;
    updateContentWidth(savedWidth);
  } else {
    // Initialize with default value
    updateContentWidth(800);
  }

  // Update width when slider changes
  widthSlider.addEventListener('input', function() {
    const newWidth = this.value;
    widthValue.textContent = newWidth;
    updateContentWidth(newWidth);
    localStorage.setItem('cowkit-content-width', newWidth);
    
    // Add visual feedback when at default value
    const defaultIndicator = document.querySelector('.width-default-indicator');
    if (newWidth === '800') {
      widthSlider.classList.add('at-default');
      if (defaultIndicator) defaultIndicator.style.display = 'inline';
    } else {
      widthSlider.classList.remove('at-default');
      if (defaultIndicator) defaultIndicator.style.display = 'none';
    }
  });
  
  // Check if initially at default
  const defaultIndicator = document.querySelector('.width-default-indicator');
  if (widthSlider.value === '800') {
    widthSlider.classList.add('at-default');
    if (defaultIndicator) defaultIndicator.style.display = 'inline';
  }

  function updateContentWidth(width) {
    // Update CSS custom property for main content max-width
    document.documentElement.style.setProperty('--main-max-width', width + 'px');
    
    // Adjust sidebar width when content width changes
    const maxContentWidth = 1200;
    const defaultSidebarWidth = 350;
    const minSidebarWidth = 150; // Using the CSS variable value
    
    // Start shrinking sidebar earlier (at 900px) for smoother transition
    if (width > 900) {
      // Use an easing function for smoother transition
      const t = (width - 900) / (maxContentWidth - 900); // 0 to 1
      // Ease-in-out cubic function for smooth acceleration/deceleration
      const easedT = t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const sidebarWidth = defaultSidebarWidth - (easedT * (defaultSidebarWidth - minSidebarWidth));
      document.documentElement.style.setProperty('--lbar-max-width', Math.round(sidebarWidth) + 'px');
    } else {
      // Reset to default sidebar width
      document.documentElement.style.setProperty('--lbar-max-width', defaultSidebarWidth + 'px');
    }
  }
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

function persistStickyToggle() {
  const stickyToggle = document.querySelector('#input-toggle-sidebar');
  if (!stickyToggle) return;

  // Load saved state from localStorage
  const savedState = localStorage.getItem('cowkit-sidebar-sticky');
  if (savedState !== null) {
    stickyToggle.checked = savedState === 'true';
  }

  // Save state when changed
  stickyToggle.addEventListener('change', function() {
    localStorage.setItem('cowkit-sidebar-sticky', this.checked);
  });
}

function setupRightSidebarToggle() {
  // Skip on smaller screens where RHS sidebar is hidden
  if (window.innerWidth <= 1200) {
    return;
  }

  const btnToggleRbar = document.querySelector('#btn-toggle-rbar');
  const sidebarRight = document.querySelector('#sidebar-right');
  
  if (!btnToggleRbar || !sidebarRight) return;

  // Load saved state from localStorage
  const savedState = localStorage.getItem('cowkit-rbar-hidden');
  const isHidden = savedState === 'true';
  
  if (isHidden) {
    sidebarRight.classList.add('hidden');
    sidebarRight.style.display = 'none';
  } else {
    // Ensure sidebar is visible by default (in case CSS or other factors hide it)
    sidebarRight.classList.remove('hidden');
    sidebarRight.style.display = 'block';
  }

  // Toggle functionality
  btnToggleRbar.addEventListener('click', function() {
    const isCurrentlyHidden = sidebarRight.classList.contains('hidden');
    
    if (isCurrentlyHidden) {
      // Show sidebar
      sidebarRight.classList.remove('hidden');
      sidebarRight.style.display = 'block';
      localStorage.setItem('cowkit-rbar-hidden', 'false');
    } else {
      // Hide sidebar
      sidebarRight.classList.add('hidden');
      sidebarRight.style.display = 'none';
      localStorage.setItem('cowkit-rbar-hidden', 'true');
    }
  });
}

function showSidebarOnSearch() {
  const sidebarLeft = document.querySelector('#sidebar-left');

  if (!sidebarLeft) {
    console.log('Sidebar not found');
    return;
  }

  // Listen for keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    console.log('Key pressed:', e.key);

    // Only trigger if not already in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      console.log('Ignoring key in input field');
      return;
    }

    // '/' key - show sidebar and focus search
    if (e.key === '/') {
      console.log('Slash key detected, showing sidebar');
      e.preventDefault();

      // Show sidebar on mobile
      if (window.innerWidth <= 1023) {
        console.log('Mobile detected, adding show class');
        sidebarLeft.classList.add('show');

        // Also update mobile menu buttons
        const btnBurger = document.querySelector('#btn-burger');
        const btnClose = document.querySelector('#btn-close');
        const btnMobile = document.querySelector('#btn-mobile');

        if (btnBurger && btnClose && btnMobile) {
          btnBurger.style.display = "none";
          btnClose.style.display = "block";
          btnMobile.classList.add("in-menu");
        }
      } else {
        console.log('Desktop detected, making sidebar sticky');
        // On desktop, make sidebar sticky so it stays visible for search
        const stickyToggle = document.querySelector('#input-toggle-sidebar');
        if (stickyToggle && !stickyToggle.checked) {
          stickyToggle.checked = true;
          localStorage.setItem('cowkit-sidebar-sticky', 'true');
          stickyToggle.dispatchEvent(new Event('change'));
          console.log('Made sidebar sticky for search');
        }
      }

      // Focus search input if it exists
      const searchInput = document.querySelector('#toc-content input[type="text"]') ||
                         document.querySelector('input[placeholder*="Search"]') ||
                         document.querySelector('.Search input');

      if (searchInput) {
        console.log('Search input found, focusing');
        setTimeout(() => {
          searchInput.focus();
        }, 150); // Small delay to ensure sidebar is visible
      } else {
        console.log('Search input not found');
      }
    }

    // 's' key - toggle sidebar (and make non-sticky if sticky)
    if (e.key === 's' || e.key === 'S') {
      console.log('S key detected, toggling sidebar');
      e.preventDefault();

      const stickyToggle = document.querySelector('#input-toggle-sidebar');

      if (window.innerWidth <= 1023) {
        // Mobile: toggle sidebar visibility
        console.log('Mobile: toggling sidebar visibility');
        if (sidebarLeft.classList.contains('show')) {
          // Hide sidebar
          sidebarLeft.classList.remove('show');
          const btnBurger = document.querySelector('#btn-burger');
          const btnClose = document.querySelector('#btn-close');
          const btnMobile = document.querySelector('#btn-mobile');

          if (btnBurger && btnClose && btnMobile) {
            btnBurger.style.display = "block";
            btnClose.style.display = "none";
            btnMobile.classList.remove("in-menu");
          }
        } else {
          // Show sidebar
          sidebarLeft.classList.add('show');
          const btnBurger = document.querySelector('#btn-burger');
          const btnClose = document.querySelector('#btn-close');
          const btnMobile = document.querySelector('#btn-mobile');

          if (btnBurger && btnClose && btnMobile) {
            btnBurger.style.display = "none";
            btnClose.style.display = "block";
            btnMobile.classList.add("in-menu");
          }
        }
      } else {
        // Desktop: toggle sticky mode (turn off if on, turn on if off)
        console.log('Desktop: toggling sticky mode');
        if (stickyToggle) {
          const wasSticky = stickyToggle.checked;
          stickyToggle.checked = !wasSticky;

          // Save state
          localStorage.setItem('cowkit-sidebar-sticky', stickyToggle.checked);

          // Trigger change event to ensure CSS updates
          stickyToggle.dispatchEvent(new Event('change'));

          console.log('Sticky toggled to:', stickyToggle.checked);
        }
      }
    }

    // '?' key - toggle help
    if (e.key === '?') {
      console.log('? key detected, toggling help');
      e.preventDefault();

      const btnHelp = document.querySelector('#btn-help');
      if (btnHelp) {
        btnHelp.classList.toggle('show-help');
      }
    }

    // 'Escape' key - close help if open
    if (e.key === 'Escape') {
      const btnHelp = document.querySelector('#btn-help');
      if (btnHelp && btnHelp.classList.contains('show-help')) {
        console.log('Escape key detected, closing help');
        e.preventDefault();
        btnHelp.classList.remove('show-help');
      }
    }
  });
}


function hideMenu()  {
  const btnMobile = document.querySelector(`#btn-mobile`);
  const btnBurger = document.querySelector(`#btn-burger`);
  const btnClose = document.querySelector(`#btn-close`);
  const sidebarLeft = document.querySelector(`#sidebar-left`);

  if (btnBurger.style.display === "none" || !btnBurger.style.display) {
    btnBurger.style.display = "block";
    btnClose.style.display = "none";
    sidebarLeft.classList.remove("show");
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
      sidebarLeft.classList.add("show");
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
  console.log("DOM loaded, running sidebar functions");
  console.log("All elements in lbar-buttons:", document.querySelectorAll("#lbar-buttons > *"));
  console.log("All elements in toc-content:", document.querySelectorAll("#toc-content > *"));

  sidebarMobileMenu();
  sidebarDropdown();
  //sidebarScrollBtns();
  sidebarBtns();
  spacingAroundNumberedToc();
  persistStickyToggle();
  showSidebarOnSearch();
  setupWidthControl();
  setupRightSidebarToggle();

  // Try again after a delay in case elements are created by other scripts
  setTimeout(() => {
    console.log("Trying again after delay...");
    console.log("Help button (delayed):", document.querySelector("#btn-help"));
    console.log("Width control (delayed):", document.querySelector("#width-control"));
  }, 1000);

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
