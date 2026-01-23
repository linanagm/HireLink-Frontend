// config/axiosConfig.js
import axios from "axios";
import { PATHS } from "../constants/apiPaths";
import {
	clearAccessToken,
	getAccessToken,
	setAccessToken,
} from "../lib/tokenStore";

// Create a single axios client for the whole app
// - baseURL comes from env
// - withCredentials: is required to send refresh token cookies
const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

// Request interceptor: run before every request
// If access token exists, add it to authorization header
axiosClient.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	// Forward request errors
	(error) => Promise.reject(error),
);

// Flag to prevent multiple refresh calls at the same time
let isRefreshing = false;

// Queue to store requests that failed with 401 while refresh is in progress
let failedQueue = [];


// Restore or reject all queued requests after refresh finishes
const processQueue = (error, token = null) => {
	failedQueue.forEach(({ resolve, reject }) => {
		if (error) reject(error);
		else resolve(token);
	});
	failedQueue = [];
};

// Response Interceptor:
// Handle expired access token (401 errors)
axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {


		const originalRequest = error.config;
		const status = error?.response?.status;



		// Network errors (no response from server) 
		// Let the caller handle them
		if (!status) return Promise.reject(error);

		// Prevent infinite loop:
		// Do not try to refresh if the failed request is already /auth/refresh
		const isRefreshCall = originalRequest?.url?.includes(PATHS.auth.refresh);

		// handle expired access token		
		if (status === 401 && !originalRequest._retry && !isRefreshCall) {
			// check if refresh is in progress
			if (isRefreshing) {

				// If a refresh request is already is running,
				//wait until it finishes and retry the original request
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
					// 
				}).then((token) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return axiosClient(originalRequest);
				});
			}

			// Mark request as retried to prevent infinite loop
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// Request a new access token using refresh token (cookies)
				const res = await axiosClient.get(PATHS.auth.refresh);


				// Backend response: res.data.data.token
				const newAccessToken = res?.data?.data?.token;

				if (!newAccessToken) {
					throw new Error("Refresh succeeded but token missing in response");
				}

				// Save the new token (Keeps the same storage as before)
				setAccessToken(newAccessToken);

				// Retry all queued requests with the new token
				processQueue(null, newAccessToken);

				// Retry the original request
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosClient(originalRequest);
			} catch (err) {
				// Refresh failed -> logout
				processQueue(err, null);
				clearAccessToken();

				// optional:
				// - clear react-query cache
				// - redirect to login
				// window.location.href = "/login"
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		// Any other error
		return Promise.reject(error);
	},
);

export default axiosClient;
