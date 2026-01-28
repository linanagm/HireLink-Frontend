import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Badge from "../../../../components/UI/Badge";
import Chip from "../../../../components/UI/Chip";
import Loading from "../../../../components/UI/Loading";
import Modal from "../../../../components/UI/Modal";
import PencilIcon from "../../../../components/UI/PencilIcon";
import { useTalentProfileQuery } from "../../../../hooks/queries/talent/useTalentProfile";
import { queryKeys } from "../../../../lib/queryKeys";
import {
	removeTalentCertificaties,
	removeTalentLanguage,
	removeTalentSkill,
	updateTalentProfile,
	upSertTalentCertificaties,
	upSertTalentLanguage,
	upSertTalentSkill,
} from "../../../../services/talent.service";
import { buildAvatarUrl } from "../../../../utils/Helpers/avatar";
import { buildCloudinaryUrl } from "../../../../utils/Helpers/cloudinary";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ResumeCard from "./components/ResumeCard";
import {
	useDeleteTalentResumeMutation,
	useUploadTalentResumeMutation,
} from "./hooks/mutations/useTalentResume";
import { calcProfileCompletion } from "./lib/profileCompletion";

const SkillsSection = React.memo(function SkillsSection({
	skills,
	isOpen,
	onOpen,
	onClose,
	queryKey,
}) {
	const qc = useQueryClient();
	const [skillDraft, setSkillDraft] = useState("");
	const [pendingRemove, setPendingRemove] = useState(null);

	const upsertSkillM = useMutation({
		mutationFn: (name) => upSertTalentSkill({ name, level: "INTERMEDIATE" }),
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message || "Skill failed");
			await qc.invalidateQueries({ queryKey });
			setSkillDraft("");
		},
		onError: (e) => toast.error(e?.message || "Skill failed"),
	});

	const removeSkillM = useMutation({
		mutationFn: (name) => removeTalentSkill({ name }),
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message || "Remove failed");
			await qc.invalidateQueries({ queryKey });
			setPendingRemove(null);
		},
		onError: (e) => toast.error(e?.message || "Remove failed"),
	});

	return (
		<>
			<section className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-bold">Skills</h3>
					<div className="p-2 rounded-xl hover:bg-slate-50 border">
						<PencilIcon onClick={onOpen} ariaLabel="add skill" />
					</div>
				</div>

				<div className="mt-4 flex flex-wrap gap-2">
					{skills.map((label) => (
						<Chip key={label}>{label}</Chip>
					))}
				</div>
			</section>
			{/* Edit Skill Modal */}
			<Modal open={isOpen} title="Edit skills" onClose={onClose}>
				<div className="flex gap-2">
					<input
						className="flex-1 rounded-xl border p-3"
						placeholder="Add skill (e.g. TypeScript)"
						value={skillDraft}
						onChange={(e) => setSkillDraft(e.target.value)}
						disabled={upsertSkillM.isPending}
					/>
					<button
						type="button"
						className="px-4 rounded-xl bg-purple-600 text-white font-semibold disabled:opacity-60"
						disabled={
							!skillDraft.trim() ||
							upsertSkillM.isPending ||
							upsertSkillM.isLoading
						}
						onClick={() => upsertSkillM.mutate(skillDraft.trim())}
					>
						{upsertSkillM.isPending ? "Adding..." : "Add"}
					</button>
				</div>
				{/* Skills List */}
				{/* <div className="mt-4 flex flex-wrap gap-2">
					{skills.map((label) => (
						<div
							key={label}
							className="flex items-center gap-2 border rounded-full px-3 py-2"
						>
							<span className="text-sm font-semibold">{label}</span>
							<button
								type="button"
								className="text-red-600 text-sm font-bold"
								onClick={() => removeSkillM.mutate(label)}
							>
								×
							</button>
						</div>
					))}
				</div> */}

				<div className="mt-4 flex flex-wrap gap-2">
					{skills.map((label) => {
						const isRemoving = pendingRemove === label;

						return (
							<div
								key={label}
								className={`flex items-center gap-2 border rounded-full px-3 py-2 transition
                  ${isRemoving ? "opacity-60" : ""}`}
							>
								<span className="text-sm font-semibold">{label}</span>

								<button
									type="button"
									className="text-red-600 text-sm font-bold disabled:opacity-50"
									disabled={isRemoving}
									onClick={() => {
										setPendingRemove(label);
										removeSkillM.mutate(label);
									}}
								>
									{isRemoving ? "…" : "×"}
								</button>
							</div>
						);
					})}
				</div>
			</Modal>
		</>
	);
});

