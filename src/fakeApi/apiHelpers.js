// src/fakeApi.js
export const LOCAL_STORAGE_KEY = "fakeApiDB";

// Helper functions
export function getDB() {
  const db = localStorage.getItem(LOCAL_STORAGE_KEY);
  return db ? JSON.parse(db) : {
    users: [],
    talents: [],
    employers: [],
    jobs: [],
    applications: [],
    skills: [],
    talentSkills: [],
    languages: [],
    talentLanguages: [],
    certifications: []
  };
};

export function saveDB(db) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
}

