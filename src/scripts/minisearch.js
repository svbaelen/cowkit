/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/minisearch@7.1.0/dist/umd/index.js
 *
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).MiniSearch=e()}(this,(function(){"use strict";function t(t,e,s,i){return new(s||(s=Promise))((function(n,o){function r(t){try{u(i.next(t))}catch(t){o(t)}}function c(t){try{u(i.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,c)}u((i=i.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const e="KEYS",s="VALUES",i="";class n{constructor(t,e){const s=t._tree,i=Array.from(s.keys());this.set=t,this._type=e,this._path=i.length>0?[{node:s,keys:i}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(0===this._path.length)return{done:!0,value:void 0};const{node:t,keys:e}=o(this._path);if(o(e)===i)return{done:!1,value:this.result()};const s=t.get(o(e));return this._path.push({node:s,keys:Array.from(s.keys())}),this.dive()}backtrack(){if(0===this._path.length)return;const t=o(this._path).keys;t.pop(),t.length>0||(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map((({keys:t})=>o(t))).filter((t=>t!==i)).join("")}value(){return o(this._path).node.get(i)}result(){switch(this._type){case s:return this.value();case e:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const o=t=>t[t.length-1],r=(t,e,s,n,o,c,u,h)=>{const d=c*u;t:for(const a of t.keys())if(a===i){const e=o[d-1];e<=s&&n.set(h,[t.get(a),e])}else{let i=c;for(let t=0;t<a.length;++t,++i){const n=a[t],r=u*i,c=r-u;let h=o[r];const d=Math.max(0,i-s-1),l=Math.min(u-1,i+s);for(let t=d;t<l;++t){const s=n!==e[t],i=o[c+t]+ +s,u=o[c+t+1]+1,d=o[r+t]+1,a=o[r+t+1]=Math.min(i,u,d);a<h&&(h=a)}if(h>s)continue t}r(t.get(a),e,s,n,o,i,u,h+a)}};class c{constructor(t=new Map,e=""){this._size=void 0,this._tree=t,this._prefix=e}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[e,s]=u(this._tree,t.slice(this._prefix.length));if(void 0===e){const[e,n]=m(s);for(const s of e.keys())if(s!==i&&s.startsWith(n)){const i=new Map;return i.set(s.slice(n.length),e.get(s)),new c(i,t)}}return new c(e,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,a(this._tree,t)}entries(){return new n(this,"ENTRIES")}forEach(t){for(const[e,s]of this)t(e,s,this)}fuzzyGet(t,e){return((t,e,s)=>{const i=new Map;if(void 0===e)return i;const n=e.length+1,o=n+s,c=new Uint8Array(o*n).fill(s+1);for(let t=0;t<n;++t)c[t]=t;for(let t=1;t<o;++t)c[t*n]=t;return r(t,e,s,i,c,1,n,""),i})(this._tree,t,e)}get(t){const e=h(this._tree,t);return void 0!==e?e.get(i):void 0}has(t){const e=h(this._tree,t);return void 0!==e&&e.has(i)}keys(){return new n(this,e)}set(t,e){if("string"!=typeof t)throw new Error("key must be a string");this._size=void 0;return d(this._tree,t).set(i,e),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,e){if("string"!=typeof t)throw new Error("key must be a string");this._size=void 0;const s=d(this._tree,t);return s.set(i,e(s.get(i))),this}fetch(t,e){if("string"!=typeof t)throw new Error("key must be a string");this._size=void 0;const s=d(this._tree,t);let n=s.get(i);return void 0===n&&s.set(i,n=e()),n}values(){return new n(this,s)}[Symbol.iterator](){return this.entries()}static from(t){const e=new c;for(const[s,i]of t)e.set(s,i);return e}static fromObject(t){return c.from(Object.entries(t))}}const u=(t,e,s=[])=>{if(0===e.length||null==t)return[t,s];for(const n of t.keys())if(n!==i&&e.startsWith(n))return s.push([t,n]),u(t.get(n),e.slice(n.length),s);return s.push([t,e]),u(void 0,"",s)},h=(t,e)=>{if(0===e.length||null==t)return t;for(const s of t.keys())if(s!==i&&e.startsWith(s))return h(t.get(s),e.slice(s.length))},d=(t,e)=>{const s=e.length;t:for(let n=0;t&&n<s;){for(const o of t.keys())if(o!==i&&e[n]===o[0]){const i=Math.min(s-n,o.length);let r=1;for(;r<i&&e[n+r]===o[r];)++r;const c=t.get(o);if(r===o.length)t=c;else{const s=new Map;s.set(o.slice(r),c),t.set(e.slice(n,n+r),s),t.delete(o),t=s}n+=r;continue t}const o=new Map;return t.set(e.slice(n),o),o}return t},a=(t,e)=>{const[s,n]=u(t,e);if(void 0!==s)if(s.delete(i),0===s.size)l(n);else if(1===s.size){const[t,e]=s.entries().next().value;f(n,t,e)}},l=t=>{if(0===t.length)return;const[e,s]=m(t);if(e.delete(s),0===e.size)l(t.slice(0,-1));else if(1===e.size){const[s,n]=e.entries().next().value;s!==i&&f(t.slice(0,-1),s,n)}},f=(t,e,s)=>{if(0===t.length)return;const[i,n]=m(t);i.set(n+e,s),i.delete(n)},m=t=>t[t.length-1],g="or";class _{constructor(t){if(null==(null==t?void 0:t.fields))throw new Error('MiniSearch: option "fields" must be provided');const e=null==t.autoVacuum||!0===t.autoVacuum?O:t.autoVacuum;this._options=Object.assign(Object.assign(Object.assign({},v),t),{autoVacuum:e,searchOptions:Object.assign(Object.assign({},x),t.searchOptions||{}),autoSuggestOptions:Object.assign(Object.assign({},z),t.autoSuggestOptions||{})}),this._index=new c,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=I,this.addFields(this._options.fields)}add(t){const{extractField:e,tokenize:s,processTerm:i,fields:n,idField:o}=this._options,r=e(t,o);if(null==r)throw new Error(`MiniSearch: document does not have ID field "${o}"`);if(this._idToShortId.has(r))throw new Error(`MiniSearch: duplicate ID ${r}`);const c=this.addDocumentId(r);this.saveStoredFields(c,t);for(const o of n){const n=e(t,o);if(null==n)continue;const r=s(n.toString(),o),u=this._fieldIds[o],h=new Set(r).size;this.addFieldLength(c,u,this._documentCount-1,h);for(const t of r){const e=i(t,o);if(Array.isArray(e))for(const t of e)this.addTerm(u,c,t);else e&&this.addTerm(u,c,e)}}}addAll(t){for(const e of t)this.add(e)}addAllAsync(t,e={}){const{chunkSize:s=10}=e,i={chunk:[],promise:Promise.resolve()},{chunk:n,promise:o}=t.reduce((({chunk:t,promise:e},i,n)=>(t.push(i),(n+1)%s==0?{chunk:[],promise:e.then((()=>new Promise((t=>setTimeout(t,0))))).then((()=>this.addAll(t)))}:{chunk:t,promise:e})),i);return o.then((()=>this.addAll(n)))}remove(t){const{tokenize:e,processTerm:s,extractField:i,fields:n,idField:o}=this._options,r=i(t,o);if(null==r)throw new Error(`MiniSearch: document does not have ID field "${o}"`);const c=this._idToShortId.get(r);if(null==c)throw new Error(`MiniSearch: cannot remove document with ID ${r}: it is not in the index`);for(const o of n){const n=i(t,o);if(null==n)continue;const r=e(n.toString(),o),u=this._fieldIds[o],h=new Set(r).size;this.removeFieldLength(c,u,this._documentCount,h);for(const t of r){const e=s(t,o);if(Array.isArray(e))for(const t of e)this.removeTerm(u,c,t);else e&&this.removeTerm(u,c,e)}}this._storedFields.delete(c),this._documentIds.delete(c),this._idToShortId.delete(r),this._fieldLength.delete(c),this._documentCount-=1}removeAll(t){if(t)for(const e of t)this.remove(e);else{if(arguments.length>0)throw new Error("Expected documents to be present. Omit the argument to remove all documents.");this._index=new c,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldLength=new Map,this._avgFieldLength=[],this._storedFields=new Map,this._nextId=0}}discard(t){const e=this._idToShortId.get(t);if(null==e)throw new Error(`MiniSearch: cannot discard document with ID ${t}: it is not in the index`);this._idToShortId.delete(t),this._documentIds.delete(e),this._storedFields.delete(e),(this._fieldLength.get(e)||[]).forEach(((t,s)=>{this.removeFieldLength(e,s,this._documentCount,t)})),this._fieldLength.delete(e),this._documentCount-=1,this._dirtCount+=1,this.maybeAutoVacuum()}maybeAutoVacuum(){if(!1===this._options.autoVacuum)return;const{minDirtFactor:t,minDirtCount:e,batchSize:s,batchWait:i}=this._options.autoVacuum;this.conditionalVacuum({batchSize:s,batchWait:i},{minDirtCount:e,minDirtFactor:t})}discardAll(t){const e=this._options.autoVacuum;try{this._options.autoVacuum=!1;for(const e of t)this.discard(e)}finally{this._options.autoVacuum=e}this.maybeAutoVacuum()}replace(t){const{idField:e,extractField:s}=this._options,i=s(t,e);this.discard(i),this.add(t)}vacuum(t={}){return this.conditionalVacuum(t)}conditionalVacuum(t,e){return this._currentVacuum?(this._enqueuedVacuumConditions=this._enqueuedVacuumConditions&&e,null!=this._enqueuedVacuum||(this._enqueuedVacuum=this._currentVacuum.then((()=>{const e=this._enqueuedVacuumConditions;return this._enqueuedVacuumConditions=I,this.performVacuuming(t,e)}))),this._enqueuedVacuum):!1===this.vacuumConditionsMet(e)?Promise.resolve():(this._currentVacuum=this.performVacuuming(t),this._currentVacuum)}performVacuuming(e,s){return t(this,void 0,void 0,(function*(){const t=this._dirtCount;if(this.vacuumConditionsMet(s)){const s=e.batchSize||S.batchSize,i=e.batchWait||S.batchWait;let n=1;for(const[t,e]of this._index){for(const[t,s]of e)for(const[i]of s)this._documentIds.has(i)||(s.size<=1?e.delete(t):s.delete(i));0===this._index.get(t).size&&this._index.delete(t),n%s==0&&(yield new Promise((t=>setTimeout(t,i)))),n+=1}this._dirtCount-=t}yield null,this._currentVacuum=this._enqueuedVacuum,this._enqueuedVacuum=null}))}vacuumConditionsMet(t){if(null==t)return!0;let{minDirtCount:e,minDirtFactor:s}=t;return e=e||O.minDirtCount,s=s||O.minDirtFactor,this.dirtCount>=e&&this.dirtFactor>=s}get isVacuuming(){return null!=this._currentVacuum}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}has(t){return this._idToShortId.has(t)}getStoredFields(t){const e=this._idToShortId.get(t);if(null!=e)return this._storedFields.get(e)}search(t,e={}){const s=this.executeQuery(t,e),i=[];for(const[t,{score:n,terms:o,match:r}]of s){const s=o.length||1,c={id:this._documentIds.get(t),score:n*s,terms:Object.keys(r),queryTerms:o,match:r};Object.assign(c,this._storedFields.get(t)),(null==e.filter||e.filter(c))&&i.push(c)}return t===_.wildcard&&null==e.boostDocument&&null==this._options.searchOptions.boostDocument||i.sort(k),i}autoSuggest(t,e={}){e=Object.assign(Object.assign({},this._options.autoSuggestOptions),e);const s=new Map;for(const{score:i,terms:n}of this.search(t,e)){const t=n.join(" "),e=s.get(t);null!=e?(e.score+=i,e.count+=1):s.set(t,{score:i,terms:n,count:1})}const i=[];for(const[t,{score:e,terms:n,count:o}]of s)i.push({suggestion:t,terms:n,score:e/o});return i.sort(k),i}get documentCount(){return this._documentCount}get termCount(){return this._index.size}static loadJSON(t,e){if(null==e)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return this.loadJS(JSON.parse(t),e)}static loadJSONAsync(e,s){return t(this,void 0,void 0,(function*(){if(null==s)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return this.loadJSAsync(JSON.parse(e),s)}))}static getDefault(t){if(v.hasOwnProperty(t))return p(v,t);throw new Error(`MiniSearch: unknown option "${t}"`)}static loadJS(t,e){const{index:s,documentIds:i,fieldLength:n,storedFields:o,serializationVersion:r}=t,c=this.instantiateMiniSearch(t,e);c._documentIds=j(i),c._fieldLength=j(n),c._storedFields=j(o);for(const[t,e]of c._documentIds)c._idToShortId.set(e,t);for(const[t,e]of s){const s=new Map;for(const t of Object.keys(e)){let i=e[t];1===r&&(i=i.ds),s.set(parseInt(t,10),j(i))}c._index.set(t,s)}return c}static loadJSAsync(e,s){return t(this,void 0,void 0,(function*(){const{index:t,documentIds:i,fieldLength:n,storedFields:o,serializationVersion:r}=e,c=this.instantiateMiniSearch(e,s);c._documentIds=yield V(i),c._fieldLength=yield V(n),c._storedFields=yield V(o);for(const[t,e]of c._documentIds)c._idToShortId.set(e,t);let u=0;for(const[e,s]of t){const t=new Map;for(const e of Object.keys(s)){let i=s[e];1===r&&(i=i.ds),t.set(parseInt(e,10),yield V(i))}++u%1e3==0&&(yield T(0)),c._index.set(e,t)}return c}))}static instantiateMiniSearch(t,e){const{documentCount:s,nextId:i,fieldIds:n,averageFieldLength:o,dirtCount:r,serializationVersion:u}=t;if(1!==u&&2!==u)throw new Error("MiniSearch: cannot deserialize an index created with an incompatible version");const h=new _(e);return h._documentCount=s,h._nextId=i,h._idToShortId=new Map,h._fieldIds=n,h._avgFieldLength=o,h._dirtCount=r||0,h._index=new c,h}executeQuery(t,e={}){if(t===_.wildcard)return this.executeWildcardQuery(e);if("string"!=typeof t){const s=Object.assign(Object.assign(Object.assign({},e),t),{queries:void 0}),i=t.queries.map((t=>this.executeQuery(t,s)));return this.combineResults(i,s.combineWith)}const{tokenize:s,processTerm:i,searchOptions:n}=this._options,o=Object.assign(Object.assign({tokenize:s,processTerm:i},n),e),{tokenize:r,processTerm:c}=o,u=r(t).flatMap((t=>c(t))).filter((t=>!!t)).map(b(o)).map((t=>this.executeQuerySpec(t,o)));return this.combineResults(u,o.combineWith)}executeQuerySpec(t,e){const s=Object.assign(Object.assign({},this._options.searchOptions),e),i=(s.fields||this._options.fields).reduce(((t,e)=>Object.assign(Object.assign({},t),{[e]:p(s.boost,e)||1})),{}),{boostDocument:n,weights:o,maxFuzzy:r,bm25:c}=s,{fuzzy:u,prefix:h}=Object.assign(Object.assign({},x.weights),o),d=this._index.get(t.term),a=this.termResults(t.term,t.term,1,t.termBoost,d,i,n,c);let l,f;if(t.prefix&&(l=this._index.atPrefix(t.term)),t.fuzzy){const e=!0===t.fuzzy?.2:t.fuzzy,s=e<1?Math.min(r,Math.round(t.term.length*e)):e;s&&(f=this._index.fuzzyGet(t.term,s))}if(l)for(const[e,s]of l){const o=e.length-t.term.length;if(!o)continue;null==f||f.delete(e);const r=h*e.length/(e.length+.3*o);this.termResults(t.term,e,r,t.termBoost,s,i,n,c,a)}if(f)for(const e of f.keys()){const[s,o]=f.get(e);if(!o)continue;const r=u*e.length/(e.length+o);this.termResults(t.term,e,r,t.termBoost,s,i,n,c,a)}return a}executeWildcardQuery(t){const e=new Map,s=Object.assign(Object.assign({},this._options.searchOptions),t);for(const[t,i]of this._documentIds){const n=s.boostDocument?s.boostDocument(i,"",this._storedFields.get(t)):1;e.set(t,{score:n,terms:[],match:{}})}return e}combineResults(t,e=g){if(0===t.length)return new Map;const s=e.toLowerCase(),i=y[s];if(!i)throw new Error(`Invalid combination operator: ${e}`);return t.reduce(i)||new Map}toJSON(){const t=[];for(const[e,s]of this._index){const i={};for(const[t,e]of s)i[t]=Object.fromEntries(e);t.push([e,i])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}termResults(t,e,s,i,n,o,r,c,u=new Map){if(null==n)return u;for(const h of Object.keys(o)){const d=o[h],a=this._fieldIds[h],l=n.get(a);if(null==l)continue;let f=l.size;const m=this._avgFieldLength[a];for(const n of l.keys()){if(!this._documentIds.has(n)){this.removeTerm(a,n,e),f-=1;continue}const o=r?r(this._documentIds.get(n),e,this._storedFields.get(n)):1;if(!o)continue;const g=l.get(n),_=this._fieldLength.get(n)[a],y=s*i*d*o*w(g,f,this._documentCount,_,m,c),b=u.get(n);if(b){b.score+=y,F(b.terms,t);const s=p(b.match,e);s?s.push(h):b.match[e]=[h]}else u.set(n,{score:y,terms:[t],match:{[e]:[h]}})}}return u}addTerm(t,e,s){const i=this._index.fetch(s,C);let n=i.get(t);if(null==n)n=new Map,n.set(e,1),i.set(t,n);else{const t=n.get(e);n.set(e,(t||0)+1)}}removeTerm(t,e,s){if(!this._index.has(s))return void this.warnDocumentChanged(e,t,s);const i=this._index.fetch(s,C),n=i.get(t);null==n||null==n.get(e)?this.warnDocumentChanged(e,t,s):n.get(e)<=1?n.size<=1?i.delete(t):n.delete(e):n.set(e,n.get(e)-1),0===this._index.get(s).size&&this._index.delete(s)}warnDocumentChanged(t,e,s){for(const i of Object.keys(this._fieldIds))if(this._fieldIds[i]===e)return void this._options.logger("warn",`MiniSearch: document with ID ${this._documentIds.get(t)} has changed before removal: term "${s}" was not present in field "${i}". Removing a document after it has changed can corrupt the index!`,"version_conflict")}addDocumentId(t){const e=this._nextId;return this._idToShortId.set(t,e),this._documentIds.set(e,t),this._documentCount+=1,this._nextId+=1,e}addFields(t){for(let e=0;e<t.length;e++)this._fieldIds[t[e]]=e}addFieldLength(t,e,s,i){let n=this._fieldLength.get(t);null==n&&this._fieldLength.set(t,n=[]),n[e]=i;const o=(this._avgFieldLength[e]||0)*s+i;this._avgFieldLength[e]=o/(s+1)}removeFieldLength(t,e,s,i){if(1===s)return void(this._avgFieldLength[e]=0);const n=this._avgFieldLength[e]*s-i;this._avgFieldLength[e]=n/(s-1)}saveStoredFields(t,e){const{storeFields:s,extractField:i}=this._options;if(null==s||0===s.length)return;let n=this._storedFields.get(t);null==n&&this._storedFields.set(t,n={});for(const t of s){const s=i(e,t);void 0!==s&&(n[t]=s)}}}_.wildcard=Symbol("*");const p=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0,y={[g]:(t,e)=>{for(const s of e.keys()){const i=t.get(s);if(null==i)t.set(s,e.get(s));else{const{score:t,terms:n,match:o}=e.get(s);i.score=i.score+t,i.match=Object.assign(i.match,o),M(i.terms,n)}}return t},and:(t,e)=>{const s=new Map;for(const i of e.keys()){const n=t.get(i);if(null==n)continue;const{score:o,terms:r,match:c}=e.get(i);M(n.terms,r),s.set(i,{score:n.score+o,terms:n.terms,match:Object.assign(n.match,c)})}return s},and_not:(t,e)=>{for(const s of e.keys())t.delete(s);return t}},w=(t,e,s,i,n,o)=>{const{k:r,b:c,d:u}=o;return Math.log(1+(s-e+.5)/(e+.5))*(u+t*(r+1)/(t+r*(1-c+c*i/n)))},b=t=>(e,s,i)=>({term:e,fuzzy:"function"==typeof t.fuzzy?t.fuzzy(e,s,i):t.fuzzy||!1,prefix:"function"==typeof t.prefix?t.prefix(e,s,i):!0===t.prefix,termBoost:"function"==typeof t.boostTerm?t.boostTerm(e,s,i):1}),v={idField:"id",extractField:(t,e)=>t[e],tokenize:t=>t.split(L),processTerm:t=>t.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(t,e)=>{"function"==typeof(null===console||void 0===console?void 0:console[t])&&console[t](e)},autoVacuum:!0},x={combineWith:g,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:{k:1.2,b:.7,d:.5}},z={combineWith:"and",prefix:(t,e,s)=>e===s.length-1},S={batchSize:1e3,batchWait:10},I={minDirtFactor:.1,minDirtCount:20},O=Object.assign(Object.assign({},S),I),F=(t,e)=>{t.includes(e)||t.push(e)},M=(t,e)=>{for(const s of e)t.includes(s)||t.push(s)},k=({score:t},{score:e})=>e-t,C=()=>new Map,j=t=>{const e=new Map;for(const s of Object.keys(t))e.set(parseInt(s,10),t[s]);return e},V=e=>t(void 0,void 0,void 0,(function*(){const t=new Map;let s=0;for(const i of Object.keys(e))t.set(parseInt(i,10),e[i]),++s%1e3==0&&(yield T(0));return t})),T=t=>new Promise((e=>setTimeout(e,t))),L=/[\n\r\p{Z}\p{P}]+/u;return _}));
//# sourceMappingURL=/sm/769596375706cad51ca3468a1318021f83c569fee2fc766c123365ff4b0c66cf.map

