<script>
	import { allKeywords } from './shared.svelte'
	import { onMount } from 'svelte';
  import keyword_extractor from 'keyword-extractor';

	const spEndpoint = 'https://resource.geosphere.at/graphdb/repositories/WP9-TEST';
  const spFormat = 'Accept=application%2Fsparql-results%2Bjson';

  const spQuery = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        SELECT DISTINCT ?uri ?p ?l (STRLEN(?l) AS ?len)
        (GROUP_CONCAT(DISTINCT ?t; separator=";") AS ?topic)
        FROM <https://data.geoscience.earth/ncl/geoera/keyword>
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

  const extractExceptions = ['well'];
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


<h2 class="mb-4 text-3xl font-thin text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent font-extrabold bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">keyword</span> assistent</h2>
<p class="text-base font-normal text-gray-500 lg:text-base dark:text-gray-400">
  For automatic keywording using the "<strong>GeoERA Keyword Thesaurus v2.2</strong>", you can load a CSV file or copy it directly into the text field. Keywords (in English) are appended to the text lines “tab-delimited” with numbers or URIs by clicking "add keywords", depending on the configuration. Keywords can also be searched for manually (on the right-hand side of the page) and added to the text field using drag and drop. The result can then be saved as a CSV file (tab-delimited).
</p>
