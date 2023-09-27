export const copyTextToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		throw new Error('Not able to copy');
	}
};

export const pxToPt = (px: string): number | null =>
	isNaN(Number(px)) ? null : (parseInt(px, 10) * 3) / 4;

export interface Margin {
	m?: string;
	mx?: string;
	my?: string;
	mt?: string;
	mr?: string;
	mb?: string;
	ml?: string;
}

export const withMargin = (props: Margin) =>
	[
		withSpace(props.m, ['margin']),
		withSpace(props.mx, ['marginLeft', 'marginRight']),
		withSpace(props.my, ['marginTop', 'marginBottom']),
		withSpace(props.mt, ['marginTop']),
		withSpace(props.mr, ['marginRight']),
		withSpace(props.mb, ['marginBottom']),
		withSpace(props.ml, ['marginLeft'])
	].filter((s) => Object.keys(s).length)[0];

const withSpace = (value: string | undefined, properties: string[]) => {
	return properties.reduce((styles, property) => {
		if (value) {
			return { ...styles, [property]: `${value}px` };
		}
		return styles;
	}, {});
};

// https://stackoverflow.com/a/61410824

export const styleToString = (style: Record<string, string | number | null>) => {
	return Object.keys(style).reduce(
		(acc, key) =>
			acc +
			key
				.split(/(?=[A-Z])/)
				.join('-')
				.toLowerCase() +
			':' +
			style[key] +
			';',
		''
	);
};

export const unreachable = (
	condition: never,
	message = `Entered unreachable code. Received '${condition}'.`
): never => {
	throw new TypeError(message);
};

export const cleanCss = (css: string) => {
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

export const makeCssMap = (css: string) => {
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

export const getMediaQueryCss = (css: string) => {
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

// Recursively loop over the DOM to process the tailwind classes
export function processTailwindClasses(parentNode: Document, css: string) {

	const cssMap = makeCssMap(css)
	const headStyle = getMediaQueryCss(css)

	// Recursion stops when there are no more child nodes
	if (parentNode.childNodes.length === 0) return

	const children = parentNode.childNodes as NodeListOf<Element>

	/**
	 * Put the forEach in a function that takes parentNode, childNodes props, 
	 * then remove childNodes from processTailwindClasses() function params, 
	 * and add cssMap to the processTailwindClasses() params
	 * Also: try to remove the "insert style into head" from the forEach loop. 
	 */
	loopChildren(children)

	function loopChildren(childNodes: NodeListOf<Element>) {
		childNodes.forEach(child => {
			// Put responsive styles in a <style> in the <head>
			if (child.nodeName.toLowerCase() === "head" ) {
				child.insertAdjacentHTML(
					'beforeend',
					` <style>${headStyle}</style>`
				)
			}
	
			// Some style tag values end up being just a ";"
			// To exclude those, look for style text lengths of more than 1
			// @ts-ignore
			const currentStyles = (child.style && child.style.length > 0 && child.style.cssText.length > 1) ? child.style.cssText : null

			if (child.classList && child.classList.length) {
				const classes: string = child.classList.value
				const cleanRegex = /[:#\!\-[\]\/\.%]+/g
	
				// Replace all non-alphanumeric characters with underscores
				const cleanTailwindClasses = classes
					.replace(cleanRegex, '_')
	
				// Convert tailwind classes to css styles
				const tailwindStyles = cleanTailwindClasses
					.split(' ')
					.map((className) => cssMap[`.${className}`])
					.join('; ')
				
				// Merge the pre-existing styles with the tailwind styles
				const mergedStyles = `${currentStyles ? (currentStyles + tailwindStyles) : tailwindStyles}`
					// JSDOM seems to stop its search after encountering an empty style.
					// Example: in "margin: 0; ; padding: 0", padding is skipped, because it encountered an empty style after margin.
					// Multiple spaces are fine.
					.replaceAll(";;", "; ") // remove empty style
					.replaceAll(";", "; ") // add space inbetween styles
					.replaceAll(":", ": ") // add space inbetween css property name and value
					.replaceAll(" ; ", "") // remove another empty style
				
				// @ts-ignore
				child.style.cssText = mergedStyles
	
				// Keep only the responsive classes
				// These will be styled by the <style> in the <head>
				child.classList.value = classes
					// remove all non-responsive classes (ex: m-2 md:m-4 > md:m-4)
					.split(' ')
					.filter((className) => className.search(/^.{2}:/) !== -1)
					.join(' ')
					// replace all non-alphanumeric characters with underscores
					.replace(cleanRegex, '_')
	
				// remove all empty class attributes
				if (child.classList.length === 0) child.removeAttribute("class")
			}
	
			// Re-run this function for all the current element's children
			loopChildren(child.childNodes as NodeListOf<Element>)
		})
	}
}