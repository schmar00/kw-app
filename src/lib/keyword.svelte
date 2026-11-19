<script>
    import { formatKeyword } from './shared.svelte'
    import { distance } from 'fastest-levenshtein';
    import { onMount } from 'svelte';

    let { maxHeight = 0 } = $props();
    let selLang = $state({ tag:'en', label:'English' });
    let kwKeywords = $state({arr:[]});
    let thesLoaded = $state(false);
    let latestThesRequest = 0;

    const lang = $state([
        { tag:'cs', label:'čeština' },
        { tag:'da', label:'dansk' },
        { tag:'de', label:'Deutsch' },
        { tag:'et', label:'eesti keel' },
        { tag:'el', label:'ελληνικά' },
        { tag:'en', label:'English' },
        { tag:'es', label:'español' },
        { tag:'fr', label:'français' },
        { tag:'hr', label:'hrvatski' },
        { tag:'is', label:'íslenska' },
        { tag:'it', label:'italiano' },
        { tag:'lt', label:'lietuvių kalba' },
        { tag:'hu', label:'magyar' },
        { tag:'nl', label:'Nederlands' },
        { tag:'no', label:'norsk' },
        { tag:'pl', label:'polski' },
        { tag:'pt', label:'português' },
        { tag:'ro', label:'română' },
        { tag:'sk', label:'slovenčina' },
        { tag:'sl', label:'slovenščina' },
        { tag:'fi', label:'suomi' },
        { tag:'sv', label:'svenska' },
        { tag:'uk', label:'українська мова' }
    ]);

    const kwEndpoint = import.meta.env.DEV
        ? '/graphdb/repositories/keyword'
        : 'https://resource.geosphere.at/graphdb/repositories/keyword';
    const kwFormat = 'Accept=application%2Fsparql-results%2Bjson';

    const kwQuery = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
            SELECT DISTINCT ?uri ?l ?len (STRLEN(?l) AS ?length)
            FROM <https://data.geoscience.earth/ncl/egdi/keyword>
            WHERE {
            VALUES ?p {skos:prefLabel skos:altLabel}
            ?uri ?p ?l; skos:prefLabel ?len . FILTER(LANG(?l)='§') FILTER(LANG(?len)='en') 
            } GROUP BY ?uri ?l ?len
            ORDER BY ?length`;

    onMount(() => {
        loadThes('en');
    });

    async function loadThes(tag) {
        const request = ++latestThesRequest;
        thesLoaded = false;
        kwKeywords.arr = [];
        try {
            const res = await fetch(kwEndpoint + '?query=' + encodeURIComponent(kwQuery.replace('§', tag)) + '&' + kwFormat);
            if (!res.ok) throw new Error(`Thesaurus request failed: ${res.status}`);
            const a = await res.json();
            const keywords = a.results.bindings.map(b => ({
                label: b.l.value.toLowerCase(),
                labelEN: b.len.value,
                uri: b.uri.value
            }));
            if (request === latestThesRequest) kwKeywords.arr = keywords;
        } catch (error) {
            console.error('Failed to load keyword thesaurus:', error);
        } finally {
            if (request === latestThesRequest) thesLoaded = true;
        }
    }

    let searchTerm = $state('')

    // Handle drag start
    function handleDragStart(event) {
        //console.log(event)
        event.dataTransfer.setData("text", formatKeyword(event.srcElement.id.split('|')[0], event.srcElement.id.split('|')[1]));
    }

</script>


<div class="mt-[-8px]">
<h5 class="flex items-center text-xl font-bold dark:text-white">
    <span>Keyword Thesaurus</span>
    <!-- <span class="ml-2 inline-flex items-center rounded bg-red-400 px-2 py-0.5 text-xs font-semibold leading-none text-white align-middle">v3.0</span> -->
    {#if thesLoaded}
        <span class="ml-auto mr-2 inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-gray-600 dark:text-gray-300"
            role="status" title="Online when more than 10 keywords are loaded for the selected language">
            <span class="h-2 w-2 rounded-full {kwKeywords.arr.length > 10 ? 'bg-green-500' : 'bg-red-500'}" aria-hidden="true"></span>
            {kwKeywords.arr.length > 10 ? kwKeywords.arr.length + ' terms available' : 'offline'}
        </span>
    {/if}
</h5>
    <div class="flex">
        <div class="w-4/5">
            <input bind:value={searchTerm} type="text" id="first_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
            placeholder="search keywords in {lang.find(l => l.tag === selLang.tag)?.label ?? selLang.label} .." required />
        </div>
        <div class="ml-4 w-1/5">
            <form class="">
            <select bind:value={selLang.tag} onchange={(event) => loadThes(event.currentTarget.value)}
                id="underline_select" class="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-blue-300 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer cursor-pointer">
                {#each lang as l}
                <option value={l.tag}>{l.label}</option>
                {/each}
            </select>
            </form>
        </div>
    </div>

    <div class="overflow-y-auto" style:max-height={maxHeight ? `${maxHeight - 80}px` : '100%'}>
        {#each kwKeywords.arr.filter(a => 
            (distance(searchTerm.toLowerCase(), a.label.slice(0, searchTerm.length + 1)) < 2  
            || a.label.indexOf(searchTerm.toLowerCase()) > 0 ) 
            && searchTerm.length > 2) as k}
            <button draggable="true" ondragstart={handleDragStart} id={k.labelEN + '|' + k.uri} onclick={()=>window.open(`${k.uri}`,'_blank')}
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1 py-0 me-2 mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                {k.label}
            </button>
        {/each}
    </div>
</div>
