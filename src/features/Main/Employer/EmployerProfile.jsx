import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import CardOverlay from "../../../components/UI/CardLoader";
import Field from "../../../components/UI/Field";
import Loading from "../../../components/UI/Loading";
import PencilButton from "../../../components/UI/PencilIcon";
import { useUpdateEmployerProfile } from "../../../hooks/mutations/employer/useUpdateEmployerMutation";
import { useEmployerProfileQuery } from "../../../hooks/queries/employer/useEmployerQueries";
import { useAuth } from "../../../hooks/useAuth";
import { useUploadAvatar } from "../../../hooks/useUploadAvatar";
import { queryKeys } from "../../../lib/queryKeys";
import { updateEmployerLogo } from "../../../services/employer.service";
import { buildAvatarUrl } from "../../../utils/Helpers/avatar";
import { normalizeUrl } from "../../../utils/normalizeData";

function Row({ label, value, isLink = false }) {
	return (
		<div className="flex items-start gap-3">
			<p className="w-40 text-gray-600 font-semibold">{label}:</p>
			{isLink && value ? (
				<a
					href={value}
					target="_blank"
					rel="noreferrer"
					className="text-purple-700 hover:underline break-all"
				>
					{value}
				</a>
			) : (
				<p className="text-gray-800">
					{value?.trim?.() ? value : <span className="text-gray-400">-</span>}
				</p>
			)}
		</div>
	);
}

