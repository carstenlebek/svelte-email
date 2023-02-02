<script lang="ts">
	export let style: Record<string, string | number> = {};
	let styleString = style
		? Object.entries(style)
				.map(([key, value]) => `${key}: ${value}`)
				.join(';')
		: '';
</script>

<body {...$$restProps} style={styleString}>
	<slot />
</body>
