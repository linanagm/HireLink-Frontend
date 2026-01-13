/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	clearDraft,
	saveDraft,
} from "../../../utils/Helpers/profile.helper.js";
import { talentOnboardingSchema } from "../../../utils/validation/onboardingValidation";

export default function TalentOnboardingProfile() {
	const [imagePreview, setImagePreview] = useState("");
	const navigate = useNavigate();
	const INITIAL_VALUES = {
		profileImage: null,
		jobTitle: "",
		location: "",
		resume: null,
		skills: [""],
		jobType: "",
		environment: "",
		socialLinks: [""],
		bio: "",
	};

	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		validationSchema: talentOnboardingSchema,
		validateOnMount: true,
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: (values) => {
			console.log("SUBMIT VALUES:", values);
			saveDraft(values);
			navigate("/login", { state: { fromOnboarding: true } });
		},
	});

	// ===== Helpers =====
	const showError = (name) =>
		Boolean(formik.touched[name] && formik.errors[name]);

	const errorText = (name) => (showError(name) ? formik.errors[name] : "");

	const setTouchedAll = () => {
		formik.setTouched({
			profileImage: true,
			jobTitle: true,
			location: true,
			resume: true,
			skills: true,
			jobType: true,
			environment: true,
			socialLinks: true,
			bio: true,
		});
	};

	const setArrayItem = (field, index, value) => {
		const next = [...formik.values[field]];
		next[index] = value;
		formik.setFieldValue(field, next);
	};

	const addArrayItem = (field) => {
		formik.setFieldValue(field, [...formik.values[field], ""]);
	};

	const removeArrayItem = (field, index) => {
		const next = formik.values[field].filter((_, i) => i !== index);
		formik.setFieldValue(field, next.length ? next : [""]);
	};

	// ===== Profile image preview (circle) =====
	useEffect(() => {
		// cleanup preview on unmount
		return () => {
			if (imagePreview) URL.revokeObjectURL(imagePreview);
		};
	}, [imagePreview]);

	const handleProfileImageChange = (e) => {
		const file = e.currentTarget.files?.[0] || null;

		formik.setFieldValue("profileImage", file);
		formik.setFieldTouched("profileImage", true);

		// preview
		if (imagePreview) URL.revokeObjectURL(imagePreview);
		setImagePreview(file ? URL.createObjectURL(file) : "");
	};

	const handleResumeChange = (e) => {
		const file = e.currentTarget.files?.[0] || null;
		formik.setFieldValue("resume", file);
		formik.setFieldTouched("resume", true);
	};

	// ===== Button behavior =====
	const canSubmit = useMemo(() => {
		return !formik.isSubmitting;
	}, [formik.isSubmitting]);

	const handleSubmitClick = () => {
		if (!formik.isValid) setTouchedAll();
	};

	return (
		<div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
			<div className="bg-white w-full max-w-4xl rounded-2xl shadow p-10">
				<h1 className="text-2xl font-bold text-center mb-10">
					Onboarding Profile Setup
				</h1>

				<form onSubmit={formik.handleSubmit} className="space-y-6">
					{/* Profile Picture Upload (Circle + Change) */}
					<div className="flex items-center gap-4">
						<label
							htmlFor="profileImage"
							className="cursor-pointer flex items-center gap-4"
						>
							<div className="w-20 h-20 rounded-full overflow-hidden  flex items-center justify-center">
								{imagePreview ? (
									<img
										src={imagePreview}
										alt="Profile preview"
										className="w-full h-full object-cover"
									/>
								) : (
									<i className="fa-solid fa-circle-plus text-3xl text-fuchsia-800"></i>
								)}
							</div>

							<div className="flex flex-col">
								<span className="text-sm font-bold">Profile Picture</span>
								<span className="text-xs text-gray-500">
									Click to upload/change
								</span>
								{formik.values.profileImage?.name ? (
									<span className="text-xs text-gray-500">
										{formik.values.profileImage.name}
									</span>
								) : null}
							</div>
						</label>

						<input
							id="profileImage"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleProfileImageChange}
						/>

						{showError("profileImage") ? (
							<p className="text-sm text-red-600">
								{errorText("profileImage")}
							</p>
						) : null}
					</div>

					{/* Job Title */}
					<div>
						<label htmlFor="jobTitle" className="block text-sm font-bold mb-1">
							Headline / Job Title
						</label>
						<input
							id="jobTitle"
							name="jobTitle"
							type="text"
							value={formik.values.jobTitle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="e.g., UI/UX Designer"
							className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
						{showError("jobTitle") ? (
							<p className="text-sm text-red-600 mt-1">
								{errorText("jobTitle")}
							</p>
						) : null}
					</div>

					{/* Location */}
					<div>
						<label htmlFor="location" className="block text-sm font-bold mb-1">
							Location
						</label>
						<input
							id="location"
							name="location"
							type="text"
							value={formik.values.location}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Current Location"
							className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
						{showError("location") ? (
							<p className="text-sm text-red-600 mt-1">
								{errorText("location")}
							</p>
						) : null}
					</div>

					{/* Resume */}
					<div>
						<label htmlFor="resume" className="block text-sm font-bold mb-1">
							Upload Resume
						</label>

						<div className="flex items-center border rounded-lg p-3">
							<input
								type="text"
								className="w-full focus:outline-none"
								placeholder="Upload Resume"
								value={formik.values.resume?.name || ""}
								readOnly
							/>

							<label
								htmlFor="resume"
								className="ml-2 text-purple-600 text-lg cursor-pointer"
							>
								📁
							</label>

							<input
								id="resume"
								type="file"
								accept=".pdf,.doc,.docx"
								className="hidden"
								onChange={handleResumeChange}
							/>
						</div>

						{showError("resume") ? (
							<p className="text-sm text-red-600 mt-1">{errorText("resume")}</p>
						) : null}
					</div>

					{/* Skills */}
					<div>
						<label htmlFor="skills" className="block text-sm font-bold mb-1">
							Skills Tags
						</label>

						{formik.values.skills.map((skill, index) => (
							<div
								key={index}
								className="flex items-center gap-2 border rounded-lg p-3 mb-2"
							>
								<input
									type="text"
									placeholder="Skill Tag"
									className="w-full focus:outline-none"
									value={skill}
									onChange={(e) =>
										setArrayItem("skills", index, e.target.value)
									}
									onBlur={() => formik.setFieldTouched("skills", true)}
								/>

								<button
									type="button"
									className="text-purple-800 text-xl"
									onClick={() => addArrayItem("skills")}
								>
									<i className="fa-solid fa-plus"></i>
								</button>

								{formik.values.skills.length > 1 && (
									<button
										type="button"
										className="text-red-600 text-xl"
										onClick={() => removeArrayItem("skills", index)}
									>
										✕
									</button>
								)}
							</div>
						))}

						{/* لو الـ schema بيرجع string للـ array */}
						{formik.touched.skills &&
						typeof formik.errors.skills === "string" ? (
							<p className="text-sm text-red-600 mt-1">
								{formik.errors.skills}
							</p>
						) : null}
					</div>

					{/* Job Preferences */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="jobType" className="block text-sm font-bold mb-1">
								Job Type
							</label>
							<select
								id="jobType"
								name="jobType"
								value={formik.values.jobType}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
							>
								<option value="" disabled>
									Type (Full-time, Part-time, Freelance)
								</option>
								<option value="Full-time">Full-time</option>
								<option value="Part-time">Part-time</option>
								<option value="Freelance">Freelance</option>
							</select>

							{showError("jobType") ? (
								<p className="text-sm text-red-600 mt-1">
									{errorText("jobType")}
								</p>
							) : null}
						</div>

						<div>
							<label
								htmlFor="environment"
								className="block text-sm font-bold mb-1"
							>
								Environment
							</label>
							<select
								id="environment"
								name="environment"
								value={formik.values.environment}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
							>
								<option value="" disabled>
									Environment (Remote, Hybrid, On-site)
								</option>
								<option value="Remote">Remote</option>
								<option value="Hybrid">Hybrid</option>
								<option value="On-site">On-site</option>
							</select>

							{showError("environment") ? (
								<p className="text-sm text-red-600 mt-1">
									{errorText("environment")}
								</p>
							) : null}
						</div>
					</div>

					{/* Social Links */}
					<div>
						<label htmlFor="" className="block text-sm font-bold mb-1">
							Social Links
						</label>

						{formik.values.socialLinks.map((link, index) => (
							<div
								key={index}
								className="flex items-center gap-2 border rounded-lg p-3 mb-2"
							>
								<input
									type="text"
									placeholder="Social Link"
									className="w-full focus:outline-none"
									value={link}
									onChange={(e) =>
										setArrayItem("socialLinks", index, e.target.value)
									}
									onBlur={() => formik.setFieldTouched("socialLinks", true)}
								/>

								<button
									type="button"
									className="text-purple-600 text-xl"
									onClick={() => addArrayItem("socialLinks")}
								>
									＋
								</button>

								{formik.values.socialLinks.length > 1 && (
									<button
										type="button"
										className="text-red-600 text-xl"
										onClick={() => removeArrayItem("socialLinks", index)}
									>
										✕
									</button>
								)}
							</div>
						))}

						{formik.touched.socialLinks &&
						typeof formik.errors.socialLinks === "string" ? (
							<p className="text-sm text-red-600 mt-1">
								{formik.errors.socialLinks}
							</p>
						) : null}
					</div>

					{/* Bio */}
					<div>
						<label htmlFor="bio" className="block text-sm font-bold mb-1">
							Short Bio / Summary
						</label>
						<textarea
							id="bio"
							name="bio"
							value={formik.values.bio}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Summary"
							className="w-full border rounded-lg p-3 h-24 focus:ring-2 focus:ring-purple-500"
						/>
						{showError("bio") ? (
							<p className="text-sm text-red-600 mt-1">{errorText("bio")}</p>
						) : null}
					</div>

					{/* Buttons */}
					<div className="flex justify-center gap-4 mt-6">
						<button
							type="submit"
							disabled={!canSubmit}
							onClick={handleSubmitClick}
							className="bg-fuchsia-800 disabled:opacity-60 text-white px-6 py-2 rounded-lg hover:bg-fuchsia-600 hover:text-white"
						>
							Signup
						</button>

						<button
							type="button"
							className="border border-fuchsia-800 text-fuchsia-800 px-6 py-2 rounded-lg hover:bg-fuchsia-800 hover:text-white"
							onClick={() => {
								clearDraft();
								navigate("/");
							}}
						>
							Skip
						</button>
					</div>

					{/* Debug Info */}
					<div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
						isValid: {String(formik.isValid)} | errors:{" "}
						{Object.keys(formik.errors).length}
					</div>
					<pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
						{JSON.stringify(formik.errors, null, 2)}
					</pre>
				</form>
			</div>
		</div>
	);
}
