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

<svelte:head>
  <title>{$t("title_prefix")} - {$t("support")}</title>
</svelte:head>
<div
  class="flex-auto w-full h-full flex flex-col md:flex-row gap-8 px-4 xl:px-20"
>
  <aside
    id="sidebar-left"
    class="md:sticky md:top-0 md:w-1/3"
    style="display: block; height: min-content"
  >
    <h1 class="h1 my-4 text-center">{$t("support")}</h1>
    <ul class="toc-list space-y-2 pl-10">
      <li class="toc-list-item block h3">
        <a
          href="#read_FAQs"
          class="toc-anchor text-ellipsis overflow-hidden"
          style="display: inline-block;"
          >1. {$t("read_faqs")}
        </a>
      </li>
      <li class="toc-list-item block h3">
        <a
          href="#contact_via_email"
          class="toc-anchor text-ellipsis overflow-hidden"
          style="display: inline-block;"
          >2. {$t("contact_via_email")}
        </a>
      </li>
    </ul>
  </aside>
  <div class="container px-1 h-full mx-auto flex flex-col justify-center">
    <h2 class="h2 mt-10" id="read_FAQs">{$t("read_faqs")}</h2>
    <Accordion autocollapse class="card p-4 my-4 text-token">
      {#each data.items as group}
        <AccordionItem>
          <svelte:fragment slot="summary">
            <h5 class="h5">{group[0].text}</h5>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <div style="background-color: #ffffff80;" class="p-2">
              {@html group[1].text}
            </div>
          </svelte:fragment>
        </AccordionItem>
      {/each}
    </Accordion>
    <h2 class="h2 mt-10" id="contact_via_email">Discord support</h2>
    <div class="card p-4 my-4">
      <article>Community support has moved to Discord</article>
      <a
        href="https://discord.com/invite/fw7mTD8Gha"
        target="_blank"
        class="text-md font-medium md:h3 mt-10 md:font-bold underline"
        >https://discord.com/invite/fw7mTD8Gha</a
      >
    </div>
    <h3 class="h2 mt-10" id="contact_via_email">
      {$t("contact_via_email")}
    </h3>
    <div class="card p-4 my-4">
      <div class="mb-2">
        <article>
          Please send any community link you'd like us to add to our website
          communities list to the email below.
        </article>
        <a
          href="mailto:socio@delta.kim"
          target="_blank"
          class="text-md font-medium md:h3 mt-10 md:font-bold underline"
          >socio@delta.kim</a
        >
      </div>
      <div class="mb-2">
        <article>
          Advertising cooperation. Please send email to the address below.
        </article>
        <a
          href="mailto:delta.ad.cooperation@gmail.com"
          target="_blank"
          class="text-md font-medium md:h3 mt-10 md:font-bold underline"
          >delta.ad.cooperation@gmail.com</a
        >
      </div>
    </div>
  </div>
</div>
