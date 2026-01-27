export function normalizeSkillRow(row) {
    return {
        skillId: row?.skillId ?? null,
        name: (row?.name || "").trim(),
        level: row?.level || "BEGINNER",
    };
}

export function deriveSkillsUi({ cachedSkills, talentProfileSkills }) {
    const base = cachedSkills?.length ? cachedSkills : (talentProfileSkills ?? []);
    return base.map((s) => ({
        skillId: s.skillId ?? s.id ?? null,
        name: s.name ?? "",
        level: s.level ?? "BEGINNER",
    }));
}

export function buildSkillsDraft(skillsUi) {
    const initial = (skillsUi ?? []).map(normalizeSkillRow);
    return initial.length ? initial : [{ skillId: null, name: "", level: "BEGINNER" }];
}

export function cleanSkillsDraft(skillsDraft) {
    return (skillsDraft ?? [])
        .map(normalizeSkillRow)
        .filter((s) => s.name.length);
}
