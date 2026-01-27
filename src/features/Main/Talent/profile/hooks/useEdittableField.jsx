import { useEffect, useState } from "react";

export function useEditableField(valueFromServer, { fallback = "" } = {}) {
	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(fallback);

	useEffect(() => {
		if (!isEditing) setDraft(valueFromServer ?? fallback);
	}, [valueFromServer, fallback, isEditing]);

	const start = () => setIsEditing(true);

	const cancel = () => {
		setDraft(valueFromServer ?? fallback);
		setIsEditing(false);
	};

	const commit = (onSave) => {
		const trimmed = typeof draft === "string" ? draft.trim() : draft;
		setIsEditing(false);
		onSave(trimmed);
	};

	return { isEditing, draft, setDraft, start, cancel, commit, setIsEditing };
}
