import * as helpers from "./apiHelpers.js";

// -----------------
// Talents
// -----------------
export function addTalent(talent) {
  const db = helpers.getDB();
  const newTalent = {
    id: db.talents.length + 1,
    userId: talent.userId,
    firstName: talent.firstName || "",
    lastName: talent.lastName || "",
    phone: talent.phone || "",
    title: talent.title || "",
    bio: talent.bio || "",
    location: talent.location || "",
    website: talent.website || "",
    githubUrl: talent.githubUrl || "",
    linkedinUrl: talent.linkedinUrl || "",
    avatarUrl: talent.avatarUrl || "",
    resumeUrl: talent.resumeUrl || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.talents.push(newTalent);
  helpers.saveDB(db);
  return newTalent;
}

export function getTalents() {
  const db = helpers.getDB();
  return db.talents.map(t => {
    const user = db.users.find(u => u.id === t.userId);
    return { ...t, email: user?.email, role: user?.role };
  });
}
