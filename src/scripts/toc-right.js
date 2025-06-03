// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

/* Right sidebar TOC with scroll-based highlighting */

function createRightSidebarTOC() {
  const rightSidebar = document.getElementById('sidebar-right');
  if (!rightSidebar) return;

  // Get all headers from the main content
  const mainContent = document.getElementById('text-body');
  if (!mainContent) return;

  // Get h2 and h3 headers (sections and subsections)
  const headers = mainContent.querySelectorAll('h2, h3');
  if (headers.length === 0) return;

  // Create TOC container
  const tocContainer = document.createElement('div');
  tocContainer.id = 'toc-right';
  tocContainer.className = 'toc-right-container';

  const tocTitle = document.createElement('h4');
  tocTitle.className = 'toc-right-title';
  tocTitle.textContent = 'On this page';
  tocContainer.appendChild(tocTitle);

  const tocList = document.createElement('ul');
  tocList.className = 'toc-right-list';

  // Build TOC from headers
  let currentH2Item = null;
  let currentH2List = null;

  headers.forEach((header) => {
    const link = document.createElement('a');
    link.href = '#' + header.id;
    link.className = 'toc-right-link';
    
    // Get section number and text
    const sectionNumber = header.querySelector('.header-section-number');
    const headerText = header.textContent.replace(sectionNumber?.textContent || '', '').trim();
    
    if (sectionNumber) {
      const numberSpan = document.createElement('span');
      numberSpan.className = 'toc-right-number';
      numberSpan.textContent = sectionNumber.textContent;
      link.appendChild(numberSpan);
    }
    
    const textSpan = document.createElement('span');
    textSpan.className = 'toc-right-text';
    textSpan.textContent = headerText;
    link.appendChild(textSpan);

    const listItem = document.createElement('li');
    listItem.className = 'toc-right-item';
    listItem.appendChild(link);

    if (header.tagName === 'H2') {
      // Main section
      listItem.classList.add('toc-right-h2');
      tocList.appendChild(listItem);
      currentH2Item = listItem;
      currentH2List = null;
    } else if (header.tagName === 'H3' && currentH2Item) {
      // Subsection
      if (!currentH2List) {
        currentH2List = document.createElement('ul');
        currentH2List.className = 'toc-right-sublist';
        currentH2Item.appendChild(currentH2List);
      }
      listItem.classList.add('toc-right-h3');
      currentH2List.appendChild(listItem);
    }

    // Smooth scroll on click
    link.addEventListener('click', (e) => {
      e.preventDefault();
      header.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without scrolling
      history.pushState(null, null, link.href);
      
      // Remove focus to prevent hover issues
      link.blur();
      
      // Remove focus from sidebar to ensure hover works properly
      setTimeout(() => {
        if (document.activeElement && document.activeElement.closest('#sidebar-right')) {
          document.activeElement.blur();
        }
      }, 100);
    });
  });

  tocContainer.appendChild(tocList);
  rightSidebar.appendChild(tocContainer);

  // Set up scroll-based highlighting
  setupScrollHighlighting(headers);
}

function setupScrollHighlighting(headers) {
  let ticking = false;
  
  function updateHighlight() {
    const scrollPosition = window.scrollY + 100; // Offset for better accuracy
    let currentSection = null;

    // Find the current section
    headers.forEach((header) => {
      const headerTop = header.offsetTop;
      if (scrollPosition >= headerTop) {
        currentSection = header;
      }
    });

    // Update highlighting
    const tocLinks = document.querySelectorAll('.toc-right-link');
    tocLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (currentSection && href === '#' + currentSection.id) {
        link.classList.add('active');
        
        // Also highlight parent h2 if we're in an h3
        if (currentSection.tagName === 'H3') {
          const parentItem = link.closest('.toc-right-h3').parentElement.closest('.toc-right-h2');
          if (parentItem) {
            parentItem.querySelector('.toc-right-link').classList.add('active-parent');
          }
        }
      } else {
        link.classList.remove('active-parent');
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHighlight);
      ticking = true;
    }
  }

  // Initial highlight
  updateHighlight();

  // Listen for scroll events
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', updateHighlight);
}

function setupFootnoteTransparency() {
  const rightSidebar = document.getElementById('sidebar-right');
  if (!rightSidebar) return;

  function checkFootnotes() {
    // Look for footnotes section specifically
    const footnotes = document.querySelector('.footnotes');
    
    if (footnotes) {
      // Check if footnotes are actually visible in viewport
      const footnotesRect = footnotes.getBoundingClientRect();
      const sidebarRect = rightSidebar.getBoundingClientRect();
      
      // Check if footnotes are in the viewport and overlap with sidebar
      const footnotesInViewport = footnotesRect.top < window.innerHeight && footnotesRect.bottom > 0;
      
      // Only check vertical overlap since footnotes are positioned to the right
      const verticalOverlap = footnotesRect.top < sidebarRect.bottom && 
                             footnotesRect.bottom > sidebarRect.top;
      
      // Add buffer zone - remove transparency class a bit early
      const buffer = 50; // pixels of buffer before actual overlap
      const overlapsWithBuffer = footnotesRect.top < (sidebarRect.bottom + buffer) && 
                                 footnotesRect.bottom > (sidebarRect.top - buffer);
      
      if (footnotesInViewport && verticalOverlap) {
        rightSidebar.classList.add('footnotes-transparent');
      } else {
        rightSidebar.classList.remove('footnotes-transparent');
      }
    } else {
      // No footnotes, ensure class is removed
      rightSidebar.classList.remove('footnotes-transparent');
    }
  }

  // Check initially and on scroll/resize
  checkFootnotes();
  window.addEventListener('scroll', checkFootnotes);
  window.addEventListener('resize', checkFootnotes);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  createRightSidebarTOC();
  setupFootnoteTransparency();
});