const LanguagesSection = React.memo(function LanguagesSection({
	languages,
	isOpen,
	onOpen,
	onClose,
	queryKey,
}) {
	const qc = useQueryClient();

	const [langDraft, setLangDraft] = useState("");
	const [pendingRemove, setPendingRemove] = useState(null);

	const upsertLangM = useMutation({
		mutationFn: (name) =>
			upSertTalentLanguage({ name, proficiency: "INTERMEDIATE" }),
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message || "Language failed");
			await qc.invalidateQueries({ queryKey });
			setLangDraft("");
		},
		onError: (e) => toast.error(e?.message || "Language failed"),
	});

	const removeLangM = useMutation({
		mutationFn: (name) => removeTalentLanguage({ name }),
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message || "Remove failed");
			await qc.invalidateQueries({ queryKey });
			setPendingRemove(null);
		},
		onError: (e) => {
			toast.error(e?.message || "Remove failed");
			setPendingRemove(null);
		},
	});

	return (
		<>
			{/* ===== Languages Preview ===== */}
			<section className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-bold">Languages</h3>
					<div className="p-2 rounded-xl hover:bg-slate-50 border">
						<PencilIcon onClick={onOpen} ariaLabel="add language" />
					</div>
				</div>

				<div className="mt-4 flex flex-wrap gap-2">
					{languages.map((label) => (
						<Chip key={label}>{label}</Chip>
					))}
				</div>
			</section>

			{/* ===== Edit Languages Modal ===== */}
			<Modal open={isOpen} title="Edit languages" onClose={onClose}>
				{/* Add language */}
				<div className="flex gap-2">
					<input
						className="flex-1 rounded-xl border p-3"
						placeholder="Add language (e.g. French)"
						value={langDraft}
						onChange={(e) => setLangDraft(e.target.value)}
						disabled={upsertLangM.isPending}
					/>

					<button
						type="button"
						className="px-4 rounded-xl bg-purple-600 text-white font-semibold disabled:opacity-60"
						disabled={!langDraft.trim() || upsertLangM.isPending}
						onClick={() => upsertLangM.mutate(langDraft.trim())}
					>
						{upsertLangM.isPending ? "Adding…" : "Add"}
					</button>
				</div>

				{/* Languages list */}
				<div className="mt-4 flex flex-wrap gap-2">
					{languages.map((label) => {
						const isRemoving = pendingRemove === label;

						return (
							<div
								key={label}
								className={`flex items-center gap-2 border rounded-full px-3 py-2 transition
                  ${isRemoving ? "opacity-60" : ""}`}
							>
								<span className="text-sm font-semibold">{label}</span>

								<button
									type="button"
									className="text-red-600 text-sm font-bold disabled:opacity-50"
									disabled={isRemoving}
									onClick={() => {
										setPendingRemove(label);
										removeLangM.mutate(label);
									}}
								>
									{isRemoving ? "…" : "×"}
								</button>
							</div>
						);
					})}
				</div>
			</Modal>
		</>
	);
});

const AboutSection = React.memo(function AboutSection({
	headline,
	level,
	bio,
	topSkills,
	onEdit,
}) {
	return (
		<section className="bg-white border border-slate-200 rounded-2xl p-8 mb-4 mt-4">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-xl font-bold text-slate-900">
						{headline || "UX/UI Designer | Frontend Developer"}
					</h2>
					<div className="mt-2">
						<Badge>{level || "Expert"}</Badge>
					</div>
				</div>

				<div className="p-2 rounded-xl hover:bg-slate-50 border">
					<PencilIcon onClick={onEdit} ariaLabel="Edit Profile" />
				</div>
			</div>

			<p className="mt-4 text-slate-700 leading-relaxed">
				{bio ||
					"Write a short bio that describes you. Humans love that sort of thing."}
			</p>

			<div className="mt-4">
				<div className="font-semibold text-slate-900 mb-2">Skills:</div>
				<ul className="list-disc pl-6 text-slate-700 space-y-1">
					{topSkills.map((label) => (
						<li key={label}>{label}</li>
					))}
				</ul>
			</div>
		</section>
	);
});

