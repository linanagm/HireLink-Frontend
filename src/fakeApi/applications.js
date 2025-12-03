import { getDB, saveDB } from "./apiHelpers";

// -----------------
// Applications
// -----------------
export function applyToJob(application) {
  const db = getDB();
  const newApp = {
    id: db.applications.length + 1,
    jobId: application.jobId,
    talentId: application.talentId,
    coverLetter: application.coverLetter || "",
    resumeUrl: application.resumeUrl || "",
    status: "PENDING",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: application.userId || null
  };
  db.applications.push(newApp);
  saveDB(db);
  return newApp;
}

export function getApplications() {
  const db = getDB();
  return db.applications.map(a => {
    const job = db.jobs.find(j => j.id === a.jobId);
    const talent = db.talents.find(t => t.id === a.talentId);
    return { ...a, job, talent };
  });
}