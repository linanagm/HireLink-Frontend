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

	return {
		firstName: parts[0],
		lastName: parts.slice(1).join(" "),
	};
}

export function formatName(name) {
	if (!name || typeof name !== "string") return "";

	return name
		.split("_")// delete _                 
		.map(word =>
			word
				.toLowerCase()// change word to small letters
				.replace(
					/^./,
					char => char.toUpperCase() // turn first letter to capital letter
				)
		)
		.join(" ");                  // ترجعهم space
}