const CertificatesSection = React.memo(function CertificatesSection({
	certificates,
	queryKey,
}) {
	const qc = useQueryClient();

	const [certModalOpen, setCertModalOpen] = useState(false);
	const [editingCert, setEditingCert] = useState(null);

	const [certDraft, setCertDraft] = useState({
		name: "",
		issuer: "",
		credentialId: "",
		credentialUrl: "",
		issueDate: "",
		expiryDate: "",
	});

	const closeCertModal = useCallback(() => {
		setCertModalOpen(false);
		setEditingCert(null);
	}, []);

	// sync draft when editing changes
	useEffect(() => {
		if (!editingCert) {
			setCertDraft({
				name: "",
				issuer: "",
				credentialId: "",
				credentialUrl: "",
				issueDate: "",
				expiryDate: "",
			});
			return;
		}

		setCertDraft({
			name: editingCert.name ?? "",
			issuer: editingCert.issuer ?? "",
			credentialId: editingCert.credentialId ?? "",
			credentialUrl: editingCert.credentialUrl ?? "",
			issueDate: editingCert.issueDate
				? editingCert.issueDate.split("T")[0]
				: "",
			expiryDate: editingCert.expiryDate
				? editingCert.expiryDate.split("T")[0]
				: "",
		});
	}, [editingCert]);

	const upsertCertM = useMutation({
		mutationFn: upSertTalentCertificaties,
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message);
			await qc.invalidateQueries({ queryKey });
			toast.success(editingCert ? "Certificate updated" : "Certificate added");
			closeCertModal();
		},
		onError: (e) => toast.error(e?.message || "Operation failed"),
	});

	const deleteCertM = useMutation({
		mutationFn: (certificateId) => removeTalentCertificaties({ certificateId }),
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message);
			await qc.invalidateQueries({ queryKey });
			toast.success("Certificate deleted");
		},
		onError: (e) => toast.error(e?.message || "Delete failed"),
	});

	const submitCert = useCallback(() => {
		if (!certDraft.name.trim() || !certDraft.issuer.trim()) {
			toast.error("Name and provider are required");
			return;
		}

		const payload = {
			name: certDraft.name.trim(),
			issuer: certDraft.issuer.trim(),
		};

		if (certDraft.credentialId)
			payload.credentialId = certDraft.credentialId.trim();
		if (certDraft.credentialUrl)
			payload.credentialUrl = certDraft.credentialUrl.trim();
		if (certDraft.issueDate) payload.issueDate = certDraft.issueDate;
		if (certDraft.expiryDate) payload.expiryDate = certDraft.expiryDate;
		if (editingCert?.certificateId)
			payload.certificateId = editingCert.certificateId;

		upsertCertM.mutate(payload);
	}, [certDraft, editingCert, upsertCertM]);

	return (
		<section className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold">Certification</h3>

				<button
					type="button"
					onClick={() => {
						setEditingCert(null);
						setCertModalOpen(true);
					}}
					className="w-9 h-9 rounded-full border hover:bg-slate-50"
				>
					+
				</button>
			</div>

			<div className="mt-4 space-y-4">
				{certificates.length === 0 ? (
					<div className="text-sm text-slate-500">
						No certificates yet. Add one.
					</div>
				) : (
					certificates.map((c) => (
						<div key={c.certificateId} className="border rounded-xl p-4">
							<div className="font-bold">{c.name}</div>
							<div className="text-sm text-slate-600">
								Provider : {c.issuer ?? ""}
							</div>
							<div className="text-sm text-slate-600">
								Issued : {c.issueDate ? String(c.issueDate).split("T")[0] : "-"}
							</div>
							<div className="text-sm text-slate-600">
								CertificateId : {c.credentialId ?? "-"}
							</div>

							<div className="flex gap-2 mt-3">
								<button
									type="button"
									onClick={() => {
										setEditingCert(c);
										setCertModalOpen(true);
									}}
								>
									Edit
								</button>

								<button
									type="button"
									className="text-red-600"
									onClick={() => {
										if (confirm("Delete certificate?")) {
											deleteCertM.mutate(c.certificateId);
										}
									}}
								>
									Delete
								</button>
							</div>
						</div>
					))
				)}
			</div>

			<Modal
				open={certModalOpen}
				title={editingCert ? "Edit certificate" : "Add certificate"}
				onClose={closeCertModal}
				footer={
					<div className="flex gap-3 justify-end">
						<button
							type="button"
							className="px-4 py-2 rounded-xl border hover:bg-slate-50 font-semibold"
							onClick={closeCertModal}
							disabled={upsertCertM.isPending || upsertCertM.isLoading}
						>
							Cancel
						</button>

						<button
							type="button"
							className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold disabled:opacity-60"
							onClick={submitCert}
							disabled={upsertCertM.isPending || upsertCertM.isLoading}
						>
							{editingCert ? "Save" : "Add"}
						</button>
					</div>
				}
			>
				<div className="space-y-4">
					<div>
						<label htmlFor="" className="text-sm font-semibold text-slate-700">
							Name *
						</label>
						<input
							className="mt-1 w-full rounded-xl border p-3"
							value={certDraft.name}
							onChange={(e) =>
								setCertDraft((p) => ({ ...p, name: e.target.value }))
							}
							placeholder="e.g. AWS Certified Developer"
						/>
					</div>

					<div>
						<label htmlFor="" className="text-sm font-semibold text-slate-700">
							Provider
						</label>
						<input
							className="mt-1 w-full rounded-xl border p-3"
							value={certDraft.issuer}
							onChange={(e) =>
								setCertDraft((p) => ({ ...p, issuer: e.target.value }))
							}
							placeholder="e.g. Amazon"
						/>
					</div>

					<div>
						<label htmlFor="" className="text-sm font-semibold text-slate-700">
							Issued
						</label>
						<input
							className="mt-1 w-full rounded-xl border p-3"
							value={certDraft.issueDate}
							onChange={(e) =>
								setCertDraft((p) => ({ ...p, issueDate: e.target.value }))
							}
							placeholder="e.g. 2026-01"
						/>
					</div>

					<div>
						<label htmlFor="" className="text-sm font-semibold text-slate-700">
							CertificateId
						</label>
						<input
							className="mt-1 w-full rounded-xl border p-3"
							value={certDraft.credentialId}
							onChange={(e) =>
								setCertDraft((p) => ({ ...p, credentialId: e.target.value }))
							}
							placeholder="e.g. ABC-123"
						/>
					</div>
				</div>
			</Modal>
		</section>
	);
});

