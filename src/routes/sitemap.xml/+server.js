import path from 'path';

export async function GET() {
  const filePaths = Object.keys(await import.meta.glob('../**/*.{svelte,md}'));

  const urls = filePaths
    .map((filePath) =>
      filePath
        .slice(3)
        .replace(path.extname(filePath), '')
        .replace(/\+page$/, '')
        // remove last slash
        .replace(/\/$/, '')
        // remove all instances of [...x] from string, where x is a number
        .replace(/\[\.\.\.\d+\]/g, ''),
    )
    .filter((url) => !url.endsWith('+layout'))
    .map(
      (url) => `
			<url>
				<loc>https://kit-docs-demo.vercel.app/${url}</loc>
				<changefreq>daily</changefreq>
				<priority>0.7</priority>
			</url>
		`,
    )
    .join('\n');

  return new Response(
    `
      <?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
				${urls}
      </urlset>
    `.trim(),
    {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml',
      },
    },
  );
}
