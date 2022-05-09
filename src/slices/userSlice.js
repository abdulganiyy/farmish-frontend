import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import jwtDecode from "jwt-decode";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        "http://localhost:6500/api/v1/user/signup",
        data
      );

      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (err) {
      return rejectWithValue("unable to sign up");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        "http://localhost:6500/api/v1/user/signin",
        data
      );

      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (err) {
      return rejectWithValue("Unable to signin");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const { id, ...others } = data;
      const response = await Axios.put(
        `http://localhost:6500/api/v1/user/${id}`,
        others,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log(response.data.user);

      return response.data.user;
    } catch (err) {
      return rejectWithValue("Unable to update");
    }
  }
);

export const loadApp = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const user = jwtDecode(token);
        console.log(user.id);
        const response = await Axios.get(
          `http://localhost:6500/api/v1/user/${user.id}`
        );

        //console.log(response.data.user);

        return response.data.user;
      }
    } catch (err) {
      return rejectWithValue("Unable to login");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "logged out",
    loading: false,
    currentUser: null,
    error: "",
  },

  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
      state.status = "logged out";
    },
  },
  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = "logged in";
      state.currentUser = action.payload;
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = "logged in";
      state.currentUser = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [loadApp.pending]: (state, action) => {
      state.loading = true;
    },
    [loadApp.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = "logged in";
      state.currentUser = action.payload;
    },
    [loadApp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
