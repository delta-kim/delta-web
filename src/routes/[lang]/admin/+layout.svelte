<script lang="ts">
    import { lang} from "../../../lib/store";
    import { onMount } from 'svelte';
    import {
        AppShell,
        AppBar,
        TabGroup,
        TabAnchor,
        popup,
    } from "@skeletonlabs/skeleton";
    onMount(()=>{
        console.log("lang",$lang);
    })
</script>

<AppShell>
    <!-- (header) -->
    <svelte:fragment slot="sidebarLeft">
        <div>Admin</div>
        <TabAnchor href="/en/admin">
            info
        </TabAnchor>
        <TabAnchor href="/en/admin/global_access_number">
            global access number
        </TabAnchor>
        <TabAnchor href="/en/admin/app_version">
            app version
        </TabAnchor>
        <TabAnchor href="/en/admin/reconcileUSCT">
            reconcile USCT
        </TabAnchor>
        <TabAnchor href="/en/admin/upgradeCanister">
            upgrade Canister
        </TabAnchor>
        
        
        
    </svelte:fragment>

    <!-- (sidebarRight) -->
    <!-- (pageHeader) -->
    <!-- Router Slot -->
    <slot />
    <!-- ---- / ---- -->
    <!-- (pageFooter) -->
    <!-- (footer) -->
</AppShell>
