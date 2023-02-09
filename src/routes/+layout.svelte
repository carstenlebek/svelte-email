<script>
	import Analytics from '$lib/_docs/Analytics.svelte';

	import '@svelteness/kit-docs/client/polyfills/index.js';
	import '@svelteness/kit-docs/client/styles/normalize.css';
	import '@svelteness/kit-docs/client/styles/fonts.css';
	import '@svelteness/kit-docs/client/styles/theme.css';
	import '@svelteness/kit-docs/client/styles/vars.css';

	import SvelteLogo from '$img/svelte-logo.svg?raw';

	import { page } from '$app/stores';

	import {
		createKitDocsLoader,
		KitDocs,
		KitDocsLayout,
		Button,
		SocialLink,
		createSidebarContext
	} from '@svelteness/kit-docs';

	/** @type {import('./$types').PageData} */
	export let data;

	let { meta, sidebar } = data;
	$: ({ meta, sidebar } = data);

	/** @type {import('@svelteness/kit-docs').NavbarConfig} */
	const navbar = {
		links: [
			{ title: 'Docs', slug: '/docs', match: /\/docs/ },
			{ title: 'Examples', slug: '/docs/examples/airbnb-review', match: /\/examples/ }
		]
	};

	const { activeCategory } = createSidebarContext(sidebar);

	$: category = $activeCategory ? `${$activeCategory}: ` : '';
	$: title = meta ? `${category}${meta.title} | Svelte` : null;
	$: description = meta?.description;
</script>

<svelte:head>
	{#key $page.url.pathname}
		{#if title}
			<title>{title}</title>
		{/if}
		{#if description}
			<meta name="description" content={description} />
		{/if}
	{/key}
</svelte:head>
<Analytics />

<div class="bg-red-500 w-40 h-40" />

<KitDocs {meta}>
	<KitDocsLayout {navbar} {sidebar}>
		<div slot="navbar-left">
			<div class="logo">
				<a href="/" style="">
					{@html SvelteLogo}
					<span class="logo-text"> SVELTE EMAIL </span>
				</a>
			</div>
		</div>

		<div class="socials" slot="navbar-right-alt">
			<SocialLink type="twitter" href="https://twitter.com/carstenlebek1" />
			<SocialLink type="gitHub" href="https://github.com/carstenlebek/svelte-email" />
		</div>

		<slot />
	</KitDocsLayout>
</KitDocs>

<style>
	.logo {
		/* display: flex; */
		/* align-items: center; */
	}
	.logo :global(a) {
		color: rgb(var(--kd-color-inverse));
		display: flex;
		align-items: center;
		/* justify-content: center; */
	}

	.logo :global(svg) {
		height: 36px;
		width: 36px !important;
		overflow: hidden;
	}

	.logo-text {
		font-size: 1.5rem;
		font-weight: 600;
		margin-left: 0.5rem;
		white-space: nowrap;
	}

	.socials {
		display: flex;
		margin-left: -0.25rem;
	}
</style>
