import Api from "../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IRegisterType from "../../type/RegisterType";

interface AuthState {
  currentUser: null | UserType;
  isLoading: boolean;
}

interface UserType {
  user: string;
  token: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "/create",
  async ({ fullName, userName, email, password }: IRegisterType) => {
    try {
      const response = await Api.post("/register", {
        fullName,
        userName,
        email,
        password,
      });
      const data = response.data;
      console.log("ini data", data);
    } catch (error) {
      console.error("Error during Registration", error);
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }: LoginParams) => {
    try {
      const response = await Api.post("/login", {
        email,
        password,
      });
      const data: IRegisterType = response.data;
      console.log(data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("error during login", error);
        throw error.response!.data.message;
      }
    }
  }
);

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});
export default authSlice.reducer;
