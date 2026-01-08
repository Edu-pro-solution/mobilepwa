
// const useAuth = () => {
//   // Register user
//   const register = async (fullname, phone, username, email, password) => {
//     if (!window.api?.register) throw new Error("Electron API not available");

//     const response = await window.api.register({ fullname, phone, username, email, password });

//     if ((response.status === 201 || response.status === true) && response.user) {
//       // Save locally for fallback
//       let users = JSON.parse(localStorage.getItem("users")) || [];
//       users.push({ ...response.user, password });
//       localStorage.setItem("users", JSON.stringify(users));
//     }

//     return response;
//   };

//   // Login user
//   const login = async (email, password) => {
//     console.log("Logging in with:", { email, password });

//     // Use Electron API first
//     if (window.api?.login) {
//       try {
//         const response = await window.api.login({ email, password });
//         console.log("Electron API login response:", response);

//         if (!response.status) throw new Error(response.message || "Login failed");

//         // localStorage.setItem("loggedInUser", JSON.stringify(response.user));
//         localStorage.setItem("user", JSON.stringify(response.user));

//         return response.user;
//       } catch (err) {
//         console.error("Electron login failed:", err);
//         // Fallback to localStorage
//       }
//     }

//     // Fallback: localStorage
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find((u) => u.email === email);
//     if (!user) throw new Error("User not found");
//     if (user.password !== password) throw new Error("Incorrect password");

//     localStorage.setItem("loggedInUser", JSON.stringify(user));
//     return user;
//   };

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("loggedInUser");
//   };

//   return { register, login, logout };
// };

// export default useAuth;
import axios from "axios";

const API_BASE = "https://eduproapi.vercel.app/api/auth";

const useAuth = () => {
  /* =========================
     REGISTER
  ========================= */
  const register = async (fullname, phone, username, email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/jambsignup`, {
        fullname,
        phone,
        username,
        email,
        password,
      });

      // Save auth info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Registration failed" };
    }
  };

  /* =========================
     LOGIN
  ========================= */
const login = async (email, password) => {
  const res = await axios.post(`${API_BASE}/jamblogin`, {
    email,
    password,
  });

  if (!res.data?.token) {
    throw new Error("Invalid login response");
  }

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data.user;
};


  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.clear();
  };

  return { register, login, logout };
};

export default useAuth;
