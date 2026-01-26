export function buildCloudinaryUrl(publicId, resourceType = "raw") {
    if (!publicId) return "";
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // مهم: raw (resume) / image (avatar)
    // encodeURIComponent عشان لو فيه سلاشات
    return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${encodeURIComponent(publicId)}`;
}
