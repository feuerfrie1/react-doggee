import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const editUser = createAsyncThunk("users/editUser", async (id) => {
  const { data } = await axios.patch(`/users/${id}`);
  return data;
});

export const getUser = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

interface User {
  email: string;
  password: string;
  name: string;
  birthday: number;
  registrationAddress: string;
  id: string;
}

interface UserSliceState {
  id: number | null;
  user: User | null;
  status: string;
  isAuthChecked: boolean;
}

export const initialState: UserSliceState = {
  id: null,
  user: null,
  isAuthChecked: false,
  status: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUserId(state, action) {
      state.id = action.payload;
    },
    setUser(state, action) {
      const { id } = action.payload;
      state.id = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(editUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.user = null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
});

export const selectIsAuth = (state: { user: UserSliceState }) =>
  Boolean(state.user);

const { actions, selectors, reducer } = userSlice;
export const { setAuthChecked } = actions;
export const { selectUser, selectIsAuthChecked } = selectors;

export default reducer;

export const userReducer = userSlice.reducer;
