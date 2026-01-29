export function calcProfileCompletion(profile) {
    if (!profile) return 0;

    const checks = [
        !!profile.headline,
        !!profile.bio,
        !!profile.location,
        Array.isArray(profile.skills) && profile.skills.length > 0,
        Array.isArray(profile.languages) && profile.languages.length > 0,
        Array.isArray(profile.certificates) && profile.certificates.length > 0,
        !!profile.avatarPublicId,
        !!profile.resumePublicId,

    ];

    const done = checks.filter(Boolean).length;
    return Math.round((done / checks.length) * 100);
}
