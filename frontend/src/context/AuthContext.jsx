import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API = "https://med1-production.up.railway.app";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("mg_authed") === "true"
  );

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("mg_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    sessionStorage.setItem("mg_authed", String(isAuthenticated));

    if (user) {
      sessionStorage.setItem("mg_user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("mg_user");
    }
  }, [isAuthenticated, user]);

  // ---------------- LOGIN ----------------

  const login = async (username, password) => {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }

    // Login user
    setUser({
      id: data.id,
      username: data.username,
      full_name: data.full_name,
    });

    setIsAuthenticated(true);

    return data;
  };

  // ---------------- REGISTER ----------------

  const register = async (full_name, username, password) => {
    const response = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Signup failed");
    }

    // DO NOT LOGIN USER HERE
    return data;
  };

  // ---------------- LOGOUT ----------------

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    sessionStorage.removeItem("mg_authed");
    sessionStorage.removeItem("mg_user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}