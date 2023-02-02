<script lang="ts">
	import { pxToPt, styleToString } from '$lib/utils';

	export let href: string = '';
	export let style: Record<string, string | number> = {};
	export let pX: number = 0;
	export let pY: number = 0;
	export let target: string = '_blank';

	const y = pY * 2;
	const textRaise = pxToPt(y.toString());

	const buttonStyle = (style?: Record<string, string | number> & { pY?: number; pX?: number }) => {
		const paddingY = style?.pY || 0;
		const paddingX = style?.pX || 0;

		return {
			...style,
			lineHeight: '100%',
			textDecoration: 'none',
			display: 'inline-block',
			maxWidth: '100%',
			padding: `${paddingY}px ${paddingX}px`
		};
	};

	const buttonTextStyle = (
		style?: Record<string, string | number | null> & { pY?: number; pX?: number }
	) => {
		const paddingY = style?.pY || 0;

		return {
			...style,
			maxWidth: '100%',
			display: 'inline-block',
			lineHeight: '120%',
			textDecoration: 'none',
			textTransform: 'none' as const,
			msoPaddingAlt: '0px',
			msoTextRaise: pxToPt(paddingY.toString())
		};
	};
</script>

<a {...$$restProps} {href} {target} style={styleToString(buttonStyle({ ...style, pX, pY }))}>
	<span>
		{@html `<!--[if mso]><i style="letter-spacing: ${pX}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`}
	</span>
	<span style={styleToString(buttonTextStyle({ ...style, pX, pY }))}>
		<slot />
	</span>
	<span>
		{@html `<!--[if mso]><i style="letter-spacing: ${pX}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`}
	</span>
</a>
