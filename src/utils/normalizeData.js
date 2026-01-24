import defaultProfileImage from "../assets/images/profile-image.png";
import { buildAvatarUrl } from "./Helpers/avatar";

export function normalizeUser(user) {
    if (!user) return user;

    if (user.role === "TALENT") {
        const publicId = user?.talentProfile?.avatarPublicId;
        return {
            ...user,
            avatarUrl: publicId ? buildAvatarUrl(publicId) : defaultProfileImage,
        };
    }

    if (user.role === "EMPLOYER") {
        const publicId = user?.employerProfile?.logoPublicId;
        return {
            ...user,
            avatarUrl: publicId ? buildAvatarUrl(publicId) : defaultProfileImage,
        };
    }

    return {
        ...user,
        avatarUrl: defaultProfileImage,
    };
}


export function normalizeUrl(input) {
    const raw = (input || "").trim();
    if (!raw) return null;

    const lowered = raw.toLowerCase();
    if (lowered.startsWith("javascript:") || lowered.startsWith("data:")) {
        return null;
    }


    if (/^https?:\/\//i.test(raw)) return raw;


    if (raw.startsWith("//")) return `https:${raw}`;


    return `https://${raw}`;
}
