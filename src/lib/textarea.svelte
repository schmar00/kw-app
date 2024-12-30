<script>
  import { allKeywords, kwFormat, formatKeyword } from './shared.svelte'
  import keyword_extractor from 'keyword-extractor';
  import { distance } from 'fastest-levenshtein';

  let fileContent, fileName, keywords
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
      // @ts-ignore
      modifiedContent = fileContent; // Set modified content to be the same initially
    };
    reader.readAsText(file);
    //console.log(file)
  }

  // Trigger file download after modification
  function saveFile() {
    const blob = new Blob([modifiedContent.replace(/\—/g,'').replace(/\n\n/g,'\n')], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName; // Save with the original file name
    link.click();
    // Clean up URL object after download
    URL.revokeObjectURL(link.href);
  }


  const atx = [
    ['hydrogeol', 'hydrogeology', 'https://data.geoscience.earth/ncl/geoera/keyword/2061'],
    ['geophys', 'geophysics', 'https://data.geoscience.earth/ncl/geoera/keyword/2066'],
    ['geotherm', 'geothermal energy', 'https://data.geoscience.earth/ncl/geoera/keyword/787'],
    ['seism', 'seismology', 'https://data.geoscience.earth/ncl/geoera/keyword/349'],
    ['geochemi', 'geochemistry', 'https://data.geoscience.earth/ncl/geoera/keyword/561'],
    ['marine geol', 'marine geology', 'https://data.geoscience.earth/ncl/geoera/keyword/2062']
  ];

  // REWORK needed for spec char removal !!!
  let extractExceptions = ['well']; // critical words not to remove by keyword extractor
  //possible to solve with keyword selection
  let problematic = [];
  //let problematic = ['cation', 'geology', 'information', 'containment', 'granite', 'mass wasting', 'capping', 'primary', 'polder', 'coast', 'rock', 'placer', 'atmospheric causes', 'joint', 'copper'];
  function kwExtract(text, thes){
    text = text.replace(/\_|\"|\-|\.|\:|\//g,' ').toLowerCase();
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

  let counter 
  let prg = '0%';

  function calDist(l){
    return l > 12 ? 2 : l > 5 ? 1 : 0
  }

  async function getKeywords(){
    let content = modifiedContent.split('\n');
    modifiedContent = '';
    let newContent = '';
    let filteredKeywords = allKeywords.arr.filter(a => (a.newLabelArr.length < 5 && a.len < 40)).filter(a => !problematic.includes(a.label)); 
    console.log('filteredKeywords: ', filteredKeywords);
    counter = 0;
    for (const entry of content) {
      counter += 1;
      prg = (counter / content.length * 100).toString().split('.')[0] + '%';
      await new Promise(resolve => setTimeout(resolve, 10)); // Wait 1 second
      
      keywords = [];
      let textArr1 = kwExtract(entry, false);  console.log('textArr1', textArr1);
      let textArr2 = textArr1.map((item, index, arr) => (index < arr.length - 1)?[item, arr[index + 1]].join(''):'').filter(pair => pair);  console.log('textArr2', textArr2);
      let textArr3 = textArr1.map((item, index, arr) => (index < arr.length - 2)?[item, arr[index + 1], arr[index + 2]].join(''):'').filter(triple => triple);  //console.log('textArr3', textArr3);
      let textArr4 = textArr1.map((item, index, arr) => (index < arr.length - 3)?[item, arr[index + 1], arr[index + 2], arr[index + 3]].join(''):'').filter(quad => quad);  //console.log('textArr4', textArr4);
      let searchArr = [...textArr1, ...textArr2, ...textArr3, ...textArr4]; console.log('searchArr: ', searchArr);

      for (let kw of filteredKeywords) {
        let newKw = kw.newLabelArr.join('');
        
        for (let word of searchArr) {
          if(distance(newKw, word) <= calDist(newKw.length) && Math.abs(word.length - kw.label.length) < 4){ //e.g. thermal well
            //console.log('word: ', word, ' - newKw: ', newKw, ' - distance: ', distance(word, newKw), ' - length: ', newKw.length);
            keywords.push(kw);
          }
        }
      }

      for (const x of atx) {
        if (entry.indexOf(x[0]) > -1){
          keywords.push({label:x[1], uri:x[2]});
        }
        
      }

      if (kwFormat.groupedOutput){ 
        newContent += entry + '\t' +  [...new Set(keywords)].map(a => formatKeyword(a.label, a.uri)).join('') + '\n';
      } else {
        newContent += [...new Set(keywords)].map(a => `${entry}${'\t'}${formatKeyword(a.label, a.uri)}\n`);

      }
      newContent += '——————————————————————————\n'
    }
    modifiedContent = newContent;
    prg = '0%';
  }

  

</script>
<div>
  <label class="block text-sm font-medium text-gray-900 dark:text-white" for="file_input">
    Upload file
    <span class="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">(.txt, .csv, .tsv)</span>
  </label>
</div>
<div class="flex justify-between">
  <div>
    <!-- tsv not ready yet -->
    <input accept="text/csv, text/txt, text/tsv" on:change={handleFileUpload} class="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
    {#if modifiedContent.length > 2}
      <button type="button" on:click={saveFile} class="ml-6 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" disabled>download CSV file</button>
    {/if}
  </div>
  <div class="">
    {#if modifiedContent == ''}
      <button type="button" class="text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-xl px-5 py-2.5 mb-3 text-center" disabled>add keywords</button>
    {:else}
      <button type="button" on:click={getKeywords} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          add keywords
        </span>
      </button>
    {/if}
  </div>
</div>

<div class="mt-4">
  <textarea bind:value={modifiedContent}  
    id="message" rows="4" class="block p-2.5 min-h-80 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your text here..."></textarea>
</div>

<div class="w-full bg-gray-200 rounded-full h-0.5 dark:bg-gray-700 mt-1">
  <div class="bg-gradient-to-r to-emerald-600 from-sky-400 h-0.5 rounded-full" style="width: {prg}"></div>
</div>
{#if prg != '0%'}
  <div class="flex justify-end mb-1">
    <span class="text-sm font-medium text-blue-700 dark:text-white">{prg}</span>
  </div>
{/if}