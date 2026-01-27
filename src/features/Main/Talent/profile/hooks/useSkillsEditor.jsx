import { useEffect, useMemo, useState } from "react";
import {
	buildSkillsDraft,
	cleanSkillsDraft,
	deriveSkillsUi,
} from "../utils/skills";

export function useSkillsEditor({
	qc,
	queryKeys,
	talentProfileSkills,
	isEditing,
	setIsEditing,
}) {
	const cachedSkills = qc.getQueryData(queryKeys.talentSkills)?.data?.skills;

	const skillsUi = useMemo(() => {
		return deriveSkillsUi({ cachedSkills, talentProfileSkills });
	}, [cachedSkills, talentProfileSkills]);

	const [skillsDraft, setSkillsDraft] = useState(() =>
		buildSkillsDraft(skillsUi),
	);

	useEffect(() => {
		if (!isEditing) setSkillsDraft(buildSkillsDraft(skillsUi));
	}, [isEditing, skillsUi]);

	const addRow = () =>
		setSkillsDraft((p) => [
			...p,
			{ skillId: null, name: "", level: "BEGINNER" },
		]);
	const removeRow = (index) =>
		setSkillsDraft((p) => p.filter((_, i) => i !== index));
	const updateRow = (index, patch) =>
		setSkillsDraft((p) =>
			p.map((row, i) => (i === index ? { ...row, ...patch } : row)),
		);

	const cancel = () => {
		setSkillsDraft(buildSkillsDraft(skillsUi));
		setIsEditing(false);
	};

	const getCleaned = () => cleanSkillsDraft(skillsDraft);

	return {
		skillsUi,
		skillsDraft,
		setSkillsDraft,
		addRow,
		removeRow,
		updateRow,
		cancel,
		getCleaned,
	};
}
