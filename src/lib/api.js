import axiosClient from "../config/axiosClient";
import { handleError } from "../utils/helpers";


export async function api(method, url, data = null, config = {}) {
    try {
        const response = await axiosClient[method](url, data, config);

        // normalize response so frontend always sees:
        // { ok: true, data: response.data.data }
        return {
            ok: true,
            message: response?.data?.message ?? null,
            data: response?.data?.data ?? null,
        };
    } catch (error) {
        return handleError(error);

    }
}