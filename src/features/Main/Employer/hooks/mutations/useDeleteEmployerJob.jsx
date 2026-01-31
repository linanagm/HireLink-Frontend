import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../lib/queryKeys";
import {
	createEmployerJob,
	deleteEmployerJob,
	updateEmployerJob,
} from "../../../../../services/employer.service";

export function useCreateEmployerJobMutation() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (payload) => {
			const res = await createEmployerJob(payload);
			return res?.data?.data ?? res?.data; // keep your normalization
		},

		// Optimistic update: update cache immediately
		onMutate: async (payload) => {
			// stop any in-flight refetch for this list
			const key = queryKeys.employerJobs;
			await qc.cancelQueries({ queryKey: key });

			const prev = qc.getQueryData(key);

			// create a lightweight optimistic job (minimal fields used by UI)
			const optimisticJob = {
				id: `optimistic-${Date.now()}`,
				...payload,
				__optimistic: true,
			};

			qc.setQueryData(key, (old) => {
				if (!old) return old;

				// handle common shapes:
				// old could be array, or {data: []}, or {data:{jobs:[]}}
				if (Array.isArray(old)) return [optimisticJob, ...old];

				const jobs = old?.data?.jobs ?? old?.data ?? old?.jobs ?? null;

				if (Array.isArray(jobs)) {
					// rebuild same shape without breaking it
					if (Array.isArray(old?.data))
						return { ...old, data: [optimisticJob, ...old.data] };
					if (Array.isArray(old?.jobs))
						return { ...old, jobs: [optimisticJob, ...old.jobs] };
					if (Array.isArray(old?.data?.jobs))
						return {
							...old,
							data: { ...old.data, jobs: [optimisticJob, ...old.data.jobs] },
						};
				}

				return old; // unknown shape, don't risk it
			});

			return { prev, key };
		},

		// Rollback on error
		onError: (_err, _payload, ctx) => {
			if (ctx?.prev) qc.setQueryData(ctx.key, ctx.prev);
		},

		// Replace optimistic state with real server data
		// onSuccess: (createdJob, _payload, ctx) => {
		// 	if (!ctx?.key) return;

		// 	qc.setQueryData(ctx.key, (old) => {
		// 		if (!old) return old;

		// 		const replace = (arr) =>
		// 			arr.map((j) => (j?.__optimistic ? createdJob : j));

		// 		if (Array.isArray(old)) return replace(old);

		// 		if (Array.isArray(old?.data))
		// 			return { ...old, data: replace(old.data) };
		// 		if (Array.isArray(old?.jobs))
		// 			return { ...old, jobs: replace(old.jobs) };
		// 		if (Array.isArray(old?.data?.jobs))
		// 			return {
		// 				...old,
		// 				data: { ...old.data, jobs: replace(old.data.jobs) },
		// 			};

		// 		return old;
		// 	});
		// },
		onSuccess: (createdJob) => {
			qc.setQueryData(queryKeys.employerJobs, (old) => {
				if (!old) return old;

				// if already an array
				if (Array.isArray(old)) return [createdJob, ...old];

				// if wrapped response
				if (Array.isArray(old?.data))
					return { ...old, data: [createdJob, ...old.data] };

				if (Array.isArray(old?.data?.jobs))
					return {
						...old,
						data: { ...old.data, jobs: [createdJob, ...old.data.jobs] },
					};

				return old;
			});
		},

		// One smart refetch to guarantee server truth
		onSettled: (_data, _err, _payload, ctx) => {
			if (ctx?.key) qc.invalidateQueries({ queryKey: ctx.key });
		},
	});
}

export function useUpdateEmployerJobMutation(jobId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload) => {
			const res = await updateEmployerJob(jobId, payload);
			return res?.data?.data ?? res?.data;
		},
		onSuccess: () => {
			// 1) Update jobs list cache (fast UI, no refetch)
			qc.setQueryData(queryKeys.employerJobs, (old) => {
				if (!old) return old;

				const patch = (arr) =>
					arr.map((j) => (j?.id === jobId ? { ...j, ...updatedJob } : j));

				// flexable if data shape changes
				if (Array.isArray(old)) return patch(old);
				if (Array.isArray(old?.data)) return { ...old, data: patch(old.data) };
				if (Array.isArray(old?.data?.jobs))
					return { ...old, data: { ...old.data, jobs: patch(old.data.jobs) } };

				return old;
			});

			// 2) Update single job cache if you have it (only if exists)
			qc.setQueryData(queryKeys.employerJob, (old) =>
				old ? { ...old, ...updatedJob } : old,
			);
		},

		// 3) Optional: one smart refetch to guarantee server truth (keep it minimal)
		onSettled: () => {
			qc.invalidateQueries({ queryKey: queryKeys.employerJobs });
			qc.invalidateQueries({ queryKey: queryKeys.employerJob });
		},
	});
}

export function useDeleteEmployerJob() {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (jobId) => {
			const res = await deleteEmployerJob(jobId);
			if (!res.ok)
				throw res.error || new Error(res.message || "Failed to delete job");
			return res;
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [queryKeys.employerDashboardAggregated],
			});
			qc.invalidateQueries({ queryKey: [queryKeys.employerJobs] });
		},
	});
}
