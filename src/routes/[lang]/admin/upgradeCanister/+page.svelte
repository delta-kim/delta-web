<script lang="ts">
    import { delta } from "../../../../lib/store";
    import { onMount } from "svelte";


    onMount(async () => {

    });

    function agoDays(_secs: BigInt) {
        let secs = Number(_secs);
        let day1 = 3600 * 24;
        var days = Math.floor(secs / day1);
        return `${days} days ${secs % day1} second`;
    }
    function formatDate(bi: BigInt) {
        return new Date(Number(bi) * 1000).toLocaleString();
    }


</script>

<section class="2xl:px-9 h-full flex flex-col justify-center">
    {#if $delta == null}
        <a
            href="/en/admin"
            class="btn variant-filled"
            data-sveltekit-preload-data="hover">登录</a
        >
    {:else}
        <ul class="list-disc list-inside">
            <li>upgrade Canister</li>
        </ul>
    {/if}
</section>