export default function EmployerProfile() {
	const {
		data: res,
		isLoading,
		isFetching,
		isError,
		error,
	} = useEmployerProfileQuery();
	const updateMutation = useUpdateEmployerProfile();
	const { currentUser } = useAuth();
	const { fileRef, onPickAvatar, onAvatarChange, avatarError, avatarMutation } =
		useUploadAvatar({
			uploadFn: updateEmployerLogo,
			fieldName: "logo",
			invalidateKeys: [[queryKeys.employerProfile], [queryKeys.currentUser]],
			getPublicId: (res) =>
				res?.data?.employerProfile?.avatarPublicId ||
				res?.data?.avatarPublicId ||
				null,
		});
	const userData = useMemo(() => res?.data ?? null, [res]);
	const profile = userData?.employerProfile ?? null;
	console.log("employer profile", profile);

	const companyName = profile?.companyName ?? "";
	const website = profile?.website ?? "";
	const description = profile?.description ?? "";
	const location = profile?.location ?? "";

	const liveAvatarUrl = currentUser?.avatarUrl || null;
	const profileAvatarUrl = profile?.avatarPublicId
		? `${buildAvatarUrl(profile.avatarPublicId)}?v=${profile?.updatedAt || ""}`
		: null;

	const logoUrl = liveAvatarUrl || profileAvatarUrl;

	const [editingHeader, setEditingHeader] = useState(false);
	const [headerDraft, setHeaderDraft] = useState({
		companyName: "",
		location: "",
	});

	const [editingAbout, setEditingAbout] = useState(false);
	const [aboutDraft, setAboutDraft] = useState("");

	const [editingOverview, setEditingOverview] = useState(false);
	const [overviewDraft, setOverviewDraft] = useState({
		website: "",
	});

	const isProfileLoading = isFetching || updateMutation.isPending || isLoading;

	useEffect(() => {
		setHeaderDraft({
			companyName: companyName || "",
			location: location || "",
		});
		setAboutDraft(description || "");
		setOverviewDraft((p) => ({ ...p, website: website || "" }));
	}, [companyName, location, description, website]);

	const saveHeader = () => {
		const cleaned = {
			companyName: (headerDraft.companyName || "").trim(),
			location: (headerDraft.location || "").trim() || null,
		};
		setEditingHeader(false);
		updateMutation.mutate(cleaned);
	};

	const saveAbout = () => {
		const cleaned = { description: (aboutDraft || "").trim() || null };
		setEditingAbout(false);
		updateMutation.mutate(cleaned);
	};

	const saveOverview = () => {
		const cleaned = {
			website: normalizeUrl(overviewDraft.website).trim() || "-",
		};
		setEditingOverview(false);
		updateMutation.mutate(cleaned);
	};

	if (isLoading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="max-w-6xl mx-auto p-6">
				<div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
					{error?.message || "Failed to load employer profile"}
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<Helmet>
				<title>Employer Profile</title>
			</Helmet>
			<CardOverlay loading={isProfileLoading} label="Updating...">
				<div className="max-w-6xl mx-auto px-4 py-8">
					{/* Header card */}
					<section className="bg-white border border-gray-200 rounded-2xl p-12 ">
						<div className="flex items-center justify-between gap-4 ">
							<div className="flex flex-grow items-center gap-4 ">
								<div className="relative flex flex-col items-center gap-2 ">
									{/* hidden input */}
									<input
										ref={fileRef}
										type="file"
										accept="image/*"
										className="hidden w-full "
										onChange={onAvatarChange}
									/>

									{/* Avatar wrapper */}
									<div className="relative group">
										<div className="w-28 h-28 rounded-full shadow-md bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
											{logoUrl ? (
												<img
													src={logoUrl}
													alt="Company logo"
													className="w-full h-full object-cover"
												/>
											) : (
												<span className="text-gray-400 text-xs">Logo</span>
											)}
										</div>

										{/* Edit button overlay */}
										<button
											type="button"
											aria-label="Edit logo"
											onClick={onPickAvatar}
											disabled={avatarMutation.isPending}
											className="
											absolute bottom-4 -right-1
											w-7 h-7 rounded-full
											bg-purple-600 text-white
											flex items-center justify-center
											shadow-md
											hover:bg-purple-700
											transition
											disabled:opacity-60
											
										"
										>
											{avatarMutation.isPending ? (
												<i className="fa-solid fa-spinner animate-spin text-xs" />
											) : (
												<i className="fa-solid fa-pen text-[10px]" />
											)}
										</button>
									</div>

									{/* Error message */}
									{avatarError && (
										<p className="text-xs text-red-600 text-center max-w-[160px] leading-tight">
											{avatarError}
										</p>
									)}
								</div>

								<div>
									{!editingHeader ? (
										<>
											<h1 className="text-xl font-bold text-gray-900">
												{companyName || "Company name"}
											</h1>
											<p className="text-sm text-gray-600 mt-1">Company</p>
											<div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
												<i className="fa-solid fa-location-dot text-purple-600" />
												<span>{location || "Location"}</span>
											</div>
										</>
									) : (
										<div className="space-y-3 ">
											<Field
												label="Company Name"
												value={headerDraft.companyName}
												onChange={(v) =>
													setHeaderDraft((p) => ({ ...p, companyName: v }))
												}
												placeholder="Company name"
											/>
											<Field
												label="Location"
												value={headerDraft.location}
												onChange={(v) =>
													setHeaderDraft((p) => ({ ...p, location: v }))
												}
												placeholder="New York, USA"
											/>
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={saveHeader}
													disabled={updateMutation.isPending}
													className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
												>
													Save
												</button>
												<button
													type="button"
													onClick={() => {
														setEditingHeader(false);
														setHeaderDraft({
															companyName: companyName || "",
															location: location || "",
														});
													}}
													className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
												>
													Cancel
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							{!editingHeader && (
								<button
									type="button"
									className="px-5 py-2.5 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
									onClick={() => setEditingHeader(true)}
								>
									Edit Profile
								</button>
							)}
						</div>
					</section>

					{/* About Us */}
					<section className="bg-white border border-gray-200 rounded-2xl p-12 mt-6">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold text-gray-900">About Us</h2>
							{!editingAbout && (
								<PencilButton
									ariaLabel="Edit About Us"
									onClick={() => setEditingAbout(true)}
								/>
							)}
						</div>

						<div className="mt-4 border-t pt-4">
							{!editingAbout ? (
								<p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
									{description?.trim()?.length ? (
										description
									) : (
										<span className="text-gray-400">
											Add a short description about your company…
										</span>
									)}
								</p>
							) : (
								<div>
									<textarea
										value={aboutDraft}
										onChange={(e) => setAboutDraft(e.target.value)}
										rows={5}
										className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-purple-200"
										placeholder="Write a short description about your company…"
									/>
									<div className="mt-3 flex items-center gap-2">
										<button
											type="button"
											onClick={saveAbout}
											disabled={updateMutation.isPending}
											className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
										>
											Save
										</button>
										<button
											type="button"
											onClick={() => {
												setEditingAbout(false);
												setAboutDraft(description || "");
											}}
											className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
										>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>
					</section>

					{/* Company Overview */}

					<section className="bg-white border border-gray-200 rounded-2xl p-12 mt-6">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold text-gray-900">
								Company Overview
							</h2>
							{!editingOverview && (
								<PencilButton
									ariaLabel="Edit Company Overview"
									onClick={() => setEditingOverview(true)}
								/>
							)}
						</div>

						<div className="mt-4 border-t pt-5">
							{!editingOverview ? (
								<div className="space-y-3 text-sm">
									<Row label="Website" value={website} isLink />
									<Row label="Location" value={location} />
								</div>
							) : (
								<div className="space-y-4">
									<Field
										label="Website"
										value={overviewDraft.website}
										onChange={(v) =>
											setOverviewDraft((p) => ({ ...p, website: v }))
										}
										placeholder="https://www.company.com"
									/>

									<div className="pt-2 flex items-center gap-2">
										<button
											type="button"
											onClick={saveOverview}
											disabled={updateMutation.isPending}
											className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
										>
											Save
										</button>
										<button
											type="button"
											onClick={() => {
												setEditingOverview(false);
												setOverviewDraft((p) => ({
													...p,
													website: website || "",
												}));
											}}
											className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
										>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>
					</section>

					{updateMutation.isPending && (
						<div className="mt-4 text-sm text-gray-600">Saving…</div>
					)}
				</div>
			</CardOverlay>
		</div>
	);
}
