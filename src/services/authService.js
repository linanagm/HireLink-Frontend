import axiosClient from "./axiosClient";
import { handleError } from "../utils/helpers";

const endpoints = {
  register: "/auth/register",
  verify: "/auth/verify",
  login: "/auth/login",
  refresh: "/auth/refresh",
  resetRequest: "/auth/reset/request",
  reset: "/auth/reset",
  me: "/auth/me",
  logout: "/auth/logout",
  logoutAll: "/auth/logout/all",
};

async function request(method, url, data = null, config = {}) {
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

export const register = (values) =>
  request("post", endpoints.register, values, { timeout: 60000 });

export const verifyEmail = (verificationToken) =>
  request("post", endpoints.verify, { verificationToken });

export const login = ({ email, password }) =>
  request("post", endpoints.login, { email, password });

export const refreshToken = () =>
  request("get", endpoints.refresh);

export const requestPasswordReset = (email) =>
  request("post", endpoints.resetRequest, { email });

export const resetPassword = (verificationToken, newPassword, oldPassword) =>
  request("put", endpoints.reset, { verificationToken, newPassword, oldPassword });

export const getUser = (token) =>
  request("get", endpoints.me,  { headers: { Authorization: `Bearer ${token}` } });

export const logout = () =>
  request("post", endpoints.logout);

export const logoutAll = () =>
  request("post", endpoints.logoutAll);
