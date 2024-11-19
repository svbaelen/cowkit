// SPDX-FileCopyrightText: 2024 Senne Van Baelen
//
// SPDX-License-Identifier: Apache-2.0

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var path = require('path');
const fs = require('node:fs/promises');

/********************************************************************/
/* Config + Args                                                    */
/********************************************************************/

// read input
var ARGS = process.argv.slice(2);

var MAIN_FPATH = ARGS[0];
var MAIN_DIRNAME = path.dirname(MAIN_FPATH);


/********************************************************************/
/* Helpers                                                          */
/********************************************************************/

function escapeId(id) {
  return id.replace(':', '\\:')
}

async function readFile(fpath) {
  try {
    const data = await fs.readFile(fpath, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function clickable_images(sHTML) {

  const dom = new JSDOM(sHTML);
  const imgElems = dom.window.document.querySelectorAll(`img`);

  imgElems.forEach(img => {
    const link = dom.window.document.createElement('a');
    link.innerHTML = img.outerHTML;
    //link.setAttribute('href', img.href);
    link.setAttribute('href', img.src);
    link.setAttribute('target', "_blank");
    img.parentNode.insertBefore(link, img);
    img.remove()
  });

  return dom;
}

async function process_chuncked_html(sHTML) {

  const dom = new JSDOM(sHTML);

  // The script will be executed and modify the DOM:
  var tocContent = dom.window.document.querySelector("#toc-content");

  var tocLinkArr = [];
  var links = tocContent.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    tocLinkArr.push(links[i].href);
  }

  //console.log(tocLinkArr);
  var fileContent = null;
  var prevFileName = null;
  var fileDom = null;
  var arrFileObj = {};

  for (const [idx, link] of tocLinkArr.entries()) {
    const fileIdSplit = link.split('#');
    const fileName = fileIdSplit[0];
    const elId = escapeId(fileIdSplit[1]);
    let dom = null;

    if (fileName !== prevFileName){
      fileContent = await readFile(`${MAIN_DIRNAME}/${fileName}`);
      prevFileName = fileName;
      dom = await clickable_images(fileContent);

      const res = dom.serialize();
      if (dom){
        await fs.writeFile(`${MAIN_DIRNAME}/${fileName}`, res,
          'utf8', function(err) {
            if (err) throw err;
          });
      }
    }

  }

}


/********************************************************************/
/* Main                                                             */
/********************************************************************/

async function main() {

  var mainFileContent = await readFile(MAIN_FPATH);
  //var sDoc = await generate_search_documents(arrFileObj);
  var arrFileObj = await process_chuncked_html(mainFileContent);

  /*await fs.writeFile(FPATH_JSON_OUT, json, 'utf8', function(err) {*/
  /*if (err) throw err;*/
  /*});*/
}

main();
