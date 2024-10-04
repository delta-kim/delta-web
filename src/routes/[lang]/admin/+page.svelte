<script lang="ts">
    import { AuthClient } from "@dfinity/auth-client";
    import { createActor } from '../../../declarations/delta/index';
    // import { t } from 'svelte-i18n';


    let mainCanisterId = 'be2us-64aaa-aaaaa-qaabq-cai';
    let host = 'http://192.168.137.1:8000';

    async function login() {
        console.log("login");
        const authClient = await AuthClient.create();
        await new Promise((resolve, reject) => {
            authClient.login({
                identityProvider: "http://aovwi-4maaa-aaaaa-qaagq-cai.localhost:8000/",
                onSuccess: resolve,
                onError: reject,
            });
        });

        const identity = authClient.getIdentity();
        const actor = await createActor(mainCanisterId, { agentOptions: { host , identity} });
        console.log("actor.whoami");
        const principal = await actor.whoami();
        console.log(principal);
    }
</script>

<section class="2xl:px-9 h-full flex flex-col justify-center items-center">
    ADMIN
    <button on:click={login}>登录</button>
</section>
