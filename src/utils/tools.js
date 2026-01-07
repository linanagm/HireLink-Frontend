export function splitName(fullName) {
	if (!fullName || typeof fullName !== "string") {
		return { firstName: "", lastName: "" };
	}

	const parts = fullName.trim().split(/\s+/);
	if (parts.length === 1) {
		return {
			firstName: parts[0],
			lastName: "",
		};
	}
	console.log(
		"first name -> ",
		parts[0],
		"\n",
		"Last name -> ",
		parts.slice(1).join(" "),
	);

	return {
		firstName: parts[0],
		lastName: parts.slice(1).join(" "),
	};
}
