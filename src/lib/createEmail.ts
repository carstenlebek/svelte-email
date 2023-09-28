import { json } from '@sveltejs/kit'
import { render } from '$lib'
import jsdom from 'jsdom'
// import { cleanCss, getMediaQueryCss, processTailwindClasses } from '$lib/utils'
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { tailwindToCSS, type TailwindConfig } from 'tw-to-css'

export const createEmail = async <Component extends SvelteComponent>({ template, props, options }: 
{
    template: {
        html?: string,
        component?: ComponentType<Component>
    }
    props?: ComponentProps<Component>
    options: {
        plainText: boolean
        pretty?: boolean
    },
}, tailwind: 
{
    useTailwind: boolean
    config?: TailwindConfig
}) => {

    let htmlWithoutTailwind: string
    
    if (template.component) {
        htmlWithoutTailwind = render({
            template: template.component,
            props: props,
            options: options
        })
    } else if (template.html) {
        // Hacky method used in development to dynamically generate all emails for preview on the front-end
        htmlWithoutTailwind = template.html
    } else {
        throw new Error("either a component or html is required as a param")
    }

    // if email is requested in plain text, there's no need to process the Tailwind styles
    // let the front-end know that the data should be rendered as plain text
    if (options.plainText) return json({ html: htmlWithoutTailwind, plainText: true })

    // Turn html string into a virtual DOM that can be queried and manipulated
    const { JSDOM } = jsdom
    const dom = new JSDOM(htmlWithoutTailwind)

    // If Tailwind was not used, return the natively-rendered html
    if (!tailwind.useTailwind) return json({ html: htmlWithoutTailwind })

    // If Tailwind was used, proceed to process the Tailwind classes
    const { twi } = tailwindToCSS({ config: tailwind.config })

    // convert tailwind classes to css
    const tailwindCss = twi(htmlWithoutTailwind, {
        merge: false,
        ignoreMediaQueries: false
    })

    // further process the tailwind css
    const cleanTailwindCss = cleanCss(tailwindCss)
    const headStyle = getMediaQueryCss(cleanTailwindCss)

    // Perform checks so that responsive styles can be processed
    const hasResponsiveStyles = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm.test(headStyle)
    const hasHead = /<head[^>]*>/gm.test(htmlWithoutTailwind)

    if (hasResponsiveStyles && !hasHead) {
        throw new Error("To use responsive Tailwind styles, you must have a 'head' element in your template. Not using Tailwind? Pass in the param { useTailwind: false }.")
    }

    // Turn tailwind classes into inline styles, and put responsive classes into a <style> in the <head> 
    // This function returns nothing - it manipulates the jsdom object that was created from the rendered component 
    processTailwindClasses(dom.window.document, cleanTailwindCss)

    const htmlWithTailwind = dom.serialize()

    return json({ html: htmlWithTailwind })
}

const cleanCss = (css: string) => {
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

const makeCssMap = (css: string) => {
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

const getMediaQueryCss = (css: string) => {
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
function processTailwindClasses(parentNode: Document, css: string) {

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