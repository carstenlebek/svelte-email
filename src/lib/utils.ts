import { readdirSync, statSync } from "fs";

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

// Recursive function to get files
export const getFiles = (dir: string, files: string[] = []) => {
	// Get an array of all files and directories in the passed directory using fs.readdirSync
	// to-do: catch error if dir not found
	const fileList = readdirSync(dir);
	// Create the full path of the file/directory by concatenating the passed directory and file/directory name
	for (const file of fileList) {
		const name = `${dir}/${file}`;
		// Check if the current file/directory is a directory using fs.statSync
		if (statSync(name).isDirectory()) {
			// If it is a directory, recursively call the getFiles function with the directory path and the files array
			getFiles(name, files);
		} else {
			// If it is a file, push the full path to the files array
			files.push(name);
		}
	}
	return files;
}