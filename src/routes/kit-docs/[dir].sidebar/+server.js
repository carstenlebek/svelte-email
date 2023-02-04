import { createSidebarRequestHandler, kebabToTitleCase } from '@svelteness/kit-docs/node';

/** @type {import('./$types').RequestHandler} */
export const GET = createSidebarRequestHandler({
  formatCategoryName: (dirname) => kebabToTitleCase(dirname).replace('Api', 'API'),
});
