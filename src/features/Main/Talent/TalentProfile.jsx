import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import defaultProfileImage from "../../../assets/images/profile-image.png";
import Loading from "../../../components/UI/Loading";
import { useTalentProfileQuery } from "../../../hooks/queries/talent/useTalentProfile";
import { useProfileEdit } from "../../../hooks/useProfileEdit";
import { useUploadAvatar } from "../../../hooks/useUploadAvatar";
import { queryKeys } from "../../../lib/queryKeys";
import {
	updateTalentProfile,
	updateTalentSkills,
	uploadTalentAvatar,
} from "../../../services/talent.service";
import { buildAvatarUrl } from "../../../utils/Helpers/avatar";

export default function TalentProfile() {
	const { data: profile, isLoading, isError, error } = useTalentProfileQuery();
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [titleDraft, setTitleDraft] = useState("");
	const [isEditingLevel, setIsEditingLevel] = useState(false);
	const [levelDraft, setLevelDraft] = useState("");
	const [isEditingBio, setIsEditingBio] = useState(false);
	const [bioDraft, setBioDraft] = useState("");
	const [isEditingSkills, setIsEditingskills] = useState(false);
	const [skillsDraft, setSkillsDraft] = useState([]);
	const [isEditingCert, setIsEditingCert] = useState(false);
	const [certDraft, setCertDraft] = useState({
		provider: profile?.cert?.provider ?? "",
		issued: profile?.cert?.issued ?? "",
		id: profile?.cert?.id ?? "",
	});

	const SKILL_LEVELS = [
		{ value: "BEGINNER", label: "Beginner" },
		{ value: "INTERMEDIATE", label: "Intermediate" },
		{ value: "ADVANCED", label: "Advanced" },
		{ value: "EXPERT", label: "Expert" },
	];
	//UI
	const EXPERIENCE_LEVELS = [
		{ value: "JUNIOR", label: "Junior" },
		{ value: "MID", label: "Mid-level" },
		{ value: "SENIOR", label: "Senior" },
		{ value: "EXPERT", label: "Expert" },
	];

	const qc = useQueryClient();

	//to display cached skills untill data is fetched
	const cachedSkills = qc.getQueryData(queryKeys.talentSkills)?.data?.skills;

	// 1) upload avatar
	const { fileRef, onPickAvatar, onAvatarChange, avatarError, avatarMutation } =
		useUploadAvatar({
			uploadFn: uploadTalentAvatar,
			fieldName: "avatar",
			invalidateKeys: [queryKeys.talentProfile, queryKeys.currentUser],
			validationOptions: {
				allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
				maxSizeMB: 5,
			},
		});

	// 2) get talent profile
	//const { data: res, isLoading, isError, error } = useTalentProfileQuery();

	const talentProfile = profile?.data?.talentProfile ?? null;

	console.log("talent profile-data: \n", talentProfile);

	// 3) update title
	const updateTitleMutation = useProfileEdit({
		mutationFn: (headline) => updateTalentProfile({ headline }),

		queryKey: queryKeys.talentProfile,

		optimisticUpdater: (old, headline) => ({
			...old,
			data: {
				...old.data,
				talentProfile: {
					...old.data?.talentProfile,
					headline, // string ✅
				},
			},
		}),

		invalidateKeys: [queryKeys.currentUser],
		successMsg: "Title updated successfully",
		errorMsg: "Failed to update title",
	});

	// 4) update Expert Level
	const updateLevelMutation = useProfileEdit({
		mutationFn: (experienceLevel) => updateTalentProfile({ experienceLevel }),
		queryKey: queryKeys.talentProfile,
		optimisticUpdater: (old, experienceLevel) => ({
			...old,
			data: {
				...old.data,
				talentProfile: {
					...old.data?.talentProfile,
					experienceLevel,
				},
			},
		}),
		invalidateKeys: [queryKeys.currentUser],
		successMsg: "Level updated successfully",
		errorMsg: "Failed to update level",
	});
	// 5) update bio
	const updateBioMutation = useProfileEdit({
		mutationFn: (bio) => updateTalentProfile({ bio }),
		queryKey: queryKeys.talentProfile,
		optimisticUpdater: (old, bio) => ({
			...old,
			data: {
				...old.data,
				talentProfile: {
					...old.data?.talentProfile,
					bio,
				},
			},
		}),
		invalidateKeys: [queryKeys.currentUser],
		successMsg: "Bio updated successfully",
		errorMsg: "Failed to update bio",
	});
	// 6) update experience

	// 7) update skills
	const updateSkillsMutation = useMutation({
		mutationFn: (skillsPayload) =>
			updateTalentSkills({ skills: skillsPayload }),
		onSuccess: (res) => {
			const skillsFromApi = res?.data?.skills ?? res?.data?.data?.skills ?? [];

			qc.setQueryData(queryKeys.talentSkills, {
				ok: true,
				data: { skills: skillsFromApi },
			});

			toast.success("Skills updated successfully");
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to update skills");
		},
	});

	const skillsUi = useMemo(() => {
		return cachedSkills?.length
			? cachedSkills
			: (talentProfile?.skills ?? []).map((s) => ({
					skillId: s.skillId,
					name: s.name ?? "",
					level: s.level ?? "BEGINNER",
				}));
	}, [cachedSkills, talentProfile?.skills]);

	// 8) update certifications
	const profileCompletion = "70%";
	const profileAvatar = talentProfile?.avatarPublicId
		? buildAvatarUrl(talentProfile?.avatarPublicId)
		: defaultProfileImage;

	// handle title
	useEffect(() => {
		if (!isEditingTitle) {
			setTitleDraft(talentProfile?.headline ?? "");
		}
	}, [talentProfile?.headline, isEditingTitle]);

	// handle level
	useEffect(() => {
		if (!isEditingLevel) {
			setLevelDraft(talentProfile?.experienceLevel ?? "EXPERT");
		}
	}, [talentProfile?.experienceLevel, isEditingLevel]);

	// handle skills

	// biome-ignore lint/correctness/useExhaustiveDependencies: <>
	useEffect(() => {
		if (!isEditingSkills) {
			const initial =
				skillsUi?.map((s) => ({
					skillId: s.skillId,
					name: s.name ?? "",
					level: s.level ?? "BEGINNER",
				})) ?? [];

			setSkillsDraft(
				initial.length ? initial : [{ name: "", level: "BEGINNER" }],
			);
		}
	}, [isEditingSkills, cachedSkills, talentProfile?.skills]);

	//handle certificate
	useEffect(() => {
		// لو profile اتحدّث من السيرفر حدّثي draft (بس لو مش في edit)
		if (!isEditingCert) {
			setCertDraft({
				provider: profile?.cert?.provider ?? "",
				issued: profile?.cert?.issued ?? "",
				id: profile?.cert?.id ?? "",
			});
		}
	}, [profile, isEditingCert]);

	/******** Skills Helpers ************/
	const onEditSkills = () => {
		setSkillsDraft(
			talentProfile.skills.map((skill) => ({
				name: skill.name,
				level: skill.level,
			})),
		);
	};

	const addSkillRow = () => {
		setSkillsDraft((prev) => [...prev, { name: "", level: "BEGINNER" }]);
	};

	//note
	// ui only there is no endpoin for deleting skill
	const removeSkillRow = (index) => {
		setSkillsDraft((prev) => prev.filter((_, i) => i !== index));
	};

	const updateSkillRow = (index, patch) => {
		setSkillsDraft((prev) =>
			prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
		);
	};

	const onSaveSkills = () => {
		const cleaned = skillsDraft
			.map((s) => ({
				name: (s.name || "").trim(),
				level: s.level || "BEGINNER",
			}))
			.filter((s) => s.name.length);

		setIsEditingskills(false);
		updateSkillsMutation.mutate(cleaned);
	};

	const onCancelSkills = () => {
		const initial =
			skillsUi?.map((s) => ({
				skillId: s.skillId,
				name: s.name ?? "",
				level: s.level ?? "BEGINNER",
			})) ?? [];

		setSkillsDraft(
			initial.length ? initial : [{ name: "", level: "BEGINNER" }],
		);
		setIsEditingskills(false);
	};

	// will be deleted after integration

	const onAddCert = () => console.log("add certification");
	const onDeleteCert = () => console.log("delete certification");
	const onSaveCert = () => console.log("save certification");

	// handle loading and errors
	if (isLoading) return <Loading />;
	if (isError) return <div>{error.message}</div>;

	return (
		<>
			<Helmet>
				<title>My Profile</title>
			</Helmet>
			<div className="min-h-screen bg-white">
				<main className="max-w-5xl mx-auto px-6 py-8">
					{/* Top Profile Card */}
					<section className="bg-white border rounded-xl p-6 flex items-center justify-between ">
						<div className="flex items-center gap-4 pb-4">
							{/* profile image */}
							<div className="flex flex-col items-center ">
								<div className="relative  items-center gap-4">
									<img
										src={profileAvatar || defaultProfileImage}
										alt="profile"
										className="w-28 h-28 rounded-full object-cover   border border-gray-200"
									/>
									<button
										type="button"
										onClick={onPickAvatar}
										disabled={avatarMutation.isPending}
										className="w-6 h-6 rounded-full bg-purple-600 text-white absolute right-0  bottom-0 -translate-x-1 -translate-y-2/3 items-center justify-center"
										aria-label="Edit profile"
										title="Edit profile"
									>
										{avatarMutation.isPending ? (
											<i className="fa-solid fa-spinner animate-spin text-xs"></i>
										) : (
											<i className="fa-solid fa-pencil text-xs "></i>
										)}
									</button>
									{/* invisible input */}
									<input
										type="file"
										ref={fileRef}
										accept="image/*"
										className="hidden"
										onChange={onAvatarChange}
									/>
								</div>

								{/* photo upload errors */}
								<div className="pt-2">
									{avatarError && (
										<p className="mt-2 text-xs text-red-600">{avatarError}</p>
									)}
									{avatarMutation.isError && (
										<p className="mt-3 text-xs text-red-600">
											Failed to upload photo:{" "}
											{avatarMutation.error?.message || "Unknown error"}
										</p>
									)}
								</div>
							</div>

							{/* name and location */}
							<div className="">
								<div className="flex items-center gap-2">
									<h2 className="text-lg font-semibold text-gray-900">
										{`${talentProfile?.firstName}  ${talentProfile?.lastName}`}
									</h2>
								</div>

								<p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
									<i className="fa-solid fa-location-dot"></i>
									{talentProfile?.location ?? "_"}
								</p>
							</div>
						</div>
						{/* profile completion */}
						<p className="text-sm text-fuchsia-600 font-medium ">
							Profile {profileCompletion}% Complete
						</p>
					</section>

					{/* About Me */}
					<section className="bg-white border rounded-xl p-6 mt-6 ">
						<div className="flex items-start justify-between gap-4 ">
							<div className="min-w-0  flex-grow">
								{/* title */}

								<div className="flex items-center gap-2">
									{!isEditingTitle ? (
										<div className="flex gap-2 justify-between w-full">
											<div className="text-gray-900 w-1/2 text-3xl ">
												{talentProfile?.headline ?? "Title"}
											</div>
											{/* edit icon */}
											<button
												type="button"
												onClick={() => setIsEditingTitle(true)}
												className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0"
												aria-label="Edit title"
											>
												<i className="fa-solid fa-pencil text-sm"></i>
											</button>
										</div>
									) : (
										// title input
										<div className="flex gap-2 w-full">
											<input
												name="title"
												value={titleDraft}
												onChange={(e) => setTitleDraft(e.target.value)}
												className=" h-8 w-3/4 rounded-md focus:outline-fuchsia-800 px-3 text-sm hover:outline-fuchsia-800 p-3"
												placeholder="Title"
												disabled={updateTitleMutation.isPending}
											/>
											{/* save & cancel */}
											<button
												type="button"
												onClick={() => {
													console.log("save title:", titleDraft);
													const trimmed = titleDraft.trim();

													setIsEditingTitle(false);
													updateTitleMutation.mutate(trimmed);
												}}
												disabled={updateTitleMutation.isPending}
												className="px-2 py-1 text-xs rounded bg-fuchsia-800 bg-opacity-60 hover:bg-opacity-70 text-white"
											>
												{updateTitleMutation.isPending ? "Saving..." : "Save"}
											</button>

											<button
												type="button"
												onClick={() => {
													setTitleDraft(() => profile?.title || "");
													setIsEditingTitle(false);
												}}
												disabled={updateTitleMutation.isPending}
												className="px-2 py-1 text-xs rounded border border-fuchsia-800 text-fuchsia-800 hover:bg-slate-200 hover:bg-opacity-30 "
											>
												Cancel
											</button>
											{updateTitleMutation.isError && (
												<p className="text-xs text-red-600 ml-2">
													{updateTitleMutation.error?.message ||
														"Failed to update title"}
												</p>
											)}
										</div>
									)}
								</div>

								{/* level */}
								{!isEditingLevel ? (
									<div className="flex items-center gap-2 mt-4">
										<p className="text-gray-700">
											{talentProfile?.experienceLevel || "EXPERT"}
										</p>
										<button
											type="button"
											onClick={() => setIsEditingLevel(true)}
											className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center"
										>
											<i className="fa-solid fa-pencil text-sm"></i>
										</button>
									</div>
								) : (
									<div className="flex items-center gap-2 mt-4">
										<select
											value={levelDraft}
											onChange={(e) => setLevelDraft(e.target.value)}
											disabled={updateLevelMutation.isPending}
											className="h-9 rounded-md border px-2 focus:outline-fuchsia-800"
										>
											{EXPERIENCE_LEVELS.map((opt) => (
												<option key={opt.value} value={opt.value}>
													{opt.label}
												</option>
											))}
										</select>

										<button
											type="button"
											onClick={() => {
												setIsEditingLevel(false);
												updateLevelMutation.mutate(levelDraft);
											}}
											disabled={updateLevelMutation.isPending}
											className="px-2 py-1 text-xs rounded bg-fuchsia-800 bg-opacity-60 text-white"
										>
											{updateLevelMutation.isPending ? "Saving..." : "Save"}
										</button>

										<button
											type="button"
											onClick={() => {
												setIsEditingLevel(false);
												setLevelDraft(
													talentProfile?.experienceLevel ?? "EXPERT",
												);
											}}
											disabled={updateLevelMutation.isPending}
											className="px-2 py-1 text-xs rounded border border-fuchsia-800 text-fuchsia-800"
										>
											Cancel
										</button>
									</div>
								)}

								{/* bio */}
								{/* bio */}
								{!isEditingBio ? (
									<div className="flex items-start justify-between gap-4 mt-4">
										<p className="text-gray-600 leading-relaxed">
											{talentProfile?.bio || "Write a short bio..."}
										</p>

										<button
											type="button"
											onClick={() => setIsEditingBio(true)}
											className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1"
											aria-label="Edit bio"
											title="Edit bio"
										>
											<i className="fa-solid fa-pencil text-sm"></i>
										</button>
									</div>
								) : (
									<div className="mt-4">
										<textarea
											value={bioDraft}
											onChange={(e) => setBioDraft(e.target.value)}
											disabled={updateBioMutation.isPending}
											rows={4}
											className="w-full rounded-md border px-3 py-2 text-sm focus:outline-fuchsia-800"
											placeholder="Write your bio..."
										/>

										<div className="flex items-center gap-2 mt-2">
											<button
												type="button"
												onClick={() => {
													const trimmed = bioDraft.trim();
													setIsEditingBio(false);
													updateBioMutation.mutate(trimmed);
												}}
												disabled={updateBioMutation.isPending}
												className="px-3 py-2 text-xs rounded bg-fuchsia-800 bg-opacity-60 hover:bg-opacity-70 text-white"
											>
												{updateBioMutation.isPending ? "Saving..." : "Save"}
											</button>

											<button
												type="button"
												onClick={() => {
													setIsEditingBio(false);
													setBioDraft(talentProfile?.bio ?? "");
												}}
												disabled={updateBioMutation.isPending}
												className="px-3 py-2 text-xs rounded border border-fuchsia-800 text-fuchsia-800 hover:bg-slate-200 hover:bg-opacity-30"
											>
												Cancel
											</button>

											{updateBioMutation.isError && (
												<p className="text-xs text-red-600 ml-2">
													{updateBioMutation.error?.message ||
														"Failed to update bio"}
												</p>
											)}
										</div>
									</div>
								)}

								{/* skills */}
								<div className="mt-6">
									<p className="text-sm font-medium text-gray-700 mb-2">
										Skills:
									</p>
									<ul className="list-disc ml-5 space-y-2 text-gray-700">
										{(talentProfile?.skills ?? []).map((s) => (
											<li key={s.skillId}>
												{s.name} {s.level}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</section>

					{/* Work Experience */}
					<section className="bg-white border rounded-xl p-6 mt-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							Work Experience
						</h3>
						<p className="text-gray-600">{profile.work}</p>
					</section>

					{/* Skills Chips */}
					{/* <section className="bg-white border rounded-xl p-6 mt-6">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-gray-900">Skills</h3>

							<button
								type="button"
								onClick={() => onEdit("chips")}
								className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center"
								aria-label="Edit skills"
							>
								<i className="fa-solid fa-pencil text-sm"></i>
							</button>
						</div>

						<div className="flex flex-wrap gap-3 mt-4">
							{profile?.chips?.map((chip) => (
								<span
									key={chip}
									className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm"
								>
									{chip}
								</span>
							))}
						</div>
					</section>
					 */}

					{/* Skills */}
					<section className="bg-white border rounded-xl p-6 mt-6">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-gray-900">Skills</h3>

							{!isEditingSkills && (
								<button
									type="button"
									onClick={() => setIsEditingskills(true)}
									className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center"
									aria-label="Edit skills"
									title="Edit skills"
								>
									<i className="fa-solid fa-pencil text-sm"></i>
								</button>
							)}
						</div>

						{/* VIEW MODE (from talent/skills) */}
						{!isEditingSkills ? (
							<div className="flex flex-wrap gap-3 mt-4">
								{skillsUi.length ? (
									skillsUi.map((s) => (
										<span
											key={s.skillId}
											className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm"
										>
											{s.name} • {s.level}
										</span>
									))
								) : (
									<p className="text-sm text-gray-500 mt-3">
										No skills added yet.
									</p>
								)}
							</div>
						) : (
							/* EDIT MODE */
							<div className="mt-4">
								<div className="space-y-3">
									{skillsDraft.map((row, idx) => (
										<div
											key={row.skillId ?? `row-${idx}`}
											className="flex items-center gap-2"
										>
											<input
												value={row.name}
												onChange={(e) =>
													updateSkillRow(idx, { name: e.target.value })
												}
												disabled={updateSkillsMutation.isPending}
												placeholder="Skill (e.g. Figma)"
												className="flex-1 h-9 rounded-md border px-3 text-sm focus:outline-fuchsia-800"
											/>

											<select
												value={row.level}
												onChange={(e) =>
													updateSkillRow(idx, { level: e.target.value })
												}
												disabled={updateSkillsMutation.isPending}
												className="h-9 rounded-md border px-2 text-sm focus:outline-fuchsia-800"
											>
												{SKILL_LEVELS.map((opt) => (
													<option key={opt.value} value={opt.value}>
														{opt.label}
													</option>
												))}
											</select>

											<button
												type="button"
												onClick={() => removeSkillRow(idx)}
												disabled={
													updateSkillsMutation.isPending ||
													skillsDraft.length === 1
												}
												className="w-9 h-9 rounded-md border border-purple-600 text-purple-600 flex items-center justify-center"
												aria-label="Remove skill"
												title="Remove"
											>
												<i className="fa-solid fa-trash text-sm"></i>
											</button>
										</div>
									))}
								</div>

								<div className="flex items-center gap-2 mt-4">
									<button
										type="button"
										onClick={addSkillRow}
										disabled={updateSkillsMutation.isPending}
										className="px-3 py-2 text-xs rounded border border-purple-600 text-purple-600 hover:bg-slate-200 hover:bg-opacity-30"
									>
										<i className="fa-solid fa-plus mr-1"></i> Add
									</button>

									<button
										type="button"
										onClick={onSaveSkills}
										disabled={updateSkillsMutation.isPending}
										className="px-3 py-2 text-xs rounded bg-fuchsia-800 bg-opacity-60 hover:bg-opacity-70 text-white"
									>
										{updateSkillsMutation.isPending ? "Saving..." : "Save"}
									</button>

									<button
										type="button"
										onClick={onCancelSkills}
										disabled={updateSkillsMutation.isPending}
										className="px-3 py-2 text-xs rounded border border-fuchsia-800 text-fuchsia-800 hover:bg-slate-200 hover:bg-opacity-30"
									>
										Cancel
									</button>

									{updateSkillsMutation.isError && (
										<p className="text-xs text-red-600 ml-2">
											{updateSkillsMutation.error?.message ||
												"Failed to update skills"}
										</p>
									)}
								</div>
							</div>
						)}
					</section>

					{/* Certification */}
					<section className="bg-white border rounded-xl p-6 mt-6">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-gray-900">
								Certification
							</h3>

							<button
								type="button"
								onClick={onAddCert}
								className="w-8 h-8 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center"
								aria-label="Add certification"
							>
								<i className="fa-solid fa-plus"></i>
							</button>
						</div>

						<div className="mt-5 border-t pt-5 flex items-start justify-between gap-4">
							<div className="w-full">
								<div className="flex items-center justify-between">
									<p className="font-semibold text-gray-900">
										{talentProfile?.certificates?.name}
									</p>

									{/* زر القلم */}
									<button
										type="button"
										onClick={() => setIsEditingCert(true)}
										className="w-10 h-10 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center shrink-0"
										aria-label="Edit certification"
									>
										<i className="fa-solid fa-pen"></i>
									</button>
								</div>

								{!isEditingCert ? (
									<>
										<p className="text-sm text-gray-600 mt-2">
											Provider: {talentProfile?.certificates?.provider}
										</p>
										<p className="text-sm text-gray-600">
											Issued: {talentProfile?.certificates?.issueDate}
										</p>
										<p className="text-sm text-gray-600">
											Certification ID: {talentProfile?.certificates?.id}
										</p>
									</>
								) : (
									<div className="mt-4 space-y-3">
										<div>
											<label htmlFor="" className="text-sm text-gray-700">
												Provider:
											</label>
											<input
												className="mt-1 w-full border rounded-lg p-2"
												value={certDraft.provider}
												onChange={(e) =>
													setCertDraft((p) => ({
														...p,
														provider: e.target.value,
													}))
												}
											/>
										</div>

										<div>
											<label htmlFor="" className="text-sm text-gray-700">
												Issued:
											</label>
											<input
												className="mt-1 w-full border rounded-lg p-2"
												value={certDraft.issued}
												onChange={(e) =>
													setCertDraft((p) => ({
														...p,
														issued: e.target.value,
													}))
												}
											/>
										</div>

										<div>
											<label htmlFor="" className="text-sm text-gray-700">
												Certification ID:
											</label>
											<input
												className="mt-1 w-full border rounded-lg p-2"
												value={certDraft.id}
												onChange={(e) =>
													setCertDraft((p) => ({ ...p, id: e.target.value }))
												}
											/>
										</div>

										<div className="flex gap-2 pt-2">
											<button
												type="button"
												className="px-4 py-2 rounded-lg bg-purple-600 text-white"
												onClick={onSaveCert}
											>
												Save
											</button>
											<button
												type="button"
												className="px-4 py-2 rounded-lg border"
												onClick={() => {
													setIsEditingCert(false);
													setCertDraft({
														provider: talentProfile?.certificates?.name ?? "",
														issued: profile?.cert?.issued ?? "",
														id: profile?.cert?.id ?? "",
													});
												}}
											>
												Cancel
											</button>
										</div>
									</div>
								)}
							</div>

							{/* زرار Delete زي ما هو */}
							<button
								type="button"
								onClick={onDeleteCert}
								className="w-10 h-10 rounded-full border border-purple-600 text-purple-600 flex items-center justify-center shrink-0"
								aria-label="Delete certification"
							>
								<i className="fa-solid fa-trash"></i>
							</button>
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
