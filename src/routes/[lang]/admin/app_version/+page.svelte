<script lang="ts">
    import { delta } from "../../../../lib/store";
    import { onMount } from "svelte";

    let androidVersion = {
        apk: "",
        version: "",
        store: "",
    };
    let iosVersion = {
        version: "",
        store: "",
    };

    onMount(async () => {
        if ($delta != null) {
            let androidData = await $delta.getMobileApplastVersion({
                android: null,
            });

            androidVersion = androidData["android"];
            console.log(androidVersion);
            let iosData = await $delta.getMobileApplastVersion({
                ios: null,
            });
            iosVersion = iosData["ios"];
            console.log(iosVersion);
        }
    });

    async function updateVersions() {
        let MobileApplastVersions = [
            { android: androidVersion },
            { ios: iosVersion },
        ];
        try {
            if (window.confirm("Are you sure to submit?")) {
                let bool = await $delta.updateMobileApplastVersion(
                    MobileApplastVersions,
                );
                alert(`执行结果: ${bool}`);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
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
            <li>
                android:
                <ul class="list-inside ml-8">
                    <li>
                        <label class="label">
                            <span>version</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="version"
                                bind:value={androidVersion.version}
                            />
                        </label>
                    </li>
                    <li>
                        <label class="label">
                            <span>store url</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="store url"
                                bind:value={androidVersion.store}
                            />
                        </label>
                    </li>
                    <li>
                        <label class="label">
                            <span>apk url</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="apk url"
                                bind:value={androidVersion.apk}
                            />
                        </label>
                    </li>
                </ul>
            </li>
            <li>
                ios:
                <ul class="list-inside ml-8">
                    <li>
                        <label class="label">
                            <span>version</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="version"
                                bind:value={iosVersion.version}
                            />
                        </label>
                    </li>
                    <li>
                        <label class="label">
                            <span>store url</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="store url"
                                bind:value={iosVersion.store}
                            />
                        </label>
                    </li>
                </ul>
            </li>
            <li class="pt-4">
                <button class="btn variant-filled" on:click={updateVersions}
                    >更新</button
                >
            </li>
        </ul>
    {/if}
</section>
