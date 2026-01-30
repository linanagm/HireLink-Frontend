/**
 * Builds a URL to the Cloudinary image upload endpoint.
 * @param {string} publicId - The public ID of the image to upload.
 * @param {string} [resourceType="raw"] - The type of resource to upload (raw for resume, image for avatar)
 * @returns {string} The URL to the Cloudinary image upload endpoint.
 */
export function buildCloudinaryUrl(publicId, resourceType = "raw") {
	if (!publicId) return "";
	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${encodeURIComponent(publicId)}`;
}
