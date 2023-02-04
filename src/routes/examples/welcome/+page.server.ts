import { render } from '$lib';
import Welcome from '$lib/_examples/welcome.svelte';

export const prerender = true;

export async function load() {
	const html = render({
		template: Welcome,
		props: {
			firstName: 'Jack'
		}
	});

	console.log(html);

	return {
		html
	};
}
