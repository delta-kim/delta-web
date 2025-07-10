<script lang="ts">
  import { t, locale } from "svelte-i18n";
  import type { PageData } from "./$types";

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
  <div class="gap-4 w-full lg:w-[70vw] my-10 px-2">
    <div class="bg-white w-full rounded-lg pb-10">
      <h1 class="border-b border-slate-400 px-4 py-3">Fueling</h1>
      <div class="w-full overflow-scroll">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th>S/N</th>
              <th>Hash</th>
              <th>Method</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Fee</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td
                ><a href="./fuel/123456" class="text-blue-600">DeltaCoin</a></td
              >
              <td>Transfer</td>
              <td>1 sec</td>
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td>0DTC</td>
              <td>0DTC</td>
            </tr>
            <tr>
              <td>1</td>
              <td
                ><a href="./fuel/123456" class="text-blue-600">DeltaCoin</a></td
              >
              <td>Transfer</td>
              <td>1 sec</td>
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td>0DTC</td>
              <td>0DTC</td>
            </tr>
            <tr>
              <td>1</td>
              <td
                ><a href="./fuel/123456" class="text-blue-600">DeltaCoin</a></td
              >
              <td>Transfer</td>
              <td>1 sec</td>
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td>0DTC</td>
              <td>0DTC</td>
            </tr>
            <tr>
              <td>1</td>
              <td
                ><a href="./fuel/123456" class="text-blue-600">DeltaCoin</a></td
              >
              <td>Transfer</td>
              <td>1 sec</td>
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td>0DTC</td>
              <td>0DTC</td>
            </tr>
            <tr>
              <td>1</td>
              <td
                ><a href="./fuel/123456" class="text-blue-600">DeltaCoin</a></td
              >
              <td>Transfer</td>
              <td>1 sec</td>
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td>0DTC</td>
              <td>0DTC</td>
            </tr>
            <tr>
              <td>1</td>
              <td
                ><a href="./fuel/123456" class="text-blue-600">DeltaCoin</a></td
              >
              <td>Transfer</td>
              <td>1 sec</td>
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td
                ><a href="./account/123456" class="text-blue-600">DeltaCoin</a
                ></td
              >
              <td>0DTC</td>
              <td>0DTC</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  th,
  td {
    @apply py-2 px-4 text-left;
  }
  tr {
    @apply border-b border-slate-200;
  }
</style>
