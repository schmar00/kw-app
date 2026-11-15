<script>
  import { allKeywords, kwFormat, formatKeyword, atx, country, euroscivoc, ignoreKw } from './shared.svelte'
  import keyword_extractor from 'keyword-extractor';
  import { distance } from 'fastest-levenshtein';

  let fileContent, fileName, fileInput, keywords
  let modifiedContent = '';


  // Handle file selection and reading
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    fileName = file.name; // Store the original file name
    const reader = new FileReader();
    reader.onload = function(e) {
      fileContent = e.target.result; // Read the file content
      //console.log(fileContent)
      prg = '0%';
      // @ts-ignore
      modifiedContent = fileContent; // Set modified content to be the same initially
    };
    reader.readAsText(file);
    //console.log(file)
  }

  // Trigger file download after modification
  /** @param {'csv' | 'tsv'} format */
  function saveFile(format) {
    let content = modifiedContent.replace(/\—|\n\n/g,'').replace(/\n\n/g,'\n');
    if (format === 'csv') {
      content = content.replace(/[^\t\r\n]+/g, field =>
        /[",]/.test(field) ? `"${field.replace(/"/g, '""')}"` : field
      ).replace(/\t/g, ',');
    }
    const blob = new Blob(['\uFEFF', content], { type: format === 'csv' ? 'text/csv;charset=utf-8' : 'text/tab-separated-values;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName ? fileName.replace(/\.[^.]+$/, '') : 'keywords'}.${format}`;
    link.click();
    // Clean up URL object after download
    URL.revokeObjectURL(link.href);
  }

  function clearText() {
    if (isRunning) cancelRequested = true;
    modifiedContent = '';
    fileContent = undefined;
    fileName = undefined;
    fileInput.value = '';
    prg = '0%';
    remainingSeconds = null;
  }

  // REWORK needed for spec char removal !!!
  let extractExceptions = ['well', 'causes']; // critical words not to remove by keyword extractor
  //possible to solve with keyword selection
  let problematic = [];
  //let problematic = ['cation', 'geology', 'information', 'containment', 'granite', 'mass wasting', 'capping', 'primary', 'polder', 'coast', 'rock', 'placer', 'atmospheric causes', 'joint', 'copper'];
  function kwExtract(text, thes){
    text = text.replace(/\_|\"|\-|\.|\:|\'|\//g,' ').toLowerCase();
    let someExist = extractExceptions.some(word => text.split(' ').includes(word));
    let kArr = keyword_extractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false
    })//.map(a => a.length > 6 ? stemmer(a) : a);
    // if keyword of thesaurus then without extraction
    return someExist ? thes ? text.split(' ') : text.split(' ').concat(kArr) : kArr;
  }

  let counter, kwCount 
  let prg = '0%';
  let remainingSeconds = null;
  let isRunning = false;
  let cancelRequested = false;

  function calDist(l){ //calculate distance based on keyword length
    return l > 17 ? 3 : l > 12 ? 2 : l > 5 ? 1 : 0
  }

  function formatRemainingTime(seconds) {
    return seconds > 60 ? `${Math.floor(seconds / 60)}m ${seconds % 60}s` : `${seconds}s`;
  }

  async function getKeywords(){
    if (isRunning) {
      cancelRequested = true;
      return;
    }

    isRunning = true;
    cancelRequested = false;
    prg = '0%';
    remainingSeconds = null;
    let completed = false;
    try {
      completed = await generateKeywords();
    } finally {
      isRunning = false;
      remainingSeconds = null;
      if (!completed) prg = '0%';
    }
  }

  async function generateKeywords(){
    let start = performance.now()
    let content = modifiedContent.split('\n');
    let entries = content.filter(a => a != '');
    //modifiedContent = '';
    let newContent = '';
    // filter out keywords with more than 4 words and more than 40 characters
    let filteredKeywords = allKeywords.arr
      .filter(a => (a.newLabelArr.length < 5 && a.len < 40))
      .filter(a => !problematic.includes(a.label)); 
      //console.log('filteredKeywords: ', filteredKeywords);

    if (kwFormat.significant){
      filteredKeywords = filteredKeywords.filter(a => ignoreKw.indexOf(`-${a.uri.split('/')[6]}-`) == -1);
      console.log('filteredKeywords: ', filteredKeywords);
    }  

    counter = 0;
    kwCount = 0;
    //console.log(content)
    // iterate over each line of the content
    for (const entry of entries) {
      await new Promise(resolve => setTimeout(resolve, 10));
      if (cancelRequested) return false;
      
      keywords = [];
      let kwStrings = ' ';
      // test for single, double, triple and quad combinations of keywords, to capture phrases and compound nouns e.g. data base -> database
      let textArr1 = kwExtract(entry, false);  //console.log('textArr1', textArr1);
      let textArr2 = textArr1.map((item, index, arr) => (index < arr.length - 1)?[item, arr[index + 1]].join(''):'').filter(pair => pair);  //console.log('textArr2', textArr2);
      let textArr3 = textArr1.map((item, index, arr) => (index < arr.length - 2)?[item, arr[index + 1], arr[index + 2]].join(''):'').filter(triple => triple);  //console.log('textArr3', textArr3);
      let textArr4 = textArr1.map((item, index, arr) => (index < arr.length - 3)?[item, arr[index + 1], arr[index + 2], arr[index + 3]].join(''):'').filter(quad => quad);  //console.log('textArr4', textArr4);
      let searchArr = [...textArr1, ...textArr2, ...textArr3, ...textArr4]; //console.log('searchArr: ', searchArr);

      // iterate over each keyword
      for (let kw of filteredKeywords) {
        let newKw = kw.newLabelArr.join('');

        // test for distance between keyword and text combinations (up to quads)
        for (let word of searchArr) {
          if((distance(newKw, word) <= calDist(newKw.length)) && (Math.abs(word.length - kw.label.length) < 4) && (newKw[0] == word[0])){ //e.g. thermal well
            //console.log('word: ', word, ' - newKw: ', newKw, ' - distance: ', distance(word, newKw), ' - length: ', newKw.length);

            /* if (kwFormat.specific) { 
              if (kw.topic!='') {keywords.push(kw);}
            } else */ 
            if (kwFormat.detailed) {
              if (kwStrings.indexOf(' ' + kw.label.toLowerCase() + ' ') == -1) {
                keywords.push(kw);
                kwStrings += kw.label.toLowerCase() + ' ';
              }
            } else {
              keywords.push(kw);
              kwStrings += kw.label.toLowerCase() + ' ';
            }
            //console.log(keywords, kwStrings)
          }
        }
      } 
      
      //console.log('keywords: ', keywords);

      // look for text slugs matching and category detection
      let kwURIs = keywords.map(a => a.uri);
      for (const x of atx) {
        if ((entry.toLowerCase().indexOf(x[0]) > -1) && (kwURIs.includes(x[2])== false)) {
          let kwTopics = filteredKeywords.filter(a => a.uri == x[2]).map(b => b.topic).join(';'); 
          keywords.push({label:x[1], uri:x[2], topic:kwTopics});
          kwURIs.push(x[2]);
        }
      }
      // look for country names
      let gnURIs = [];
      if (kwFormat.geonames) {
        for (const x of country) {
          if ((entry.toLowerCase().indexOf(x[0]) > -1) && (gnURIs.includes(x[2])== false)) {
            keywords.push({label:x[1], uri:x[2]});
            gnURIs.push(x[2]);
          }
        }
      }
      // add topics from euroscivoc
      if (kwFormat.specific) {
        let esv = keywords.map(a => a.topic).join(';');
        for (const x of euroscivoc) {
          if (esv.toLowerCase().indexOf(x[1]) > -1){
            keywords.push({label:x[1], uri:x[2]});
          }
        }
      }    

      if (kwFormat.groupedOutput){ 
        newContent += entry + '\n\n\t' + [...new Set(keywords)].map(a => formatKeyword(a.label, a.uri)).join('') + '\n';
      } else {
        newContent += [...new Set(keywords)].map(a => `${entry}${'\t'}${formatKeyword(a.label, a.uri)}\n`).join('');
      }
      newContent += '————————————————————————————————————————————————————\n'
      kwCount += keywords.length;
      counter += 1;
      prg = Math.floor(counter / entries.length * 100) + '%';
      remainingSeconds = Math.ceil((performance.now() - start) / counter * (entries.length - counter) / 1000);
    }
    modifiedContent = newContent;
    prg = 'analysed ' + content.length + ' entries, in ' + ((performance.now() - start)/1000).toFixed(2) + 's, avg. ' + Math.round(kwCount/(content.length==0?1:content.length)) + ' of total ' +  kwCount + ' keywords';
    return true;
  }

</script>


<div class="flex flex-col sm:flex-row sm:justify-between mt-[-8px]">
  <div>
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-900 dark:text-white" for="file_input">
      <h5 class="text-xl font-bold dark:text-white">Inline Tagging Editor
        <span class="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">(.txt, .csv, .tsv)</span>
        </h5>
      </label>
    </div>
    <!-- tsv not ready yet -->
    <div class="flex items-center">
    <input bind:this={fileInput} accept=".txt,.csv,.tsv" on:change={handleFileUpload} class="md:w-[400px] w-[200px] shrink-0 text-sm text-blue-600 hover:font-extrabold file:bg-white file:border-0 file:focus:outline-none file:font-normal file:rounded-lg file:text-sm file:px-2 file:py-1 dark:file:bg-transparent cursor-pointer bg-white dark:text-blue-300 focus:outline-none dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
    {#if modifiedContent.length > 2}
      <button type="button" on:click={() => saveFile('csv')} class="shrink-0 text-blue-600 bg-white focus:outline-none hover:font-extrabold focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 dark:bg-gray-800 dark:text-blue-300 dark:focus:ring-gray-700">save CSV</button>
      <button type="button" on:click={() => saveFile('tsv')} class="shrink-0 text-blue-600 bg-white focus:outline-none hover:font-extrabold focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 dark:bg-gray-800 dark:text-blue-300 dark:focus:ring-gray-700">save TSV</button>
    {/if}
    </div>
  </div>
  <div class="self-center">
    {#if modifiedContent == '' && !isRunning}
      <button type="button" class="w-[170px] dark:text-gray-500 text-white bg-gray-300 dark:bg-gray-700 cursor-not-allowed font-medium rounded-lg text-xl px-5 py-2.5 text-center" disabled>add keywords</button>
    {:else}
      <button type="button" on:click={getKeywords} aria-label={isRunning ? 'Cancel keyword generation' : 'add keywords'} class="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="w-[170px] relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
          {isRunning ? 'cancel' : 'add keywords'}
        </span>
      </button>
    {/if}
  </div>
</div>

<div class="relative mt-4">
  {#if modifiedContent}
    <button
      type="button"
      on:click={clearText}
      aria-label="Clear text"
      title="Clear text"
      class="absolute right-3 top-2 z-10 rounded p-1 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
    >
      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}
  <textarea bind:value={modifiedContent}
    id="message" rows="4" class="block p-2.5 pr-9 min-h-80 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=".. or write your text here .."></textarea>
</div>


{#if isRunning || prg != '0%'}
  <div class="w-full bg-transparent rounded-full h-0.5 mt-1">
    <div class="bg-gradient-to-r to-emerald-600 from-sky-400 h-1 rounded-full" style="width: {prg}"></div>
  </div>
  <div class="flex justify-end mb-1">
    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{prg}{#if isRunning} · {remainingSeconds === null ? 'estimating remaining time' : `about ${formatRemainingTime(remainingSeconds)} remaining`}{/if}</span>
  </div>
{/if}