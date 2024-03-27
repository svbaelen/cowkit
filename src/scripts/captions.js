/* Additional sidebar functionality */

function listingCaptionBelow() {
  /* http://lierdakil.github.io/pandoc-crossref/#code-block-labels */
  const listingCaptions = document.querySelectorAll(`.listing > p`);

  listingCaptions.forEach((listing) => {
      const listingMain = listing.parentNode;
      listingMain.removeChild(listing);
      listingMain.appendChild(listing);
  });
}

function tableCaptionBelow() {
  /* http://lierdakil.github.io/pandoc-crossref/#code-block-labels */
  const tableCaptions = document.querySelectorAll(`table > caption`);

  tableCaptions.forEach((caption) => {
      const tableMain = caption.parentNode;
      tableMain.removeChild(caption);
      tableMain.parentNode.appendChild(caption);
  });
}

/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
    listingCaptionBelow();
    tableCaptionBelow();
})
