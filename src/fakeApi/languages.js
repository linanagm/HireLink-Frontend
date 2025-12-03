import { getDB, saveDB } from "./apiHelpers";

// -----------------
// Languages
// -----------------
export function addLanguage(language) {
  const db = getDB();
  const newLang = { id: db.languages.length + 1, code: language.code, name: language.name, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.languages.push(newLang);
  saveDB(db);
  return newLang;
}

export function getLanguages() {
  return getDB().languages;
}





// -----------------
// TalentLanguages
// -----------------
export function addTalentLanguage({ talentId, languageId, level, isNative }) {
  const db = getDB();
  const newTL = { talentId, languageId, level, isNative: isNative || false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  db.talentLanguages.push(newTL);
  saveDB(db);
  return newTL;
}
