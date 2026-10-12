import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { authApi, setClearAuth } from "../api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: !!action.payload, loading: false };
    case "CLEAR_USER":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const refreshUser = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const hasToken = typeof document !== "undefined" && document.cookie.split(";").some((c) => c.trim().startsWith("token="));
      if (!hasToken) {
        dispatch({ type: "CLEAR_USER" });
        return;
      }
      const { data } = await authApi.me();
      dispatch({ type: "SET_USER", payload: data.data });
    } catch (err) {
      dispatch({ type: "CLEAR_USER" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const clearAuth = useCallback(() => {
    dispatch({ type: "CLEAR_USER" });
  }, []);

  useEffect(() => {
    setClearAuth(clearAuth);
    return () => setClearAuth(null);
  }, [clearAuth]);

  const login = async (credentials) => {
    try {
      const { data } = await authApi.login(credentials);
      dispatch({ type: "SET_USER", payload: data.data });
      toast.success("Welcome back!");
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await authApi.register(userData);
      dispatch({ type: "SET_USER", payload: data.data });
      toast.success("Account created!");
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // ignore
    } finally {
      dispatch({ type: "CLEAR_USER" });
      toast.success("Logged out");
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
