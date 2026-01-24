
import defaultProfileImage from "../../assets/images/profile-image.png";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Builds a URL to the Cloudinary image upload endpoint.
 * @param {publicId} The public ID of the image to upload.
 * @returns {string} The URL to the Cloudinary image upload endpoint.
 */
export const buildAvatarUrl = (publicId) => {
    if (!publicId) return defaultProfileImage;
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
};


/**
 * Validates an image file against a set of allowed types and maximum size.
 * @param {File} file - The file to validate.
 * @param {{ allowedTypes: string[], maxSizeMB: number }} options - The allowed types and maximum size in megabytes.
 * @returns {{ ok: boolean, message: string }} - An object with a boolean indicating whether the validation was successful and a message describing the result.
 */
export function validateImageFile(file, { allowedTypes, maxSizeMB }) {
    if (!file) return { ok: false, message: "No file selected" };

    if (!allowedTypes.includes(file.type)) {
        return { ok: false, message: "Only JPG, JPEG, and PNG images are allowed" };
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
        return { ok: false, message: `Image size must be less than ${maxSizeMB} MB` };
    }

    return { ok: true, message: "" };
}