export default function TalentProfilePage() {
	// get profile data from get/talent profile return data
	const { data, isLoading, isError, error } = useTalentProfileQuery();

	// get profile data from  data
	const profile = data?.data?.talentProfile;

	// list instead of maping
	const skillsList = useMemo(() => {
		return (profile?.skills || []).map((s) => s?.name || String(s));
	}, [profile?.skills]);

	const languagesList = useMemo(() => {
		return (profile?.languages || []).map((l) => l?.name || String(l));
	}, [profile?.languages]);

	// ready callback to open
	const openSkillsModal = useCallback(() => setEditMode("skills"), []);
	const openLanguagesModal = useCallback(() => setEditMode("languages"), []);
	const openProfileModal = useCallback(() => setEditMode("profile"), []);
	const topSkills = useMemo(() => skillsList.slice(0, 3), [skillsList]);

	//************************** */

	const qc = useQueryClient();

	// which modal is open
	const [editMode, setEditMode] = useState(null);
	// "profile" | "skills" | "languages" | null

	// drafts
	const [profileDraft, setProfileDraft] = useState({
		headline: "",
		bio: "",
		location: "",
	});

	useEffect(() => {
		if (!profile) return;
		setProfileDraft({
			headline: profile.headline || "",
			bio: profile.bio || "",
			location: profile.location || "",
		});
	}, [profile]);

	const updateProfileM = useMutation({
		mutationFn: updateTalentProfile,
		onSuccess: async (res) => {
			if (res?.ok === false) throw new Error(res?.message || "Update failed");
			await qc.invalidateQueries({ queryKey: queryKeys.talentProfile });
			toast.success("Profile updated");
			setEditMode(null);
		},
		onError: (e) => toast.error(e?.message || "Update failed"),
	});

	const uploadResume = useUploadTalentResumeMutation();
	const deleteResume = useDeleteTalentResumeMutation();

	const avatarUrl = profile?.avatarPublicId
		? buildAvatarUrl(profile.avatarPublicId)
		: null;

	const resumeUrl = profile?.resumePublicId
		? buildCloudinaryUrl(profile.resumePublicId)
		: null;

	const resumeName = profile?.resumePublicId
		? profile.resumePublicId.split("/").pop()
		: null;

	const completion = useMemo(() => {
		return calcProfileCompletion({
			...profile,
			avatarUrl: !!avatarUrl,
			resumeUrl: !!resumeUrl,
		});
	}, [profile, avatarUrl, resumeUrl]);

	const handleUploadResume = useCallback(
		async (file) => {
			const t = toast.loading("Uploading resume...");
			try {
				const res = await uploadResume.mutateAsync(file);
				if (!res?.ok && res?.error) throw new Error(res.error);
				toast.success("Resume uploaded");
			} catch (e) {
				toast.error(e.message || "Upload failed");
			} finally {
				toast.dismiss(t);
			}
		},
		[uploadResume],
	);

	const handleDeleteResume = useCallback(async () => {
		const t = toast.loading("Deleting resume...");
		try {
			const res = await deleteResume.mutateAsync();
			if (!res?.ok && res?.error) throw new Error(res.error);
			toast.success("Resume deleted");
		} catch (e) {
			toast.error(e.message || "Delete failed");
		} finally {
			toast.dismiss(t);
		}
	}, [deleteResume]);

	if (isLoading) return <Loading />;
	if (isError)
		return (
			<div className="p-6 text-red-600">
				{String(error?.message || "Error")}
			</div>
		);

	// const isProfileLoading = isFetching;

	return (
		<div className="max-w-5xl mx-auto px-6 py-8 space-y-6 ">
			{/* <CardOverlay loading={isProfileLoading} label="Updating..."> */}
			<ProfileHeaderCard
				name={`${profile.firstName} ${profile.lastName}`}
				location={profile.location}
				avatarPublicId={profile.avatarPublicId}
				completion={completion}
			/>

			{/* About / Headline card */}

			<AboutSection
				headline={profile?.headline}
				level={profile?.level}
				bio={profile?.bio}
				topSkills={topSkills}
				onEdit={openProfileModal}
			/>

			{/* Skills chips */}

			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold">Skills</h3>
				<div className="p-2 rounded-xl hover:bg-slate-50 border">
					<PencilIcon onClick={() => setEditMode("skills")} />
				</div>
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				{(profile?.skills || []).map((s) => (
					<Chip key={s.name || s}>{s.name || String(s)}</Chip>
				))}
			</div>

			<SkillsSection
				skills={skillsList}
				isOpen={editMode === "skills"}
				onOpen={openSkillsModal}
				onClose={() => setEditMode(null)}
				queryKey={queryKeys.talentProfile}
			/>

			{/* Languages chips */}

			<LanguagesSection
				languages={languagesList}
				isOpen={editMode === "languages"}
				onOpen={openLanguagesModal}
				onClose={() => setEditMode(null)}
				queryKey={queryKeys.talentProfile}
			/>

			{/* Certificates section */}
			<CertificatesSection
				certificates={profile?.certificates || []}
				queryKey={queryKeys.talentProfile}
			/>

			{/* Resume */}
			<ResumeCard
				resumeUrl={resumeUrl}
				resumeName={resumeName || profile?.resumeName}
				resumeSize={profile?.resumeSize}
				isUploading={uploadResume.isPending || deleteResume.isPending}
				onUpload={handleUploadResume}
				onDelete={handleDeleteResume}
			/>
			{/* profile modal */}
			<Modal
				open={editMode === "profile"}
				title="Edit profile"
				onClose={() => setEditMode(null)}
				footer={
					<div className="flex gap-3 justify-end">
						<button
							type="button"
							className="px-4 py-2 rounded-xl border hover:bg-slate-50 font-semibold"
							onClick={() => setEditMode(null)}
						>
							Cancel
						</button>
						<button
							type="button"
							className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold disabled:opacity-60"
							disabled={updateProfileM.isPending || updateProfileM.isLoading}
							onClick={() =>
								updateProfileM.mutate({
									headline: profileDraft.headline.trim() || null,
									bio: profileDraft.bio.trim() || null,
									location: profileDraft.location.trim() || null,
								})
							}
						>
							Save
						</button>
					</div>
				}
			>
				<div className="space-y-4">
					<div>
						<label
							htmlFor="headline"
							className="text-sm font-semibold text-slate-700"
						>
							Headline
						</label>
						<input
							name="headline"
							className="mt-1 w-full rounded-xl border p-3"
							value={profileDraft.headline}
							onChange={(e) =>
								setProfileDraft((p) => ({ ...p, headline: e.target.value }))
							}
						/>
					</div>

					<div>
						<label
							htmlFor="location"
							className="text-sm font-semibold text-slate-700"
						>
							Location
						</label>
						<input
							name="location"
							className="mt-1 w-full rounded-xl border p-3"
							value={profileDraft.location}
							onChange={(e) =>
								setProfileDraft((p) => ({ ...p, location: e.target.value }))
							}
						/>
					</div>

					<div>
						<label
							htmlFor="bio"
							className="text-sm font-semibold text-slate-700"
						>
							Bio
						</label>
						<textarea
							name="bio"
							className="mt-1 w-full rounded-xl border p-3 min-h-[120px]"
							value={profileDraft.bio}
							onChange={(e) =>
								setProfileDraft((p) => ({ ...p, bio: e.target.value }))
							}
						/>
					</div>
				</div>
			</Modal>
			{/* </CardOverlay> */}
		</div>
	);
}
