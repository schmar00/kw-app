<script>
    import { kwFormat } from './shared.svelte'   

</script>



<div class="grid grid-cols-2 gap-x-4 gap-y-2">

<div class="flex">
    <div class="flex items-center h-5">
        <input id="checked-checkbox" bind:checked={kwFormat.groupedOutput} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="checked-checkbox" class="font-medium text-gray-900 dark:text-gray-300">group keywords</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">rather than duplicating the entire line per keyword</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="label" bind:checked={kwFormat.labelOutput} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="label" class="font-medium text-gray-900 dark:text-gray-300">keyword label</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">include keyword labels in the output</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="uri" bind:checked={kwFormat.uriOutput} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="uri" class="font-medium text-gray-900 dark:text-gray-300">keyword ID</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">include keyword IDs in the output</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="path" bind:checked={kwFormat.pathOutput} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="path" class="font-medium text-gray-900 dark:text-gray-300">include URI</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">include the full URI in the output</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="detailed" bind:checked={kwFormat.detailed} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="detailed" class="font-medium text-gray-900 dark:text-gray-300">most detailed terms</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">prefer compound terms for keywording</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="significant" bind:checked={kwFormat.significant} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="significant" class="font-medium text-gray-900 dark:text-gray-300">significant terms only</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">skip generic or ambiguous keywords (~100)</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="specific" bind:checked={kwFormat.specific} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="specific" class="font-medium text-gray-900 dark:text-gray-300">topics (EuroSciVoc)</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">add geoscience categories from EuroSciVoc</p>
    </div>
</div>

<div class="flex">
    <div class="flex items-center h-5">
        <input id="geonames" bind:checked={kwFormat.geonames} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <div class="ms-2 text-sm">
        <label for="geonames" class="font-medium text-gray-900 dark:text-gray-300">country (GeoNames)</label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500 dark:text-gray-300">add matching country names of Europe</p>
    </div>
</div>

</div>



<!-- <div class="m-6 flex">

  <div>
    <ul class="w-auto text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li class="w-full pl-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <input id="checked-checkbox" bind:checked={kwFormat.groupedOutput} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="checked-checkbox" class="mr-2 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">grouped keywords</label>
      </li>
      <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <input id="label" bind:checked={kwFormat.labelOutput} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="label" class="w-full py-1 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">keyword label</label>
      </li>
      <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <input id="uri" bind:checked={kwFormat.uriOutput} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="uri" class="w-full py-1 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">keyword ID</label>
      </li>
      <li class="w-full px-4 py-2 rounded-b-lg">
        <input id="path" bind:checked={kwFormat.pathOutput} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="path" class="w-full py-1 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">incl. URI</label>
      </li>
    </ul>
  </div>

  <div class="ml-2">
    <ul class="w-auto text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li class="w-full pl-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <input id="detailed" bind:checked={kwFormat.detailed} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="detailed" class="mr-2 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">most detailed terms only</label>
      </li>
      <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <input id="significant" bind:checked={kwFormat.significant} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="significant" class="w-full py-1 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">significant terms only</label>
      </li>
      <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <input id="specific" bind:checked={kwFormat.specific} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="specific" class="w-full py-1 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">topics (EuroSciVoc)</label>
      </li>
      <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <input id="geonames" bind:checked={kwFormat.geonames} type="checkbox" value="" class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="geonames" class="w-full py-1 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">country (GeoNames)</label>
      </li>
    </ul>
  </div>
</div> -->




