import { json } from '@sveltejs/kit'
import { render } from '$lib'
import jsdom from 'jsdom'
import { cleanCss, getMediaQueryCss, processTailwindClasses } from '$lib/utils'
import type { ComponentProps, SvelteComponent } from 'svelte';
import { tailwindToCSS, type TailwindConfig } from 'tw-to-css'

export const createEmail = async <Component extends SvelteComponent>({ props, options, config }: 
{
    props?: ComponentProps<Component>
    options?: {
        plainText?: boolean
        pretty?: boolean
    },
    config?: TailwindConfig
}) => {

    const templateName = "welcome-tailwind"
    const template = (await import(`$lib/emails/${templateName}.svelte`)).default

    const htmlWithoutTailwind = render({
        template: template,
        props: props,
        options: options
    })

    // if email is requested in plain text, there's no need to process the Tailwind styles
    if (options?.plainText === true) return json({ html: htmlWithoutTailwind, plainText: true })

    // Turn html string into a virtual DOM that can be queried and manipulated
    const { JSDOM } = jsdom
    const dom = new JSDOM(htmlWithoutTailwind)

    // A data-attribute called "data-tw" on the HTML wrapper is used to determine if the component uses Tailwind
    const htmlEl = dom.window.document.querySelector("html")

    if (!htmlEl) throw new Error("The template needs the HTML element to determine if tailwind is used")

    const useTailwind = htmlEl.getAttribute("data-tw")

    // If Tailwind was not used, return the natively-rendered html
    if (!useTailwind || useTailwind === "no") return json({ html: htmlWithoutTailwind })

    // If Tailwind was used, proceed to process the Tailwind classes
    // With the way this script currently works, the Tailwind config is the same for all email templates

    const { twi } = tailwindToCSS({ config })

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
        throw new Error("To use responsive Tailwind styles, you must have a 'head' element in your template. Not using Tailwind? Set the HTML component's 'useTailwind' prop (inside your Svelte email component) to 'no'.")
    }

    // Turn tailwind classes into inline styles, and put responsive classes into a <style> in the <head> 
    // This function returns nothing - it manipulates the jsdom object that was created from the rendered component 
    processTailwindClasses(dom.window.document, cleanTailwindCss)

    const htmlWithTailwind = dom.serialize()

    return json({ html: htmlWithTailwind })
}