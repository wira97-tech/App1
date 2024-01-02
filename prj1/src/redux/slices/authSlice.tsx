import Api from "../../lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IRegisterType from "../../type/RegisterType"
import { jwtDecode } from "jwt-decode"
interface AuthState {
  currentUser: null | UserType
  loggedInUserId: null | string
  isLoading: boolean
}

interface UserType {
  id: string
  user: string
  token: string
}

interface LoginParams {
  email: string
  password: string
}

export const selectLoggedInUserId = (state: AuthState) => state.loggedInUserId
export const register = createAsyncThunk(
  "/create",
  async ({ fullName, userName, email, password }: IRegisterType) => {
    try {
      const response = await Api.post("/register", {
        fullName,
        userName,
        email,
        password,
      })
      const data = response.data
      console.log("ini data", data)
    } catch (error) {
      console.error("Error during Registration", error)
    }
  }
)

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }: LoginParams) => {
    try {
      const response = await Api.post("/login", {
        email,
        password,
      })
      console.log(response)
      const data: UserType = response.data
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("error during login", error)
        throw error.response!.data.message
      }
    }
  }
)

export const logout = createAsyncThunk<void, void>("/logout", async () => {
  try {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  } catch (error) {
    console.error("Error during logout:", error)
    throw error
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loggedInUserId: null,
    isLoading: false,
  } as AuthState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload) {
          localStorage.setItem("token", action.payload.token)
          console.log(action.payload)
          const user = jwtDecode<{ user: UserType }>(action.payload.token)
          console.log(user)
          const userObj: UserType = user.user
          localStorage.setItem("user", JSON.stringify(userObj))
          state.currentUser = userObj
          state.loggedInUserId = userObj.id
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null
        state.loggedInUserId = null
      })
  },
})

export default authSlice.reducer
