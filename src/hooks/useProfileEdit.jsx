import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Reusable optimistic update hook.
 *
 * @param {Object} opts
 * @param {(vars:any)=>Promise<any>} opts.mutationFn - function that calls API
 * @param {any[]} opts.queryKey - query key to optimistically update (e.g. queryKeys.talentProfile)
 * @param {(old:any, vars:any)=>any} opts.optimisticUpdater - how to update cache optimistically
 * @param {any[][]} [opts.invalidateKeys] - list of queryKeys to invalidate after settle
 * @param {string} [opts.successMsg]
 * @param {string} [opts.errorMsg]
 */
export function useProfileEdit({
	mutationFn,
	queryKey,
	optimisticUpdater,
	invalidateKeys = [],
	successMsg = "Updated successfully",
	errorMsg = "Update failed",
}) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn,

		/**
		 * Called when the mutation is triggered.
		 * Cancels the current query, updates the cache optimistically and returns the previous data.
		 * @param {any} vars - variables passed to the mutation function
		 * @returns {Promise<any>} previous data
		 */
		onMutate: async (vars) => {
			await qc.cancelQueries({ queryKey });

			const prev = qc.getQueryData(queryKey);

			qc.setQueryData(queryKey, (old) => {
				if (!old) return old;
				return optimisticUpdater(old, vars);
			});

			return { prev };
		},

		/**
		 * Called when the mutation is successful.
		 * Shows a success toast with the success message.
		 */
		onSuccess: () => {
			toast.success(successMsg);
		},

		/**
		 * Called when the mutation fails.
		 * Reverts the cache to the previous state, and shows an error toast with the error message.
		 * @param {Error} err - the error that occurred during the mutation
		 * @param {any} _vars - variables passed to the mutation function
		 * @param {object} ctx - the mutation context
		 */
		onError: (err, _vars, ctx) => {
			if (ctx?.prev) qc.setQueryData(queryKey, ctx.prev);
			toast.error(err?.message || errorMsg);
		},

		/**
		 * Called when the mutation is settled (either successful or failed).
		 * Invalidates the main query key and all additional query keys passed in the invalidateKeys option.
		 */
		onSettled: async () => {
			// invalidate the main key too (usually you want it)
			await qc.invalidateQueries({ queryKey });

			for (const k of invalidateKeys) {
				await qc.invalidateQueries({ queryKey: k });
			}
		},
	});
}
