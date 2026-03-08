import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthSession } from "@/features/auth/types";
import type { RootState } from "../store";

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// --- Async Thunks ---

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { email }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // TODO: Real API call - uncomment when backend is ready
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!response.ok) throw new Error('Login failed');
      // const { user, token } = await response.json();

      // Mock values
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = "mock-jwt-token";

      const session: AuthSession = {
        user,
        token,
        expiresAt: new Date(Date.now() + SESSION_DURATION),
        idleTimeoutAt: new Date(Date.now() + IDLE_TIMEOUT),
      };

      localStorage.setItem("authSession", JSON.stringify(session));
      return { user, session };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed",
      );
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    { email, name }: { email: string; password: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      // TODO: Real API call - uncomment when backend is ready
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name }),
      // });
      // if (!response.ok) throw new Error('Registration failed');
      // const { user, token } = await response.json();

      // Mock values
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user: User = {
        id: "1",
        email,
        name,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = "mock-jwt-token";

      const session: AuthSession = {
        user,
        token,
        expiresAt: new Date(Date.now() + SESSION_DURATION),
        idleTimeoutAt: new Date(Date.now() + IDLE_TIMEOUT),
      };

      localStorage.setItem("authSession", JSON.stringify(session));
      return { user, session };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (_: { email: string }, { rejectWithValue }) => {
    try {
      // TODO: Real API call - uncomment when backend is ready
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // if (!response.ok) throw new Error('Failed to send reset email');

      // Mock: always succeeds
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to send reset email",
      );
    }
  },
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (_: { token: string; password: string }, { rejectWithValue }) => {
    try {
      // TODO: Real API call - uncomment when backend is ready
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, password }),
      // });
      // if (!response.ok) throw new Error('Failed to reset password');

      // Mock: always succeeds
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to reset password",
      );
    }
  },
);

// --- Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession: (state) => {
      if (typeof window === "undefined") return;
      const stored = localStorage.getItem("authSession");
      if (!stored) return;
      try {
        const session: AuthSession = JSON.parse(stored);
        if (new Date(session.expiresAt) > new Date()) {
          state.user = session.user;
          state.session = session;
          state.isAuthenticated = true;
        } else {
          localStorage.removeItem("authSession");
        }
      } catch {
        localStorage.removeItem("authSession");
      }
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authSession");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { restoreSession, logout, clearError } = authSlice.actions;

// --- Selectors ---
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
