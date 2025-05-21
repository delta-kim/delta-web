<script lang="ts">
    import { delta } from "../../../../lib/store";
    import { onMount } from "svelte";

    interface AccessNumberObj {
        did: string;
        accessNumber: string;
        carrier: string;
        expiration: bigint;
        online: bigint;
        reqNum: bigint;
        rewards: bigint;
        succNum: bigint;
    }
    let accessNumberList: AccessNumberObj[] = [];
    onMount(async () => {
        if ($delta != null) {
            let accessNumberRecordAgrsAndTip =
                await $delta.filterOptionalAccessNumbers2("global");
            for (const row of accessNumberRecordAgrsAndTip.record) {
                accessNumberList.push({
                    did: row.did,
                    accessNumber: row.accessNumber,
                    carrier: row.carrier,
                    expiration: row.expiration,
                    online: row.online,
                    reqNum: row.reqNum,
                    rewards: row.rewards,
                    succNum: row.succNum,
                });
            }
            accessNumberList = accessNumberList;
        }
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
    let setArgs = {
        accessNumber: "",
        carrier: "",
        globalDidOpt: [],
    };
    async function setGlobalAccessNumber(
        accessNumber: string,
        carrier: string,
        globalDidOpt: string[],
    ) {
        try {
            if (globalDidOpt.length > 0) {
                globalDidOpt[0] = globalDidOpt[0].split(".")[0];
            }
            console.log({ accessNumber, carrier, globalDidOpt });
            if (window.confirm("Are you sure to submit?")) {
                let res = await $delta.setGlobalAccessNumber(
                    accessNumber,
                    carrier,
                    globalDidOpt,
                );
                alert(`执行结果: ${res}`);
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
        <table>
            <thead>
                <tr>
                    <th>did</th>
                    <th>accessNumber</th>
                    <th>carrier</th>
                    <th>expiration</th>
                    <th>online</th>
                    <th>succNum/reqNum</th>
                    <th>rewards</th>
                    <th> </th>
                </tr>
            </thead>
            {#each accessNumberList as row}
                <tr>
                    <td>
                        {row.did}
                    </td>
                    <td>
                        <input
                            class="input"
                            type="text"
                            placeholder="accessNumber"
                            bind:value={row.accessNumber}
                        />
                    </td>
                    <td>
                        <input
                            class="input"
                            type="text"
                            placeholder="carrier"
                            bind:value={row.carrier}
                        />
                    </td>
                    <td>{agoDays(row.expiration)}</td>
                    <td>{formatDate(row.online)}</td>
                    <td>{`${row.succNum} / ${row.reqNum}`}</td>
                    <td>{row.rewards}</td>
                    <td>
                        <button
                            class="btn variant-filled"
                            on:click={() =>
                                setGlobalAccessNumber(
                                    row.accessNumber,
                                    row.carrier,
                                    [row.did],
                                )}
                        >
                            更新</button
                        >

                        <button
                            class="btn bg-initial"
                            on:click={() =>
                                setGlobalAccessNumber("", row.carrier, [
                                    row.did,
                                ])}>删除</button
                        >
                    </td>
                </tr>
            {/each}
            <tr>
                <td></td>
                <td>
                    <input
                        class="input"
                        type="text"
                        placeholder="accessNumber"
                        bind:value={setArgs.accessNumber}
                    />
                </td>
                <td>
                    <input
                        class="input"
                        type="text"
                        placeholder="carrier"
                        bind:value={setArgs.carrier}
                    />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <button
                        class="btn variant-filled"
                        on:click={() =>
                            setGlobalAccessNumber(
                                setArgs.accessNumber,
                                setArgs.carrier,
                                [],
                            )}
                    >
                        添加
                    </button>
                </td>
            </tr>
        </table>
    {/if}
</section>
