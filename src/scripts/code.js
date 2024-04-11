/* Additional code block functionality */

const metaTrueStrings = ["true", "True", "1"];

const copyIconSvg = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16"
    version="1.1" width="16" data-view-component="true">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0
    1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0
    .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75
    0 0 1 0 14.25Z">
    </path>
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16
    .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5
    9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0
    .25-.25v-7.5a.25.25 0 0 0-.25-.25Z">
    </path>
    </svg>`

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text, msgEl) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    msgEl.textContent = "Copied to clipboard!";
    msgEl.style.display = "block";
    setTimeout(() => {
      msgEl.style.display = "none";
    }, 1000);
  }, function(err) {
    msgEl.textContent = err;
    msgEl.style.display = "block";
    setTimeout(() => {
      msgEl.style.display = "none";
    }, 1000);
  });
}

function addCodeLanguageInBlock() {
  const customMeta = document.head.querySelector('[data-code-lang]').dataset;

  const ignoreClasses = ["sourceCode", "numberSource", "numberLines"]
  const sourceCodeBlocks = document.querySelectorAll(`pre.sourceCode`);

  sourceCodeBlocks.forEach((block) => {
    const cList = block.classList;
    for (const cl of cList){
      // ingore non-relevant classes
      if (ignoreClasses.includes(cl)) continue;

      const blockMeta = document.createElement("div");
      blockMeta.classList.add("code-meta");
      const langEl = document.createElement("span");
      langEl.classList.add("code-lang");
      langEl.classList.add(cl);
      langEl.textContent = cl;

      const copyIconEl = document.createElement("span");
      copyIconEl.innerHTML = copyIconSvg;
      copyIconEl.title = "Copy to clipboard";
      copyIconEl.classList.add("copy-icon");
      copyIconEl.classList.add("clipboard-icon");
      block.insertBefore(blockMeta, block.firstChild);

      // TODO: better done outside loop
      if (metaTrueStrings.includes(customMeta.codeLang)){
        blockMeta.appendChild(langEl);
      }
      if (metaTrueStrings.includes(customMeta.codeCopy)){
        blockMeta.appendChild(copyIconEl);
      }

      const copyMsgEl = document.createElement("div")
      copyMsgEl.classList.add("copy-msg");
      //blockMeta.appendChild(copyMsgEl);
      //block.insertBefore(copyMsgEl, block.firstChild);
      block.parentNode.parentNode.insertBefore(copyMsgEl, block.parentNode);

      copyIconEl.addEventListener('click', function () {
        const code = block.querySelector(`code`);
        copyTextToClipboard(code.textContent, copyMsgEl);
      });
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
