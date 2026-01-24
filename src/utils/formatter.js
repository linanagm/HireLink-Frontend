// Helper to handle errors in a consistent format
export function handleError(error) {
	const message =
		error?.response?.data?.message ||
		error?.message ||
		"Unexpected error occurred.";

	return {
		ok: false,
		message,
		status: error?.response?.status || 500,
	};
}

/**
 * A helper function to conditionally join CSS class names together.
 * Takes a variable number of arguments, each of which can be a string or falsy.
 * Returns a string of all the truthy arguments joined together by a space.
 * @example cx("class1", "class2", null, undefined) // "class1 class2"
 * @example cx("class1", false, "class2") // "class1 class2"
 */
export function cx(...classes) {
	return classes.filter(Boolean).join(" ");
}

// Helper to prettify enum values
export function prettyEnum(value) {
	if (!value) return "";
	return String(value)
		.toLowerCase()
		.replaceAll("_", " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}