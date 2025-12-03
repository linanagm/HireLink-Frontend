import { getDB, saveDB } from "./apiHelpers";

// -----------------
// Certifications
// -----------------
export function addCertification(cert) {
  const db = getDB();
  const newCert = { id: db.certifications.length + 1, ...cert, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.certifications.push(newCert);
  saveDB(db);
  return newCert;
}

export function getCertifications() {
  return getDB().certifications;
}
