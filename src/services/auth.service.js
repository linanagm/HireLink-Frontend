import axiosClient from "../config/axiosClient";
import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";
import { handleError } from "../utils/helpers";



export async function request(method, url, data = null, config = {}) {
	try {
		const response = await axiosClient[method](url, data, config);

		// normalize response so frontend always sees:
		// { ok: true, data: response.data.data }
		return {
			ok: true,
			message: response.data.message,
			data: response.data.data ?? null,
		};
	} catch (error) {
		return handleError(error);
	}
}


export const register = (values) => api("post", PATHS.auth.register, values);


export const verifyEmail = (verificationToken) =>
	api("post", PATHS.auth.verify, { verificationToken });


export const login = ({ email, password }) =>
	api("post", PATHS.auth.login, { email, password });


export const getRefreshToken = () => api("get", PATHS.auth.refresh);


export const requestPasswordReset = (email) =>
	api("post", PATHS.auth.resetRequest, { email });



export const resetPassword = (verificationToken, newPassword, oldPassword) =>
	api("put", PATHS.auth.reset, {
		verificationToken,
		newPassword,
		oldPassword,
	});


export const getUser = (token) =>
	api("get", PATHS.auth.me, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const logoutRes = () => api("post", PATHS.auth.logout);

export const logoutAll = () => api("post", PATHS.auth.logoutAll);
