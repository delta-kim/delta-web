<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { t, locale } from "svelte-i18n";
  export let lang = "en";
  locale.subscribe((_lang) => {
    console.log("locale.subscribe", _lang);
    lang = _lang || "en";
  });
</script>

<svelte:head>
  <title>{$t("title_prefix")} - {$t("download")}</title>
</svelte:head>
<section
  class="2xl:px-9 h-full flex flex-col justify-center items-center py-20"
>
  <div class="flex flex-col-reverse md:flex-row">
    <figure class="flex-1 items-center">
      <img src="/img/appMain1.png" width="280" alt="delta app Home Screen" />
    </figure>
    <div class="flex flex-col justify-evenly flex-1 px-3">
      <h2 class="h2 lg:w-5/6 leading-normal font-bold">
        {$t("download_heading")}
      </h2>
      <ul class="lg:w-5/6 my-4">
        <li class="my-2">{@html $t("download_desc1")}</li>
        <li class="my-2">
          {$t("is_no_referrer_DID_yet")}，
          <a
            class="underline underline-offset-2"
            target="_blank"
            href="https://www.google.com/search?q=Delta+referrer+DID"
          >
            {$t("search_find_delta_referrer")}
          </a>
        </li>
        <li class="my-2">{$t("download_desc2")}</li>
      </ul>
      <!--
			<div class="flex flex-row justify-evenly mb-2 lg:w-5/6">
				<figure class="w-2/6">
					<a
						target="_blank"
						href="https://global.app.mi.com/details?id=kim.delta.mobile"
					>
						<img
							class="border-2 rounded-md w-full card-hover"
							src="/img/xiaomi_GetApps.png"
							alt="Xiaomi GetApps"
							title="Xiaomi GetApps"
						/>
					</a>
				</figure>
				<figure class="w-2/6">
					<a target="_blank" href="https://pub-127e19f7b07747c6b37b142adc82ba6b.r2.dev/delta_mobile_1.0.4.apk">
						<img
							style="aspect-ratio:165/61"
							class="border-2 rounded-md w-full card-hover"
							src="/img/android_apk.png"
							alt="Android apk"
							title="Android apk"
						/>
					</a>
				</figure>
			</div>
 -->
      <div class="flex flex-row items-center gap-8 mb-10">
        <figure class="mt-7">
          <a
            target="_blank"
            href={lang == "zh-CN"
              ? "https://wwrm.lanzoue.com/iqErk2x4c3pa"
              : "https://github.com/delta-kim/delta_mobile_app/releases/download/1.1.7/delta_mobile_1.1.7.apk"}
          >
            <img
              class="rounded-md w-[180px] object-contain"
              src="/img/android_apk.png"
              alt="Android apk"
              title="Android apk"
            />
          </a>
          <div style="font-size:xx-small " class="text-center">
            <a
              style="text-decoration: underline;"
              href="https://github.com/delta-kim/delta_mobile_app/releases"
              target="_blank">Version:1.1.7 Latest:2025-04-22</a
            >
          </div>
        </figure>
        <figure>
          <a
            target="_blank"
            href="https://apps.apple.com/app/delta-kim/id6738377112"
          >
            <img
              style="aspect-ratio:165/61"
              class="rounded-[20px] w-[190px] object-contain"
              src="/img/apple_store.svg"
              alt="Apple store"
              title="Apple store"
            />
          </a>
        </figure>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  figure {
    @apply flex relative flex-col;
  }
  /* figure, .img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	} */
  .img-bg {
    @apply absolute z-[-1] rounded-full blur-[50px] transition-all;
    animation:
      pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
      glow 5s linear infinite;
  }
</style>
