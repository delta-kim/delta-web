<script lang="ts">
    import { AuthClient } from "@dfinity/auth-client";
    // import { t } from 'svelte-i18n';

    async function login() {
        console.log("login");
        const authClient = await AuthClient.create();
        await new Promise((resolve, reject) => {
            authClient.login({
                //identityProvider: iiUrl,
                onSuccess: resolve,
                onError: reject,
            });
        });

        const identity = authClient.getIdentity();
        console.log("identity", identity);
    }
</script>

<section class="2xl:px-9 h-full flex flex-col justify-center items-center">
    ADMIN
    <button on:click={login}>登录</button>
</section>
