import { render } from '$lib';
import Hello from '$lib/_examples/hello.svelte';

export const prerender = true;

export async function load() {
	const html = render({
		template: Hello,
		props: {
			name: 'World'
		},
		options: {
			plainText: true
		}
	});

	return {
		html
	};
}
