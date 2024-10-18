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
var FPATH_JSON_OUT = ARGS[1];
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

async function process_html(sHTML) {

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

    if (fileName !== prevFileName){
      fileContent = await readFile(`${MAIN_DIRNAME}/${fileName}`);
      prevFileName = fileName;
      fileDom = new JSDOM(fileContent);
      const elem = fileDom.window.document.querySelector(`#${elId}`);
      const idTag = elem.tagName;

      var idTagInt = 0; // = unknown
      if (idTag[0] === "H"){
        idTagInt = Number(idTag[1]);
      } else {
        console.log(`ID '${elId}' does not seem to be of type header (H1, H2, ...)`)
      }

      arrFileObj[fileName] = {
        //"content": fileContent,
        "linkList": [link],
        "titleList": [elem.textContent],
        "dom": fileDom,
        "idList": [elId],
        "idHeaderIntList": [idTagInt],
        "mapIdText": {}
      };
    } else {
      const elem = arrFileObj[fileName]['dom']
        .window.document.querySelector(`#${elId}`);
      const idTag = elem.tagName;
      var idTagInt = 0; // = unknown
      if (idTag[0] === "H"){
        idTagInt = Number(idTag[1]);
      } else {
        console.log(`ID '${elId}' does not seem to be of type header (H1, H2, ...)`)
      }

      arrFileObj[fileName]['linkList'].push(link)
      arrFileObj[fileName]['idList'].push(elId)
      arrFileObj[fileName]['idHeaderIntList'].push(idTagInt)
      arrFileObj[fileName]['titleList'].push(elem.textContent)
    }

    /*const els = fileDom.window.document*/
      /*.querySelectorAll(`#text-body > :not(header, nav)`);*/
    //for (const el of els){
      //console.log(el.textContent);
      //console.log(el.tagName);
      //console.log(el.id);
    //}
  }


  for (const [key, objVal] of Object.entries(arrFileObj)) {
    // loop through all the files
    const elems = objVal['dom']
      .window.document.querySelectorAll(`#text-body > :not(#text-body-top)`);

    var allElementsCovered = false;
    var idx = 0;
    var objValIdx = 0;
    var currentSecId = null;

    // loop through all elements in file, and push text to  for each
    // (sub)section (in mapIdText { id : [] , ...})
    while (idx < elems.length) {
      //console.log(`--> ${key}`);
      //console.log(currentSecId);

      for (idx; idx<elems.length; idx++) {
        const elem = elems[idx];
        if (escapeId(elem.id) === objVal['idList'][objValIdx]){
          // new section ID (not in mapIdText yet)
          if (!(elem.id in objVal['mapIdText'])){
            objVal['mapIdText'][escapeId(elem.id)] = [];
          }

          currentSecId = objVal['idList'][objValIdx];
          //console.log(idx);
          objValIdx++;
          idx++;
          const nextEl = elems[idx];
          // in case there is no element between two section IDS, move on
          // _and_ make sure it's not the end of a file
          if (nextEl) {
            if (escapeId(nextEl.id) === objVal['idList'][objValIdx]){
              objVal['mapIdText'][currentSecId].push('');
              break;
            }
          }

          break;
        }
        else {
          objVal['mapIdText'][currentSecId].push(elem.textContent);
        }
        //console.log(el.textContent);
        //console.log(el.tagName);
        //console.log(el.id);
      }
    }
  }

  //console.log(arrFileObj['2-modeling.html']);
  return arrFileObj;
}

async function generate_search_documents(arrFileObj) {
  //console.log(arrFileObj);
  var sIdx = 1;
  const documents = [];

  for (const [key, objVal] of Object.entries(arrFileObj)) {
    for (const [idx, id] of objVal['idList'].entries()) {
      //console.log(id, idx);
      documents.push(
        {
          id: sIdx,
          title: objVal['titleList'][idx],
          href: objVal['linkList'][idx],
          text: objVal['mapIdText'][id].join(" "),
        }
      )

      sIdx = sIdx + 1;
    }
  }

  return documents;
}


/********************************************************************/
/* Main                                                             */
/********************************************************************/

async function main() {

  var mainFileContent = await readFile(MAIN_FPATH);
  var arrFileObj = await process_html(mainFileContent);
  var sDoc = await generate_search_documents(arrFileObj);

  var json = JSON.stringify(sDoc);
  await fs.writeFile(FPATH_JSON_OUT, json, 'utf8', function(err) {
    if (err) throw err;
  });
}

main();
