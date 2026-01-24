import { PATHS } from "../constants/apiPaths";
import { api } from "../lib/api";

export const register = (values) => api("post", PATHS.auth.register, values);


export const verifyEmail = (verificationToken) =>
	api("post", PATHS.auth.verify, { verificationToken });

export const login = ({ email, password }) =>
	api("post", PATHS.auth.login, { email, password });

export const getRefreshToken = () => api("get", PATHS.auth.refresh);

export const requestPasswordReset = (email) =>
	api("post", PATHS.auth.resetRequest, { email });

export const resetPassword = ({ email, verificationToken, newPassword, oldPassword }) =>
	api("put", PATHS.auth.reset, {
		email,
		verificationToken,
		newPassword,
		oldPassword,
	});



export const getUser = () => api("get", PATHS.auth.me, null, {});

export const logoutRes = () => api("post", PATHS.auth.logout);

export const logoutAll = () => api("post", PATHS.auth.logoutAll);
