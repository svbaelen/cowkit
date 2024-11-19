// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

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
      let oldNode = img;
      // use parentNode on img in case of "hyperlinked" img
      if (img.parentNode.tagName == "A"){
        oldNode = img.parentNode
      }
      subfig.insertBefore(figure, oldNode);
      figure.appendChild(oldNode);
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
