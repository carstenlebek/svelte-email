<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { tailwindToCSS, type TailwindConfig } from 'tw-to-css';

	export let config: TailwindConfig;

	const { twi } = tailwindToCSS({
		config
	});

	let children: HTMLCollection;

	const getChildren = (node: HTMLDivElement) => {
		children = node.children;
	};

	onMount(() => {
		let fullHTML = '';
		for (let child of children) {
			fullHTML = fullHTML + `${child.outerHTML}`;
		}
		// console.log(fullHTML);
		const tailwindCss = twi(fullHTML, {
			merge: false,
			ignoreMediaQueries: false
		});
		// console.log(tailwindCss)
		const css = cleanCss(tailwindCss);
		// console.log(css)
		const cssMap = makeCssMap(css);
		console.log(cssMap)
		const headStyle = getMediaQueryCss(css);
		// console.log(headStyle)
		const hasResponsiveStyles = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm.test(headStyle);
		const hasHTML = /<html[^>]*>/gm.test(fullHTML);
		const hasHead = /<head[^>]*>/gm.test(fullHTML);
		// console.log(hasResponsiveStyles, hasHTML, hasHead)

		if (hasResponsiveStyles && (!hasHTML || !hasHead)) {
			throw new Error(
				'Tailwind: To use responsive styles you must have a <html> and <head> element in your template.'
			);
		}
	});

	function cleanCss(css: string) {
		let newCss = css
			.replace(/\\/g, '')
			// find all css selectors and look ahead for opening and closing curly braces
			.replace(/[.\!\#\w\d\\:\-\[\]\/\.%\(\))]+(?=\s*?{[^{]*?\})\s*?{/g, (m) => {
				return m.replace(/(?<=.)[:#\!\-[\\\]\/\.%]+/g, '_');
			})
			.replace(/font-family(?<value>[^;\r\n]+)/g, (m, value) => {
				return `font-family${value.replace(/['"]+/g, '')}`;
			});
		return newCss;
	}

	function makeCssMap(css: string) {
		const cssNoMedia = css.replace(/@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm, '');
		const cssMap = cssNoMedia.split('}').reduce((acc, cur) => {
			const [key, value] = cur.split('{');
			if (key && value) {
				acc[key] = value;
			}
			return acc;
		}, {} as Record<string, string>);
		return cssMap;
	}

	function getMediaQueryCss(css: string) {
		const mediaQueryRegex = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm;
		return (
			css
				.replace(mediaQueryRegex, (m) => {
					return m.replace(/([^{]+\{)([\s\S]+?)(\}\s*\})/gm, (_, start, content, end) => {
						const newContent = (content as string).replace(
							/(?:[\s\r\n]*)?(?<prop>[\w-]+)\s*:\s*(?<value>[^};\r\n]+)/gm,
							(_, prop, value) => {
								return `${prop}: ${value} !important;`;
							}
						);
						return `${start}${newContent}${end}`;
					});
				})
				// only return media queries
				.match(/@media\s*([^{]+)\{([^{}]*\{[^{}]*\})*[^{}]*\}/g)
				?.join('') ?? ''
		);
	}
</script>

<svelte:head />

<div use:getChildren>
    <slot />
</div>
