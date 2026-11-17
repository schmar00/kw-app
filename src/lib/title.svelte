<script>
	import { allKeywords } from './shared.svelte'
	import { onMount } from 'svelte';
  import keyword_extractor from 'keyword-extractor';
  import gifmovie from '/src/kwapp720.gif';

	const spEndpoint = import.meta.env.DEV
    ? '/graphdb/repositories/keyword'
    : 'https://resource.geosphere.at/graphdb/repositories/keyword';
  const spFormat = 'Accept=application%2Fsparql-results%2Bjson';

  const spQuery = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        SELECT DISTINCT ?uri ?p ?l (STRLEN(?l) AS ?len)
        (GROUP_CONCAT(DISTINCT ?t; separator=";") AS ?topic)
        FROM <https://data.geoscience.earth/ncl/egdi/keyword>
        FROM <https://topic>
        WHERE {
        VALUES ?p {skos:prefLabel skos:altLabel}
        ?uri ?p ?l . FILTER(LANG(?l)='en') 
        OPTIONAL {?uri foaf:primaryTopic ?t}
        } GROUP BY ?uri ?p ?l
        ORDER BY DESC (?len)`;

	onMount(() => {
    fetch(spEndpoint + '?query=' + encodeURIComponent(spQuery) + '&' + spFormat)
      .then(res => res.json())
      .then(a => allKeywords.arr = (a.results.bindings.map(b => ({
        label: b.l.value.toLowerCase(),
        newLabelArr: kwExtract(b.l.value, true),
        uri: b.uri.value,
        len: b.len.value,
        topic: b.topic.value
      }))))
      .then(a=>console.log(allKeywords.arr));
  });	

  const extractExceptions = ['well', 'causes'];
    function kwExtract(text, thes){
        text = text.replace(/\_|\"|\-|\.|\:|\//g,' ').toLowerCase();
        let someExist = extractExceptions.some(word => text.split(' ').includes(word));
        let kArr = keyword_extractor.extract(text, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
        })
        // if keyword of thesaurus then without extraction
        return someExist ? thes ? text.split(' ') : text.split(' ').concat(kArr) : kArr;
    }

</script>


<div class="mb-4 ml-6 mt-4 flex w-full items-center justify-between gap-4">
<h2 class="min-w-0 text-3xl font-thin text-gray-900 dark:text-white md:text-5xl lg:text-6xl">

<!-- <svg class="inline-block align-middle mr-2" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" role="img" aria-labelledby="title">
  <title id="title">Tags</title>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="112" height="112" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0f172a" flood-opacity=".3"/>
    </filter>
  </defs>
  <rect x="8" y="7" width="80" height="80" rx="20" fill="url(#background)" filter="url(#shadow)"/>
  <path
    transform="translate(80 16) scale(-2 2)"
    fill="#fff"
    d="M 14.59375 4 L 14.28125 4.28125 L 3.28125 15.28125 L 2.59375 16 L 3.28125 16.71875 L 12.28125 25.71875 L 13 26.40625 L 13.71875 25.71875 L 24.71875 14.71875 L 25 14.40625 L 25 4 Z M 15.4375 6 L 23 6 L 23 13.5625 L 13 23.5625 L 5.4375 16 Z M 26 7 L 26 9 L 27 9 L 27 17.15625 L 17.5 26.59375 L 16.25 25.34375 L 14.84375 26.75 L 16.78125 28.71875 L 17.5 29.40625 L 18.1875 28.71875 L 28.71875 18.3125 L 29 18 L 29 7 Z M 20 8 C 19.449219 8 19 8.449219 19 9 C 19 9.550781 19.449219 10 20 10 C 20.550781 10 21 9.550781 21 9 C 21 8.449219 20.550781 8 20 8 Z"
  />
</svg> -->

  <span class="text-transparent font-extrabold bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
    keyword
  </span> 
  assistant
</h2>
</div>

<div class="text-base font-normal text-gray-500 mx-1 min-[400px]:ml-6 min-[400px]:mr-8 lg:text-base lg:mx-8 lg:ml-8 dark:text-gray-400">
Use the "<strong>EGDI Keyword Thesaurus</strong>" to generate keywords automatically in English.
You can either load data from a CSV text file or paste it directly into the text field. Depending on your settings, clicking "add keywords" will append the English keywords to each line of text, tab‑delimited by either numeric indices or URIs.
You also have the option to search for keywords manually on the right‑hand panel and drag them into the text field. Once processing is complete, export the result as a tab‑delimited CSV file.
 <span class="inline-flex">
    <details class="text-blue-600 dark:text-blue-300 hover:font-extrabold cursor-pointer">
      <summary class="relative top-[5px] inline-flex list-none items-center gap-1">
        <span class="h-6 w-6 bg-blue-500" aria-hidden="true" style="mask: url('{import.meta.env.BASE_URL}video-clip-svgrepo-com.svg') center / contain no-repeat; -webkit-mask: url('{import.meta.env.BASE_URL}video-clip-svgrepo-com.svg') center / contain no-repeat;"></span>
        Here’s how to
      </summary>
      <img class="rounded-t-lg" src={gifmovie} alt="" />
    </details>
  </span><br>
  This app runs in your browser and identifies keywords through simple text matching. Depending on the available processing power, it can be used e.g. to tag all descriptions of a catalog in a single pass.
</div>

<style>
  summary::-webkit-details-marker {
    display: none;
  }
</style>


