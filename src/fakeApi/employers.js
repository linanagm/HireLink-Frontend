import { getDB, saveDB } from "./apiHelpers";

// -----------------
// Employers
// -----------------
export function addEmployer(employer) {
  const db = getDB();
  const newEmployer = {
    id: db.employers.length + 1,
    userId: employer.userId,
    companyName: employer.companyName || "",
    companyEmail: employer.companyEmail || "",
    phone: employer.phone || "",
    website: employer.website || "",
    logoUrl: employer.logoUrl || "",
    description: employer.description || "",
    isVerified: employer.isVerified || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.employers.push(newEmployer);
  saveDB(db);
  return newEmployer;
}

export function getEmployers() {
  const db = getDB();
  return db.employers.map(e => {
    const user = db.users.find(u => u.id === e.userId);
    return { ...e, email: user?.email, role: user?.role };
  });
}
