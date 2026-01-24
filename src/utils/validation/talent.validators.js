// src/utils/validation/avatarSchema.js
import * as Yup from "yup";

export const avatarSchema = Yup.mixed()
    .required("No file selected")
    .test(
        "fileType",
        "Only JPG, JPEG, and PNG images are allowed",
        (file) =>
            file &&
            ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    )
    .test(
        "fileSize",
        "Image size must be less than 5 MB",
        (file) => file && file.size <= 5 * 1024 * 1024,
    );
