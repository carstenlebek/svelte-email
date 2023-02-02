import { render } from '$lib/render';
import type { PageServerLoad } from './$types';
import Email from './email.svelte';

export const load = (async () => {
	const document = render({
		template: Email,
		props: {
			userFirstName: 'John',
			resetPasswordLink: 'https://example.com/reset-password'
		},
		options: {
			pretty: true
		}
	});
	console.log(document);
	return {
		document
	};
}) satisfies PageServerLoad;
