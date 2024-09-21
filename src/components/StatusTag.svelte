<script lang="ts">
	import { t } from 'svelte-i18n';
	export let status;

	function classColor(obj: Object) {
		let statusStr = Object.keys(obj)[0];
		if (statusStr == 'queuing') {
			return 'variant-filled-surface';
		}
		if (statusStr == 'processing') {
			return 'variant-filled-secondary';
		}
		// statusStr == 'completed'
		return 'variant-filled-primary';
	}
</script>

<span class="chip {classColor(status)}">
	{$t(Object.keys(status)[0])}
</span>
