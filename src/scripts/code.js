/* Additional code block functionality */


function addCodeLanguageInBlock() {
  const ignoreClasses = ["sourceCode", "numberSource", "numberLines"]
  const sourceCodeBlocks = document.querySelectorAll(`pre.sourceCode`);

  sourceCodeBlocks.forEach((block) => {
      const cList = block.classList;
      for (const cl of cList){
          // ingore non-relevant classes
          if (ignoreClasses.includes(cl)) continue;

          const langEl = document.createElement("span");
          langEl.classList.add("code-lang")
          langEl.classList.add(cl)
          langEl.textContent = cl

          block.insertBefore(langEl, block.firstChild);
      }
  });
}

/*==================================================================*/
/* MAIN                                                             */
/*------------------------------------------------------------------*/
/*                                                                  */
/* Comment out what is not needed                                   */
/*==================================================================*/

window.addEventListener('load', function () {
    addCodeLanguageInBlock();
})
