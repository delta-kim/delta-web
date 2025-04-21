<script lang="ts">
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  export let data: PageData;
  onMount(() => {
    console.log("faq", data);
  });
</script>

<div class="mx-4 sm:mx-8 xl:mx-80 py-10 px-5 md:px-0">
  <h1 class="h1">{$t("faq")}</h1>
  <Accordion autocollapse class="card p-4 my-4 text-token">
    {#each data.items as group}
      <AccordionItem>
        <svelte:fragment slot="summary">
          <h5 class="h5">{group[0].text}</h5>
        </svelte:fragment>
        <svelte:fragment slot="content">
          <div style="background-color: #ffffff80;" class="p-3 rounded-md">
            {@html group[1].text}
          </div>
        </svelte:fragment>
      </AccordionItem>
    {/each}
  </Accordion>
</div>
