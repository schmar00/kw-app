<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import "./app.css";
  import Title from './lib/title.svelte';
  import KeywordStyle from "./lib/keywordStyle.svelte";
  import Keyword from './lib/keyword.svelte';
  import Textarea from './lib/textarea.svelte';

  let textareaPanel;
  let textareaPanelHeight = $state(0);

  onMount(() => {
    const updateHeight = () => {
      textareaPanelHeight = textareaPanel.getBoundingClientRect().height;
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(textareaPanel);
    updateHeight();
    return () => observer.disconnect();
  });

</script>
<div class="grid grid-cols-12 gap-3">
  <div class="col-span-12 lg:col-span-8"><Title /></div>
  <div class="col-span-12 lg:col-span-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"><KeywordStyle /></div>

  <div class="col-span-12 lg:col-span-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"><div bind:this={textareaPanel}><Textarea /></div></div>
  <div class="col-span-12 lg:col-span-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"><Keyword maxHeight={textareaPanelHeight} /></div>
</div>


 <footer class="">
  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-blue-500 sm:text-center dark:text-blue-300">
            <span class="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} </span>
            <a href="https://europe-geology.eu" class="hover:underline">EGDI</a> - 
            <a href="https://www.geosphere.at" class="hover:underline">GeoSphere Austria</a>
          </span>
          <span class="inline-flex items-center gap-2 text-sm text-gray-500 sm:text-center dark:text-gray-400">v3.0&nbsp;&nbsp;-
            <a href="https://doi.org/10.5281/zenodo.24008644" target="_blank" title="Thesaurus RDF File" class="hover:underline text-sm text-blue-500 dark:text-blue-300">10.5281/zenodo.24008644</a>


              <!-- <a href="https://doi.org/10.5281/zenodo.24008644" target="_blank" title="Thesaurus RDF File" ><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.24008644.svg" alt="DOI" class="origin-left scale-[0.9] grayscale brightness-150 dark:brightness-50 mb-[-2px]"></a> -->
          </span>

          <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://github.com/schmar00/kw-app" target="_blank" title="GitHub Source Code" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://data.geoscience.earth/ncl/egdi/keyword" target="_blank" title="European Geoscience Registry" class="text-gray-500 hover:text-gray-900 dark:hover:text-white font-[1000] m-[-2px]">EGR&nbsp;&nbsp;</a>
              <!-- <a href="https://geusgitlab.geus.dk" title="GitLab GEUS" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <g>
                      <path fill-rule="evenodd" />
                      <path d="M5.868 2.75L8 10h8l2.132-7.25a.4.4 0 0 1 .765-.01l3.495 10.924a.5.5 0 0 1-.173.55L12 22 1.78 14.214a.5.5 0 0 1-.172-.55L5.103 2.74a.4.4 0 0 1 .765.009z"/>
                  </g>
                  </svg>
                  <span class="sr-only">GitLab GEUS</span>
              </a> -->
              <!-- <a href="https://geuscloud.geus.dk/index.php" title="NextCloud GEUS" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 193 166">
                    <g>
                      <path d="M63.9,93.9c6.5,16.9,18,27.3,36.3,27.3c18.3,0.1,29.7-10.3,36.4-27.1c5.9,9.9,14.1,15.3,25.5,13.6 c11.1-1.7,17.8-8.9,21-19.6c0,0.9,0.1,1.7,0.1,2.6c0,23.3,0,46.5,0,69.8c0,0.6,0,1.2,0,1.7c-0.3,4-0.8,4.4-4.8,4.4 c-52.3,0-104.7,0-157,0c-3.3,0-3.6-0.2-4.1-3.5c-0.1-0.7-0.1-1.5-0.1-2.2c0-23.6,0-47.2,0-70.8c0-0.7,0.1-1.3,0.2-2.1 c3.1,10.9,9.8,18.1,21.1,19.7C49.8,109.4,58,103.9,63.9,93.9z"/>
                      <path d="M183.2,78.5c-5.8-22.6-34.7-27.8-46.7-6.2c-6.6-16.6-18-27-36.3-26.9c-18.3,0-29.7,10.4-36.3,27.3 c-5.9-9.9-14-15.5-25.4-13.8c-11.3,1.6-18,8.8-21.1,20.3c-0.1-1-0.2-1.4-0.3-1.8c0-0.4,0-0.8,0-1.2c0-23.3,0-46.7,0-70 c0-0.3,0-0.7,0-1c0.2-4.5,0.8-5,5.2-5c52.2,0,104.3,0,156.5,0c3.4,0,3.8,0.3,4.3,3.6c0.1,0.8,0.1,1.7,0.1,2.5c0,23.3,0,46.5,0,69.8 C183.2,76.8,183.2,77.6,183.2,78.5z"/>
                      <path d="M100.3,59.7c13.1,0,23.3,10.2,23.3,23.5c0.1,13.3-10.1,23.6-23.4,23.7c-13,0-23.3-10.3-23.4-23.5 C76.8,70.1,87.1,59.7,100.3,59.7z"/>
                      <path d="M168.8,83.3c0,5.7-4.7,10.4-10.3,10.4c-5.6,0-10.2-4.8-10.2-10.5c0.1-5.6,4.6-10.2,10.1-10.2 C164,72.9,168.8,77.7,168.8,83.3z"/>
                      <path d="M31.4,83.2c0.1-5.7,4.8-10.3,10.4-10.3C47.4,73,52,77.8,51.9,83.5c-0.1,5.6-4.7,10.2-10.2,10.2 C36.1,93.7,31.4,88.9,31.4,83.2z"/>
                    </g>
                  </svg>
                  <span class="sr-only">NextCloud GEUS</span>
              </a> -->
              <!-- <a href="none" title="LinkedIn EGDI" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 33 33">
                    <path d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"></path>
                  </svg>
                  <span class="sr-only">LinkedIn</span>
              </a> -->
              <!-- <a href="https://zenodo.org/records/24008644" target="_blank" title="Zenodo" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-11 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 183.8 64.4" style="enable-background:new 0 0 183.8 64.4;" xml:space="preserve">
                  <style type="text/css">
                    .st0{fill:currentColor;}
                    .st1{fill:#FFFFFF;}
                  </style>
                  <path class="st0" d="M7.1,0h169.5c3.9,0,7.1,3.2,7.1,7.1v50.1c0,3.9-3.2,7.1-7.1,7.1H7.1c-3.9,0-7.1-3.2-7.1-7.1V7.1
                    C0,3.2,3.2,0,7.1,0z"/>
                  <g>
                    <g>
                      <g>
                        <path class="st1" d="M164,25.3c-0.7-1.6-1.7-3-2.8-4.2c-1.2-1.2-2.6-2.1-4.2-2.8c-1.6-0.7-3.3-1-5.1-1s-3.6,0.3-5.1,1
                          c-0.8,0.3-1.5,0.7-2.2,1.2s-1.4,1-2,1.6c-0.4,0.4-0.7,0.8-1.1,1.2c-0.4,0.5-0.8,1.1-1,1.4c-0.3,0.5-1,1.9-1.3,2.8
                          c0-1.6,0.3-4.1,1.3-5.5V9.2c0-0.8-0.3-1.4-0.8-2c-0.6-0.5-1.2-0.8-1.9-0.8c-0.8,0-1.4,0.3-2,0.8c-0.5,0.5-0.8,1.2-0.8,2v10.6
                          c-1.1-0.8-2.3-1.4-3.6-1.8c-1.3-0.4-2.6-0.7-4-0.7c-1.8,0-3.5,0.3-5.1,1c-1.6,0.7-3,1.6-4.2,2.8c-1.2,1.2-2.1,2.6-2.8,4.2
                          c-0.1,0.1-0.1,0.2-0.2,0.4c0-0.1-0.1-0.2-0.1-0.4c-0.7-1.6-1.7-3-2.8-4.2c-1.2-1.2-2.6-2.1-4.2-2.8c-1.6-0.7-3.3-1-5.1-1
                          c-1.8,0-3.6,0.3-5.1,1c-1.6,0.7-3,1.6-4.2,2.8s-2.2,2.6-2.8,4.2c0,0.1-0.1,0.2-0.1,0.3c0-0.1-0.1-0.2-0.1-0.3
                          c-0.7-1.6-1.7-3-2.8-4.2c-1.2-1.2-2.6-2.1-4.2-2.8c-1.6-0.7-3.3-1-5.1-1s-3.6,0.3-5.1,1c-1.6,0.7-3,1.6-4.2,2.8
                          c-1.2,1.2-2.2,2.6-2.8,4.2c0,0.1-0.1,0.2-0.1,0.3c0-0.1-0.1-0.2-0.1-0.3c-0.7-1.6-1.7-3-2.8-4.2c-1.2-1.2-2.6-2.1-4.2-2.8
                          c-1.6-0.7-3.3-1-5.1-1s-3.6,0.3-5.1,1c-1.5,0.6-2.8,1.5-3.9,2.6v-0.4c0-1.6-1.3-2.8-2.8-2.8H21.9c-1.6,0-2.8,1.3-2.8,2.8
                          c0,1.6,1.3,2.8,2.8,2.8h15.5L19.2,47.8c-0.4,0.5-0.6,1.1-0.6,1.7v1.8c0,1.6,1.3,2.8,2.8,2.8h21c1.5,0,2.7-1.2,2.8-2.6
                          c0.9,0.7,2,1.4,3.1,1.8c1.6,0.7,3.3,1,5.1,1c2.7,0,5.2-0.7,7.3-2.2c1.7-1.2,3.1-2.6,4.1-4.4v3.8c0,0.8,0.3,1.4,0.8,2
                          c0.5,0.5,1.2,0.8,2,0.8c0.7,0,1.4-0.3,1.9-0.8c0.6-0.5,0.8-1.2,0.8-2v-9.9l0,0l0,0c0,0-6.1,0-6.9,0c-0.6,0-1.1,0.2-1.6,0.5
                          s-0.8,0.7-1,1.3l-0.5,0.9c-0.6,1.4-1.6,2.4-2.8,3.2s-2.6,1.2-4.2,1.2c-1,0-2-0.2-3-0.6c-0.9-0.4-1.8-0.9-2.4-1.6
                          c-0.7-0.7-1.2-1.5-1.6-2.4c-0.4-0.9-0.6-1.9-0.6-2.9v-2.5h17.7h1.3h5.5v-8.4c0-1,0.2-2,0.6-2.9s0.9-1.7,1.6-2.4
                          c0.7-0.7,1.5-1.2,2.4-1.6s1.9-0.6,3-0.6c1,0,2,0.2,3,0.6c0.9,0.4,1.8,0.9,2.4,1.6c0.7,0.7,1.2,1.5,1.6,2.4s0.6,1.9,0.6,2.9v21.2
                          c0,0.8,0.3,1.4,0.8,2c0.5,0.5,1.2,0.8,2,0.8c0.7,0,1.4-0.3,1.9-0.8c0.6-0.5,0.8-1.2,0.8-2v-3.8c0.6,1,1.3,1.9,2.1,2.7
                          c1.2,1.2,2.6,2.1,4.2,2.8s3.3,1,5.1,1c1.8,0,3.5-0.3,5.1-1s3-1.6,4.2-2.8s2.2-2.6,2.8-4.2c0-0.1,0.1-0.2,0.1-0.3
                          c0,0.1,0.1,0.2,0.1,0.3c0.7,1.6,1.6,3,2.8,4.2c1.2,1.2,2.6,2.1,4.2,2.8s3.3,1,5.1,1c1.8,0,3.5-0.3,5.1-1c1.6-0.7,3-1.6,4.2-2.8
                          s2.1-2.6,2.8-4.2c0.1-0.1,0.1-0.2,0.1-0.4c0,0.1,0.1,0.2,0.1,0.4c0.7,1.6,1.7,3,2.8,4.2c1.2,1.2,2.6,2.1,4.2,2.8
                          c1.6,0.7,3.3,1,5.1,1s3.5-0.3,5.1-1s3-1.6,4.2-2.8s2.2-2.6,2.8-4.2c0.7-1.6,1-3.3,1-5.1V30.4C165,28.6,164.7,26.9,164,25.3z
                          M25.7,48.5l14.8-19.9c-0.1,0.6-0.1,1.2-0.1,1.8v10.9c0,1.8,0.4,3.5,1.1,5.1c0.3,0.8,0.7,1.5,1.2,2.1l0,0L25.7,48.5L25.7,48.5z
                          M61.2,33.3H45.9v-2.8c0-1,0.2-2,0.6-2.9c0.4-0.9,0.9-1.7,1.6-2.4c0.7-0.7,1.5-1.2,2.4-1.6s1.9-0.6,3-0.6c1,0,2,0.2,2.9,0.6
                          s1.8,0.9,2.4,1.6c0.7,0.7,1.2,1.5,1.6,2.4c0.4,0.9,0.6,1.9,0.6,2.9C61.2,30.4,61.2,33.3,61.2,33.3z M110.4,41.3
                          c0,1-0.2,2-0.6,2.9s-0.9,1.7-1.6,2.4s-1.5,1.2-2.4,1.6c-0.9,0.4-1.9,0.6-3,0.6c-1,0-2-0.2-3-0.6c-0.9-0.4-1.8-0.9-2.4-1.6
                          c-0.7-0.7-1.2-1.5-1.6-2.4s-0.6-1.9-0.6-2.9V30.4c0-1,0.2-2,0.6-2.9s0.9-1.7,1.6-2.4c0.7-0.7,1.5-1.2,2.4-1.6s1.9-0.6,3-0.6
                          c1,0,2,0.2,2.9,0.6c1,0.4,1.8,0.9,2.4,1.6c0.7,0.7,1.2,1.5,1.6,2.4s0.6,1.9,0.6,2.9C110.4,30.4,110.4,41.3,110.4,41.3z
                          M134.9,41.3c0,1-0.2,2-0.6,2.9c-0.4,0.9-1,1.7-1.6,2.4c-0.7,0.7-1.5,1.2-2.4,1.6c-0.9,0.4-1.9,0.6-2.9,0.6c-1.1,0-2.1-0.2-3-0.6
                          c-0.9-0.4-1.7-0.9-2.4-1.6c-0.7-0.7-1.3-1.5-1.6-2.4s-0.6-1.9-0.6-2.9V30.4c0-1,0.2-2,0.6-2.9s1-1.7,1.6-2.4
                          c0.7-0.7,1.5-1.2,2.4-1.6c1-0.4,1.9-0.6,3-0.6c1.1,0,2.1,0.2,3,0.6c0.9,0.4,1.7,0.9,2.4,1.6c0.7,0.7,1.3,1.5,1.6,2.4
                          c0.4,0.9,0.6,1.9,0.6,2.9L134.9,41.3L134.9,41.3z M159.5,41.3c0,1-0.2,2-0.6,2.9c-0.4,0.9-0.9,1.7-1.6,2.4
                          c-0.7,0.7-1.5,1.2-2.4,1.6c-0.9,0.4-1.9,0.6-3,0.6c-1,0-2-0.2-3-0.6c-0.9-0.4-1.8-0.9-2.4-1.6c-0.7-0.7-1.2-1.5-1.6-2.4
                          s-0.6-1.9-0.6-2.9V30.4c0-1,0.2-2,0.6-2.9c0.4-0.9,0.9-1.7,1.6-2.4c0.7-0.7,1.5-1.2,2.4-1.6s1.9-0.6,3-0.6c1,0,2,0.2,2.9,0.6
                          s1.8,0.9,2.4,1.6c0.7,0.7,1.2,1.5,1.6,2.4c0.4,0.9,0.6,1.9,0.6,2.9L159.5,41.3L159.5,41.3z"/>
                      </g>
                    </g>
                  </g>
                  </svg>
                  <span class="sr-only">Zenodo</span>
              </a> -->
          </div>
      </div>
 </footer>