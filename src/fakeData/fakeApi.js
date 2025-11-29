
//get users from local storage
function getUsers () {
  console.log("local storage users: ",JSON.parse(localStorage.getItem("users")) || [] );
  
    return JSON.parse(localStorage.getItem("users")) || [];

}


//save users to local storage
function saveUsers(users) {
  return localStorage.setItem("users", JSON.stringify(users));
}

// ============================
//      SIGN UP
// ============================
export function signup({ name, email, password, role }) {
  let users = getUsers();
  if(users.find(u => u.email === email )) return { status: 400, success: false, message: "Email already exists" };

  if (!name || !email || !password || !role) {
    
    return { status: 400, success: false, message: "All fields are required" };
  }

  const newUser = {name, email, password, role, isVerified: false, createdAt: new Date().toISOString()};

  users.push(newUser);
  saveUsers(users);
  console.log("Verify link: http://localhost:3000/verify-email?email=" + email);
  console.log(getUsers());
  

  return {
    status: 200,
    success: true,
    message: "Signup successful, please verify your email",
    data: null
  };
}

// ============================
//       VERIFY EMAIL
// ============================
export function verifyEmail(email) {
  let users = getUsers();

  let user = users.find(u => u.email === email);

  if (!user) {
    return { status: 404, success: false, message: "User not found" };
  }

  user.isVerified = true;
  saveUsers(users);

  return {
    status: 200,
    success: true,
    message: "Email verified successfully"
  };
}

// ============================
//          LOGIN
// ============================
export function login({ email, password }) {

  let users = getUsers();

  if (!email || !password) {
    return { status: 400, success: false, message: "Email and password are required" };
  }
  
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { status: 401, success: false, message: "Invalid email or password" };
  }

  if (!user.isVerified) {
    return { status: 403, success: false, message: "Please verify your email first" };
  }

  const accessToken = "access_" + Math.random().toString(36).slice(2);
  const refreshToken = "refresh_" + Math.random().toString(36).slice(2);

  const session = {
    email: user.email,
    accessToken,
    refreshToken,
    expiresAt: Date.now() + 15 * 60 * 1000
  };

  localStorage.setItem("session", JSON.stringify(session));

  return {
    status: 200,
    success: true,
    message: "Login successful",
    data: session
  };
}

// ============================
//     REFRESH ACCESS TOKEN
// ============================
export function refreshAccessToken() {
  let session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    return { status: 401, success: false, message: "No active session" };
  }

  const newAccess = "access_" + Math.random().toString(36).slice(2);
  session.accessToken = newAccess;
  session.expiresAt = Date.now() + 15 * 60 * 1000;

  localStorage.setItem("session", JSON.stringify(session));

  return {
    status: 200,
    success: true,
    message: "Token refreshed",
    data: { accessToken: newAccess }
  };
}

// ============================
//        GET USER
// ============================
export function getUser() {
  let users = getUsers();

  let session = JSON.parse(localStorage.getItem("session"));
  if (!session) {
    return { status: 401, success: false, message: "Not logged in" };
  }

  
  let user = users.find(u => u.email === session.email);

  if (!user) {
    return { status: 404, success: false, message: "User not found" };
  }

  return {
    status: 200,
    success: true,
    message: "User data loaded",
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }
  };
}

// ============================
//           LOGOUT
// ============================
export function logout() {
  localStorage.removeItem("session");

  return {
    status: 200,
    success: true,
    message: "Logged out successfully"
  };
}
