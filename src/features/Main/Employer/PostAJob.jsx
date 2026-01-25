import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useCreateEmployerJobMutation,
	useEmployerJobQuery,
	useUpdateEmployerJobMutation,
} from "../../../hooks/queries/employer/useEmployerJobs";
import { postJobSchema } from "../../../utils/validation/jobs.validators";
import { mapFormikToJobPayload } from "./lib/jobFormMapper";

const JOB_TYPES = [
	{ value: "FULL_TIME", label: "Full-time" },
	{ value: "PART_TIME", label: "Part-time" },
	{ value: "CONTRACT", label: "Contract" },
	{ value: "INTERNSHIP", label: "Internship" },
];

const EXP_LEVELS = [
	{ value: "FRESH", label: "Fresh / Entry" },
	{ value: "JUNIOR", label: "Junior" },
	{ value: "MID", label: "Intermediate" },
	{ value: "SENIOR", label: "Senior" },
	{ value: "LEAD", label: "Lead" },
];

const LANG_PROF = [
	{ value: "BASIC", label: "Basic" },
	{ value: "INTERMEDIATE", label: "Intermediate" },
	{ value: "FLUENT", label: "Fluent" },
	{ value: "NATIVE", label: "Native" },
];

function FieldError({ formik, name }) {
	const touched = formik.touched?.[name];
	const error = formik.errors?.[name];
	if (!touched || !error) return null;
	return <p className="mt-2 text-sm text-red-600">{error}</p>;
}

