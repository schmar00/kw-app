export let allKeywords = $state({arr:[]});

export let kwFormat = $state({
    groupedOutput: true,
    labelOutput: true,
    uriOutput: true,
    pathOutput: false
});

export function formatKeyword(label, uri){
    return ` ◍ ${kwFormat.labelOutput?label:''}${kwFormat.uriOutput?(' (' + (kwFormat.pathOutput?uri:uri.split('\/').pop()) + ')'):''}`
  }
 