import { render } from '$lib';
import Email from './Email.svelte';

export const prerender = true;

export async function load() {
	const html = render({
		template: Email,
		options: {
			pretty: true
		}
	});

	const plainText = render({
		template: Email,
		options: {
			plainText: true
		}
	});

	return {
		html,
		plainText
	};
}
