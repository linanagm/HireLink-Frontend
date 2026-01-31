import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import { getEmployerProfile } from "../../../../../services/employer.service";

function shallowEqual(a, b) {
	if (a === b) return true;
	if (!a || !b) return false;
	const ak = Object.keys(a);
	const bk = Object.keys(b);
	if (ak.length !== bk.length) return false;
	for (const k of ak) if (a[k] !== b[k]) return false;
	return true;
}
export function useEmployerProfileQuery() {
	return useQuery({
		queryKey: [queryKeys.employerProfile],
		queryFn: getEmployerProfile,
		staleTime: 10 * 60 * 1000,
		gcTime: 10 * 60 * 1000, //store in cache for 30 min
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		placeholderData: (prev) => prev ?? {},
		select: (res) => res, // حافظي على shape
		structuralSharing: (oldData, newData) => {
			// قارن data payload فقط
			const oldP = oldData?.data;
			const newP = newData?.data;
			if (shallowEqual(oldP, newP)) return oldData; // نفس المرجع = لا rerender
			return newData;
		},
	});
}
