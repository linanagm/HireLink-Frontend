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