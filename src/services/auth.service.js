//import axiosClient from "../config/axiosClient";
import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";




// export async function request(method, url, data = null, config = {}) {
// 	try {
// 		const response = await axiosClient[method](url, data, config);

// 		// normalize response so frontend always sees:
// 		// { ok: true, data: response.data.data }
// 		return {
// 			ok: true,
// 			message: response.data.message,
// 			data: response.data.data ?? null,
// 		};
// 	} catch (error) {
// 		console.log('request error: ', error);

// 		return error;
// 	}
// }


export const register = (values) => api("post", PATHS.auth.register, values);


export const verifyEmail = (verificationToken) =>
	api("post", PATHS.auth.verify, { verificationToken });


/**
 * Logs a user in with the given email and password.
 * Returns a promise that resolves with the response data from the server.
 * @param {Object} data - The user's email and password.
 * @returns {Promise<object>} A promise that resolves with the response data from the server.
 */
export const login = ({ email, password }) =>
	api("post", PATHS.auth.login, { email, password });


export const getRefreshToken = () => api("get", PATHS.auth.refresh);


export const requestPasswordReset = (email) =>
	api("post", PATHS.auth.resetRequest, { email });



/**
 * Resets the password for the user.
 * @param {string} verificationToken - The verification token obtained from the password reset request.
 * @param {string} newPassword - The new password to set.
 * @param {string} oldPassword - The old password to compare with. If not given, the server will not check the old password.
 * @returns {Promise<object>} A promise that resolves with the response data from the server.
 */
export const resetPassword = (verificationToken, newPassword, oldPassword) =>
	api("put", PATHS.auth.reset, {
		verificationToken,
		newPassword,
		oldPassword,
	});


/**
 * Fetches the current user's data from the server.
 * @param {string} token - The authentication token.
 * @returns {Promise<object>} A promise that resolves with the user data or null if not found.
 */
export const getUser = (token) =>
	api("get", PATHS.auth.me, {
		headers: { Authorization: `Bearer ${token}` },
	});

export const logoutRes = () => api("post", PATHS.auth.logout);

export const logoutAll = () => api("post", PATHS.auth.logoutAll);
