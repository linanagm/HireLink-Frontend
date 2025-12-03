
import { getDB, saveDB } from "./apiHelpers";


// -----------------
// Jobs
// -----------------
export function addJob(job) {
  const db = getDB();
  const newJob = {
    id: db.jobs.length + 1,
    employerId: job.employerId,
    title: job.title,
    description: job.description || "",
    requirements: job.requirements || "",
    responsibilities: job.responsibilities || "",
    location: job.location || "",
    isRemote: job.isRemote || false,
    isActive: job.isActive || false,
    salary: job.salary || 0,
    employmentType: job.employmentType || null,
    experienceLevel: job.experienceLevel || null,
    publishedAt: job.publishedAt || null,
    closedAt: job.closedAt || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.jobs.push(newJob);
  saveDB(db);
  return newJob;
}

export function getJobs() {
  const db = getDB();
  return db.jobs.map(j => {
    const employer = db.employers.find(e => e.id === j.employerId);
    return { ...j, employer };
  });
}