export default function PostJobPage() {
	const navigate = useNavigate();
	const { jobId } = useParams();
	const isEdit = !!jobId;
	const [submitError, setSubmitError] = useState("");
	const createMutation = useCreateEmployerJobMutation();
	const updateMutation = useUpdateEmployerJobMutation(jobId);
	const jobQuery = useEmployerJobQuery(jobId, { enabled: isEdit });

	const [apiError, setApiError] = useState("");

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			location: "",
			jobType: "FULL_TIME",
			experienceLevel: "FRESH",
			salary: "",
			requiredSkills: [],
			requiredLanguages: [],
		},
		validationSchema: postJobSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitError("");

			try {
				const payload = mapFormikToJobPayload(values);

				if (isEdit) {
					await updateMutation.mutateAsync(payload);
				} else {
					await createMutation.mutateAsync(payload);
				}

				// ✅ نجاح → رجوع للداشبورد
				navigate("/employer/dashboard");
			} catch (err) {
				// ✅ فشل → رسالة لليوزر
				const message =
					err?.response?.data?.message ||
					"Something went wrong. Please try again.";

				setSubmitError(message);
			} finally {
				setSubmitting(false);
			}
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (!isEdit) return;
		if (!jobQuery.data) return;
		const hydrated = mapApiJobToFormik(jobQuery.data);
		formik.setValues(hydrated);
	}, [isEdit, jobQuery.data]);

	const busy =
		jobQuery.isLoading || createMutation.isPending || updateMutation.isPending;

	// ---- Skills handlers (Formik array) ----
	const [skillInput, setSkillInput] = useState("");

	const addSkill = () => {
		const name = (skillInput || "").trim();
		if (!name) return;

		const exists = (formik.values.requiredSkills || []).some(
			(s) => (s.name || "").trim().toLowerCase() === name.toLowerCase(),
		);
		if (exists) {
			setSkillInput("");
			return;
		}

		formik.setFieldValue("requiredSkills", [
			...(formik.values.requiredSkills || []),
			{ name, required: true },
		]);
		setSkillInput("");
	};

	const removeSkill = (name) => {
		formik.setFieldValue(
			"requiredSkills",
			(formik.values.requiredSkills || []).filter((s) => s.name !== name),
		);
	};

	const toggleSkillRequired = (name) => {
		formik.setFieldValue(
			"requiredSkills",
			(formik.values.requiredSkills || []).map((s) =>
				s.name === name ? { ...s, required: !s.required } : s,
			),
		);
	};

	// ---- Languages handlers ----
	const [langInput, setLangInput] = useState("");
	const [langProf, setLangProf] = useState("BASIC");

	const addLanguage = () => {
		const name = (langInput || "").trim();
		if (!name) return;

		const exists = (formik.values.requiredLanguages || []).some(
			(l) => (l.name || "").trim().toLowerCase() === name.toLowerCase(),
		);
		if (exists) {
			setLangInput("");
			return;
		}

		formik.setFieldValue("requiredLanguages", [
			...(formik.values.requiredLanguages || []),
			{ name, minimumProficiency: langProf, required: true },
		]);
		setLangInput("");
	};

	const removeLanguage = (name) => {
		formik.setFieldValue(
			"requiredLanguages",
			(formik.values.requiredLanguages || []).filter((l) => l.name !== name),
		);
	};

	const toggleLanguageRequired = (name) => {
		formik.setFieldValue(
			"requiredLanguages",
			(formik.values.requiredLanguages || []).map((l) =>
				l.name === name ? { ...l, required: !l.required } : l,
			),
		);
	};

	const canSubmit = useMemo(() => {
		return (
			formik.values.title.trim().length >= 2 &&
			formik.values.description.trim().length >= 2
		);
	}, [formik.values.title, formik.values.description]);

	return (
		<div className="min-h-screen bg-gray-50">
			{submitError && (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{submitError}
				</div>
			)}

			<div className="mx-auto max-w-6xl px-4 py-10">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold text-gray-900">
						{isEdit ? "Edit Job" : "Post a Job"}
					</h1>
				</div>

				<form
					onSubmit={formik.handleSubmit}
					className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-10"
				>
					{apiError ? (
						<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
							{apiError}
						</div>
					) : null}

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{/* Job Title */}
						<div className="md:col-span-2">
							<label className="block">
								<span className="text-sm font-medium text-gray-700">
									Job Title
								</span>
								<input
									name="title"
									value={formik.values.title}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder='e.g., "Backend Engineer"'
									className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
								/>
								<FieldError formik={formik} name="title" />
							</label>
						</div>

						{/* Employment Type */}
						<label className="block">
							<span className="text-sm font-medium text-gray-700">
								Employment Type
							</span>
							<select
								name="jobType"
								value={formik.values.jobType}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
							>
								{JOB_TYPES.map((x) => (
									<option key={x.value} value={x.value}>
										{x.label}
									</option>
								))}
							</select>
							<FieldError formik={formik} name="jobType" />
						</label>

						{/* Experience Level */}
						<label className="block">
							<span className="text-sm font-medium text-gray-700">
								Experience Level
							</span>
							<select
								name="experienceLevel"
								value={formik.values.experienceLevel}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
							>
								{EXP_LEVELS.map((x) => (
									<option key={x.value} value={x.value}>
										{x.label}
									</option>
								))}
							</select>
							<FieldError formik={formik} name="experienceLevel" />
						</label>

						{/* Job Location */}
						<label className="block">
							<span className="text-sm font-medium text-gray-700">
								Job Location
							</span>
							<input
								name="location"
								value={formik.values.location}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="e.g., Remote, Riyadh, New York..."
								className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
							/>
						</label>

						{/* Salary */}
						<label className="block">
							<span className="text-sm font-medium text-gray-700">Salary</span>
							<input
								name="salary"
								type="number"
								value={formik.values.salary}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="e.g., 2000"
								className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
							/>
							<FieldError formik={formik} name="salary" />
						</label>

						{/* Description */}
						<div className="md:col-span-2">
							<label className="block">
								<span className="text-sm font-medium text-gray-700">
									Job Description
								</span>
								<textarea
									name="description"
									rows={8}
									value={formik.values.description}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Describe the role..."
									className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
								/>
								<FieldError formik={formik} name="description" />
							</label>
						</div>

						{/* Required Skills */}
						<div className="md:col-span-1">
							<p className="text-sm font-medium text-gray-700">
								Required Skills
							</p>
							<div className="mt-3 flex gap-2">
								<input
									value={skillInput}
									onChange={(e) => setSkillInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addSkill();
										}
									}}
									placeholder="Type a skill then Enter"
									className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
								/>
								<button
									type="button"
									onClick={addSkill}
									className="rounded-xl bg-fuchsia-700 px-4 py-3 text-sm font-semibold text-white hover:bg-fuchsia-800"
								>
									Add
								</button>
							</div>

							<div className="mt-4 flex flex-col gap-2">
								{(formik.values.requiredSkills || []).map((s) => (
									<div
										key={s.name}
										className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
									>
										<div className="text-sm text-gray-900">{s.name}</div>
										<div className="flex items-center gap-3">
											<label className="inline-flex items-center gap-2 text-xs text-gray-600">
												<input
													type="checkbox"
													checked={!!s.required}
													onChange={() => toggleSkillRequired(s.name)}
												/>
												Required
											</label>
											<button
												type="button"
												onClick={() => removeSkill(s.name)}
												className="text-gray-500 hover:text-gray-900"
											>
												×
											</button>
										</div>
									</div>
								))}
								{(formik.values.requiredSkills || []).length === 0 ? (
									<p className="text-sm text-gray-500">
										Add skills like Node.js, React...
									</p>
								) : null}
							</div>
						</div>

						{/* Required Languages */}
						<div className="md:col-span-1">
							<p className="text-sm font-medium text-gray-700">
								Required Languages
							</p>

							<div className="mt-3 flex flex-col gap-2 sm:flex-row">
								<input
									value={langInput}
									onChange={(e) => setLangInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addLanguage();
										}
									}}
									placeholder="Type a language then Enter"
									className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-fuchsia-600"
								/>
								<select
									value={langProf}
									onChange={(e) => setLangProf(e.target.value)}
									className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-fuchsia-600"
								>
									{LANG_PROF.map((x) => (
										<option key={x.value} value={x.value}>
											{x.label}
										</option>
									))}
								</select>
								<button
									type="button"
									onClick={addLanguage}
									className="rounded-xl bg-fuchsia-700 px-4 py-3 text-sm font-semibold text-white hover:bg-fuchsia-800"
								>
									Add
								</button>
							</div>

							<div className="mt-4 flex flex-col gap-2">
								{(formik.values.requiredLanguages || []).map((l) => (
									<div
										key={l.name}
										className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
									>
										<div className="text-sm text-gray-900">
											{l.name}{" "}
											<span className="text-gray-500">
												({l.minimumProficiency})
											</span>
										</div>

										<div className="flex items-center gap-3">
											<label className="inline-flex items-center gap-2 text-xs text-gray-600">
												<input
													type="checkbox"
													checked={!!l.required}
													onChange={() => toggleLanguageRequired(l.name)}
												/>
												Required
											</label>
											<button
												type="button"
												onClick={() => removeLanguage(l.name)}
												className="text-gray-500 hover:text-gray-900"
											>
												×
											</button>
										</div>
									</div>
								))}
								{(formik.values.requiredLanguages || []).length === 0 ? (
									<p className="text-sm text-gray-500">
										Add languages like English (BASIC)...
									</p>
								) : null}
							</div>
						</div>
					</div>

					{/* Buttons */}
					<div className="mt-8 flex flex-wrap gap-4">
						<button
							type="submit"
							disabled={busy || !canSubmit}
							className="rounded-xl bg-fuchsia-700 px-8 py-3 text-sm font-semibold text-white hover:bg-fuchsia-800 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{busy ? "Saving..." : isEdit ? "Save" : "Post"}
						</button>

						<button
							type="button"
							onClick={() => navigate("/employer/jobs")}
							className="rounded-xl border border-rose-300 bg-white px-8 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
						>
							Cancel
						</button>
					</div>

					{/* Edit load error */}
					{jobQuery.isError ? (
						<p className="mt-4 text-sm text-red-600">
							Failed to load job for edit.
						</p>
					) : null}
				</form>
			</div>
		</div>
	);
}
