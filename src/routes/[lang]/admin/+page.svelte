<script lang="ts">
    import { AuthClient } from "@dfinity/auth-client";
    import { createActor } from "../../../declarations/delta/index";
    import { onMount } from "svelte";
    // import { t } from 'svelte-i18n';
    import { principal, delta } from "../../../lib/store";
    import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";

    let mainCanisterId = "be2us-64aaa-aaaaa-qaabq-cai";
    let host = "http://192.168.137.1:8000";

    let pemKeyString = "";

    async function login() {
        console.log("login");
        // const authClient = await AuthClient.create();
        // await new Promise((resolve, reject) => {
        //     authClient.login({
        //         identityProvider:
        //             "http://aovwi-4maaa-aaaaa-qaagq-cai.localhost:8000/",
        //         onSuccess: resolve,
        //         onError: reject,
        //     });
        // });

        // const identity = authClient.getIdentity();
        if (pemKeyString.startsWith("-----BEGIN EC PRIVATE KEY-----") == false)
            return alert("Please enter a valid pemKey");

        let identity = Secp256k1KeyIdentity.fromPem(pemKeyString);

        const actor = await createActor(mainCanisterId, {
            agentOptions: { host, identity },
        });
        delta.set(actor);
        let _principal = await actor.whoami();
        principal.set(_principal);
        localStorage.setItem("pemKeyString", pemKeyString);
    }

    onMount(async () => {
        pemKeyString = localStorage.getItem("pemKeyString") || "";
        console.log("principal", $principal);
    });
</script>

<section class="2xl:px-9 h-full flex flex-col justify-center items-center">
    <div>Welcome !</div>
    {#if $delta == null}
        <div>
            
            <label class="label">
                <div>pemKey</div>
                <textarea bind:value={pemKeyString} rows="3" cols="50"></textarea>
            </label>
            <button class="btn variant-filled" on:click={login}>登录</button>
        </div>
    {:else}
        <div>principal : {$principal}</div>
    {/if}
</section>
