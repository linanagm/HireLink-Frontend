import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
	getTalentProfile,
	setTalentSkills,
	updateTalentProfile,
} from "../../../../services/talent.service";

export default function EditableProfile() {
	//const qc = useQueryClient();

	const {
		data: res,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["talent-profile"],
		queryFn: getTalentProfile,
		staleTime: 60 * 1000,
	});

	const apiProfile = res?.data?.data ?? res?.data ?? null;

	const [profile, setProfile] = useState(null);

	// لما الداتا تيجي من API حطيها في state بتاع ال UI
	useEffect(() => {
		if (!apiProfile) return;

		setProfile({
			name: apiProfile.fullName ?? apiProfile.name ?? "—",
			location: apiProfile.location ?? "—",
			title: apiProfile.headline ?? apiProfile.title ?? "",
			bio: apiProfile.bio ?? "",
			skills: apiProfile.skills ?? [], // مهم: array strings
			work: apiProfile.workExperience ?? "No experience",
			extraSkills: apiProfile.extraSkills ?? [], // لو عندك
			certification: apiProfile.certification ?? {
				title: "",
				provider: "",
				issued: "",
				id: "",
			},
		});
	}, [apiProfile]);

	const updateProfileMut = useMutation({
		mutationFn: updateTalentProfile,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["talent-profile"] }),
	});

	const updateSkillsMut = useMutation({
		mutationFn: setTalentSkills,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["talent-profile"] }),
	});

	if (isLoading || !profile) return <div className="p-6">Loading...</div>;
	if (isError) return <div className="p-6 text-red-600">{error?.message}</div>;

	// لما تدوسي save في Title/Bio
	const saveTitleBio = () => {
		updateProfileMut.mutate({
			headline: profile.title,
			bio: profile.bio,
		});
	};

	// لما تدوسي save في Skills
	const saveSkills = () => {
		updateSkillsMut.mutate({
			skills: profile.skills,
		});
	};

	// ... كمّلي نفس UI بتاعك، بس استبدلي onClick Save ينادي الدوال دي ...
}
