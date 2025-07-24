<script lang="ts">
  import { t, locale } from "svelte-i18n";

  import type { PageData } from "./$types";
  import { TabAnchor } from "@skeletonlabs/skeleton";

  export let data: PageData;

  export let lang = data.lang;
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("explore")}</title>
</svelte:head>
<div
  class="container mx-auto h-full flex flex-col justify-center items-center pb-10"
>
  <div class="gap-4 w-full md:w-[50vw] my-10 px-2">
    <div class="bg-white w-full rounded-lg pb-10">
      <h1 class="border-b border-slate-400 px-4 py-3">Fuel</h1>
      <div class="text-[14px] text-slate-500">
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Hash</p>
          <p>234567809876543456</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Type</p>
          <p>Fuel</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Status</p>
          <p>Completed</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Index</p>
          <p>0</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Timestamp</p>
          <p>{new Date().toISOString()}</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">From</p>
          <p>
            <TabAnchor href="./account/123456" class="text-blue-600"
              >DeltaCoin</TabAnchor
            >
          </p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">To</p>
          <p>
            <TabAnchor href="./account/123456" class="text-blue-600"
              >DeltaCoin</TabAnchor
            >
          </p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Amount</p>
          <p>0ICP</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Fee</p>
          <p>0ICP</p>
        </div>
        <div
          class="flex justify-between items-center border-b border-slate-400 text-md font-[400] py-2 px-4"
        >
          <p class="flex-2 font-bold text-black">Memo</p>
          <p>0</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
</style>
