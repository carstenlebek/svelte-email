<script lang="ts">
	import { styleToString } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$Props extends Omit<HTMLAttributes<HTMLTableElement>, 'style'> {
		style?: Record<string, string | number | null>;
	}

	export let style = {};

	const styleDefaultTable = {
		width: '100%',
		...style
	};

	const styleDefaultTr = {
		display: 'grid',
		gridAutoColumns: 'minmax(0, 1fr)',
		gridAutoFlow: 'column'
	};
</script>

<table
	style={styleToString(styleDefaultTable)}
	align="center"
	border={0}
	cellPadding={0}
	cellSpacing={0}
	role="presentation"
	{...$$restProps}
>
	<tbody>
		<tr style={styleToString(styleDefaultTr)}>
			<slot />
		</tr>
	</tbody>
</table>
