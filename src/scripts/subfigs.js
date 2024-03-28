/* Additional subfig functionality, since CSS can't solve it and Pandoc is
 * buggy here */

function addSubfigCaption() {
  // hopefully a temporary hack
  //
  const subfigs = document.querySelectorAll(`figure.subfigures > p`);

  subfigs.forEach((subfig) => {

    const imgs = subfig.querySelectorAll(`img`);
    imgs.forEach((img) => {
      const figure = document.createElement("figure");
      const figcap = document.createElement("figcaption");
      figcap.textContent = `(${img.alt})`;
      figure.style.width = img.style.width;
      img.style.width = "100%";
      subfig.insertBefore(figure, img);
      figure.appendChild(img);
      figure.appendChild(figcap);
    })
  });
}

/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
    addSubfigCaption();
})
