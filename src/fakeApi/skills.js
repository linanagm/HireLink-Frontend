import { getDB, saveDB, db } from "./apiHelpers";

// -----------------
// Skills
// -----------------
export function addSkill(skill) {
  const db = getDB();
  const newSkill = {
    id: db.skills.length + 1,
    name: skill.name,
    description: skill.description || "",
    category: skill.category || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.skills.push(newSkill);
  saveDB(db);
  return newSkill;
}

export function getSkills() {
  return getDB().skills;
}

// -----------------
// TalentSkills
// -----------------
export function addTalentSkill({ talentId, skillId, skillLevel }) {
  const db = getDB();
  const newTS = { talentId, skillId, skillLevel, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.talentSkills.push(newTS);
  saveDB(db);
  return newTS;
}

export function getTalentSkills() {
  return getDB().talentSkills.map(ts => {
    const talent = db.talents.find(t => t.id === ts.talentId);
    const skill = db.skills.find(s => s.id === ts.skillId);
    return { ...ts, talent, skill };
  });
}
