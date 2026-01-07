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
