// import axiosClient from "../config/axiosClient";
// import { handleError } from "../utils/helpers";

// const endpoints = {
//   login: "/auth/login",   
//   me: "/auth/me",         
//   // optional:
//   refresh: "/auth/refresh",
//   logout: "/auth/logout",
// };

// async function request(method, url, data = null, config = {}) {
//   try {
//     const response = await axiosClient[method](url, data, config);

//     return {
//       ok: true,
//       message: response.data.message,
//       data: response.data.data ?? null,
//     };

//   } catch (error) {
//     return handleError(error);
//   }
// }

// // Admin login
// export const adminLogin = ({ email, password }) =>
//   request("post", endpoints.login, { email, password });

// // Get admin profile (role/permissions)
// export const getAdminMe = (token) =>
//   request("get", endpoints.me, null, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // optional
// export const adminRefreshToken = () => request("get", endpoints.refresh);

// export const adminLogout = () => request("post", endpoints.logout);


// ------------------- fake API -----------------------------
import axiosClient from "../config/axiosClient";
import { handleError } from "../utils/helpers";

// change it to false when you want to use the real API
const USE_MOCK_ADMIN_AUTH = true;

const endpoints = {
  login: "/admin/auth/login",
  me: "/admin/auth/me",
};

const MOCK_ADMIN = {
  email: "admin@hirelink.com",
  password: "Admin@12345",
  role: "MODERATOR",
  name: "Admin",
  permissions: ["DASHBOARD", "USERS", "JOBS", "SETTINGS"],
};

// fake token maker
function makeMockToken(payload) {
  const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  return `mock.${base64}.token`;
}

async function request(method, url, data = null, config = {}) {
  try {
    const response = await axiosClient[method](url, data, config);
    return {
      ok: true,
      message: response.data.message,
      data: response.data.data ?? null,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function adminLogin({ email, password }) {
  if (USE_MOCK_ADMIN_AUTH) {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    if (
      email.trim().toLowerCase() === MOCK_ADMIN.email.toLowerCase() &&
      password === MOCK_ADMIN.password
    ) {
      return {
        ok: true,
        message: "Mock admin login success",
        data: {
          token: makeMockToken({
            email: MOCK_ADMIN.email,
            role: MOCK_ADMIN.role,
            name: MOCK_ADMIN.name,
            iat: Date.now(),
          }),
        },
      };
    }

    return {
      ok: false,
      message: "Invalid admin credentials (mock).",
      data: null,
    };
  }

  // API mode
  return request("post", endpoints.login, { email, password });
}

export async function getAdminMe(token) {
  if (USE_MOCK_ADMIN_AUTH) {
    await new Promise((r) => setTimeout(r, 300));


    if (!token) {
      return { ok: false, message: "Missing token", data: null };
    }

    return {
      ok: true,
      message: "Mock admin profile",
      data: {
        email: MOCK_ADMIN.email,
        role: MOCK_ADMIN.role,
        name: MOCK_ADMIN.name,
        permissions: MOCK_ADMIN.permissions,
      },
    };
  }

  // API mode
  return request("get", endpoints.me, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
