import { useEffect, useState } from "react";
import Chip from "../../../../../components/UI/Chip";
import Modal from "../../../../../components/UI/Modal";
import StatusPill from "../../../../../components/UI/StatusPill";
import { buildAvatarUrl } from "../../../../../utils/Helpers/avatar";
import { useUpdateEmployerApplicationStatus } from "../../hooks/mutations/useUpdateEmployerApplicationStatus";

export default function ApplicationDetailsModal({
	open,
	onClose,
	seed,
	onStatusChanged,
}) {
	const upd = useUpdateEmployerApplicationStatus();

	const [app, setApp] = useState(seed ?? null);

	useEffect(() => {
		setApp(seed ?? null);
	}, [seed]);

	const applicationId = app?.id;
	const talent = app?.talent;

	const jobTitle = app?.jobTitle ?? app?.job?.title ?? "—";

	const appliedOn = app?.createdAt
		? new Date(app.createdAt).toLocaleDateString()
		: "—";
	const status = app?.status ?? "—";

	const fullName = talent?.fullName ?? talent?.user?.email ?? "Candidate";
	const headline = talent?.headline ?? "";
	const avatarUrl = talent?.avatarPublicId ?? "";

	const coverLetter = app?.coverLetter ?? "";
	const resumeUrl = app?.resumeUrl ?? "";

	const skills = talent?.skills ?? [];
	const languages = talent?.languages ?? [];

	const disableActions = upd.isPending || !applicationId;

	const setStatus = (next) => {
		upd.mutate(
			{ applicationId, status: next },
			{
				onSuccess: () => {
					// update modal immediately
					setApp((prev) => (prev ? { ...prev, status: next } : prev));
					// notify parent to refresh list if you want
					onStatusChanged?.(applicationId, next);
				},
			},
		);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title=""
			widthClassName="max-w-5xl"
			style={{ maxHeight: "90vh" }}
		>
			<div className="p-6 max-h-[80vh] overflow-y-auto">
				{!app ? (
					<div className="p-6 text-gray-600">No data.</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* LEFT */}
						<div className="bg-white border rounded-2xl p-5">
							<div className="flex flex-col items-center text-center">
								<div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100">
									{avatarUrl ? (
										<img
											src={buildAvatarUrl(avatarUrl)}
											alt=""
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
											No photo
										</div>
									)}
								</div>

								<div className="mt-5 text-2xl font-bold text-gray-900">
									{fullName}
								</div>
								{headline ? (
									<div className="mt-1 text-lg font-semibold text-fuchsia-700">
										{headline}
									</div>
								) : null}

								<div className="mt-4 flex items-center gap-3">
									<button
										type="button"
										disabled={disableActions}
										onClick={() => setStatus("HIRED")}
										className="px-5 py-2 rounded-xl border border-green-300 text-green-700 font-semibold hover:bg-green-50 disabled:opacity-50"
									>
										HIRED
									</button>
									<button
										type="button"
										disabled={disableActions}
										onClick={() => setStatus("REJECTED")}
										className="px-5 py-2 rounded-xl border border-red-300 text-red-700 font-semibold hover:bg-red-50 disabled:opacity-50"
									>
										REJECTED
									</button>
								</div>

								<div className="mt-6 w-full">
									<div className="flex flex-wrap gap-2 justify-center">
										{skills.slice(0, 10).map((s, idx) => (
											<Chip key={s.skillId || s.id || `${s.name}-${idx}`}>
												{s.name}
												{s.level ? ` · ${s.level}` : ""}
											</Chip>
										))}
									</div>

									{languages.length ? (
										<div className="mt-3 flex flex-wrap gap-2 justify-center">
											{languages.slice(0, 8).map((l, idx) => (
												<Chip key={l.languageId || l.id || `${l.name}-${idx}`}>
													{l.name}
													{l.minimumProficiency
														? ` · ${l.minimumProficiency}`
														: ""}
												</Chip>
											))}
										</div>
									) : null}
								</div>
							</div>
						</div>

						{/* RIGHT */}
						<div className="bg-white border rounded-2xl p-5 space-y-6">
							<div>
								<div className="text-xl font-extrabold text-gray-900">
									Application Overview
								</div>
								<div className="mt-4 space-y-3 text-sm">
									<div>
										<span className="text-gray-500">Job Title:</span>{" "}
										<span className="font-semibold">{jobTitle}</span>
									</div>
									<div>
										<span className="text-gray-500">Applied On:</span>{" "}
										<span className="font-semibold">{appliedOn}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-gray-500">Status:</span>
										<StatusPill status={status} />
									</div>
								</div>
							</div>

							<div>
								<div className="text-xl font-extrabold text-gray-900">
									Professional Overview
								</div>
								<div className="text-m  text-gray-600">Cover Letter</div>

								<div className="mt-3 text-sm text-gray-800 whitespace-pre-wrap">
									{coverLetter || "—"}
								</div>
							</div>

							<div>
								<div className="text-xl font-extrabold text-gray-900">
									Resume
								</div>
								{!resumeUrl ? (
									<div className="mt-2 text-sm text-gray-500">
										<i className="fa-regular fa-circle-xmark text-red-600 pr-2"></i>
										No resume.
									</div>
								) : (
									<div className="mt-3 space-y-3">
										<i className="fa-regular fa-square-check text-green-500 pr-2"></i>{" "}
										Uploaded
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
}
