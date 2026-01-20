import { useQuery } from "@tanstack/react-query";
import defaultProfileImage from "../../../assets/images/profile-image.png";
import { useUploadAvatar } from "../../../hooks/useUploadAvatar";
import { queryKeys } from "../../../lib/queryKeys";
import {
	getTalentProfile,
	uploadTalentAvatar,
} from "../../../services/talent.service";
import { buildAvatarUrl } from "../../../utils/Helpers/avatar";

export default function TalentProfile() {
	// upload avatar
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

	// get talent profile
	const {
		data: res,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: queryKeys.talentProfile,
		queryFn: getTalentProfile,
		staleTime: 60 * 1000,
	});

	const talentProfile = res?.data?.talentProfile ?? null;

	console.log("profile-data: \n", res);

	const profile = {
		name: `${talentProfile?.firstName}  ${talentProfile?.lastName}`,
		location: talentProfile?.location ?? "location",
		completion: 70,
		avatarUrl: talentProfile?.avatarPublicId
			? buildAvatarUrl(talentProfile?.avatarPublicId)
			: defaultProfileImage,
		title: talentProfile?.headline ?? "Your Title",
		level: "Expert",
		bio: talentProfile?.bio,
		bullets: talentProfile?.skills?.map((s) => s.name) ?? [],
		work: talentProfile?.workExperience ?? "No experience",
		chips: talentProfile?.certifications ?? [],
		cert: {
			title: talentProfile?.certificates?.name ?? "None",
			provider: talentProfile?.certificates?.issuer ?? "None",
			issued:
				talentProfile?.certificates?.issueDate ?? "Certificate Issued Date",
			id: talentProfile?.certificates?.certificationId ?? "Certificate ID",
		},
	};

	// Just placeholders (UI only)
	const onEdit = (section) => console.log("edit:", section);
	const onAddCert = () => console.log("add certification");
	const onDeleteCert = () => console.log("delete certification");

	// handle loading and errors
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>{error.message}</div>;

	return (
		<div className="min-h-screen bg-white">
			<main className="max-w-5xl mx-auto px-6 py-8">
				{/* Top Profile Card */}
				<section className="bg-white border rounded-xl p-6 flex items-center justify-between ">
					<div className="flex items-center gap-4 pb-4">
						{/* profile image */}
						<div className="flex flex-col items-center ">
							<div className="relative  items-center gap-4">
								<img
									src={profile?.avatarUrl}
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
									{profile?.name}
								</h2>
							</div>

							<p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
								<i className="fa-solid fa-location-dot"></i>
								{profile?.location}
							</p>
						</div>
					</div>
					{/* profile completion */}
					<p className="text-sm text-purple-600 font-medium ">
						Profile {profile?.completion}% Complete
					</p>
				</section>

				{/* About Me */}
				<section className="bg-white border rounded-xl p-6 mt-6">
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0">
							<div className="flex items-center gap-2">
								<h3 className="text-xl font-semibold text-gray-900 truncate">
									{profile?.title}
								</h3>

								<button
									type="button"
									onClick={() => onEdit("title")}
									className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0"
									aria-label="Edit title"
								>
									<i className="fa-solid fa-pencil text-sm"></i>
								</button>
							</div>

							<div className="flex items-center gap-2 mt-4">
								<p className="text-gray-700">{profile.level}</p>

								<button
									type="button"
									onClick={() => onEdit("level")}
									className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center"
									aria-label="Edit level"
								>
									<i className="fa-solid fa-pencil text-sm"></i>
								</button>
							</div>

							<div className="flex items-start justify-between gap-4 mt-4">
								<p className="text-gray-600 leading-relaxed">{profile.bio}</p>

								<button
									type="button"
									onClick={() => onEdit("bio")}
									className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1"
									aria-label="Edit bio"
								>
									<i className="fa-solid fa-pencil text-sm"></i>
								</button>
							</div>

							<div className="mt-6">
								<p className="text-sm font-medium text-gray-700 mb-2">
									Skills:
								</p>
								<ul className="list-disc ml-5 space-y-2 text-gray-700">
									{profile?.bullets?.map((b) => (
										<li key={b}>{b}</li>
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
				<section className="bg-white border rounded-xl p-6 mt-6">
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
						<div>
							<p className="font-semibold text-gray-900">
								{profile?.cert?.title}
							</p>

							<p className="text-sm text-gray-600 mt-2">
								Provider: {profile.cert.provider}
							</p>
							<p className="text-sm text-gray-600">
								Issued: {profile.cert.issued}
							</p>
							<p className="text-sm text-gray-600">
								Certification ID: {profile.cert.id}
							</p>

							<button
								type="button"
								className="text-sm text-purple-600 mt-3 hover:underline"
								onClick={() => console.log("show description")}
							>
								Show description
							</button>
						</div>

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
	);
}
