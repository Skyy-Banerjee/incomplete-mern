import { createSlice } from "@reduxjs/toolkit";


function loadUserFromLocalStorage() {
  try {
    const seriealizedState = localStorage.getItem("user");
    if (seriealizedState === null) return { user: null };
    return { user: JSON.parse(seriealizedState) };
  } catch (error) {
    return { user: null };
  }
}

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
