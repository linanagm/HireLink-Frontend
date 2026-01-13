const KEY = "onboarding:draft:v1";

export function saveDraft(values) {
    localStorage.setItem(KEY, JSON.stringify({ values, savedAt: Date.now() }));
}

export function loadDraft() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw)?.values ?? null;
    } catch {
        return null;
    }
}

export function clearDraft() {
    localStorage.removeItem(KEY);
}
