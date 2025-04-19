import { toast } from "react-toastify";
import Cookies, { cookieKeys } from "@/services/cookies";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { somethingWentWrong } from "@/constants/SchemaValidation";
import { axiosReact } from "@/services/api";
import { LOGIN } from "@/services/url";

const token = Cookies.get(cookieKeys?.TOKEN) || localStorage.getItem("token");
const user = Cookies.get(cookieKeys?.USER);

const loginState = {
  isAuth: !!token,
  // isAuth:false,
  token: token ? token : "",
  pageLoader: false,
  userDetail: user,
};

export const getLogin = createAsyncThunk(
  `authentication/LoginThunk`,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosReact.post(LOGIN, payload);
      if (response?.status === 200) {
        Cookies.set(cookieKeys?.USER, response?.data?.user_serializer);
        return response.data;
      }
      return true;
    } catch (err) {
      Cookies.set(cookieKeys?.TOKEN, "thisisfaketoken");
      localStorage.setItem("token" , "thisisfaketoken")
      // toast.error(err?.response?.data?.message || somethingWentWrong);
      return true
      // return thunkAPI.rejectWithValue(err?.response?.data?.statusCode);
    }
  }
);
export const getLogout = createAsyncThunk(
  `authentication/Logout`,
  async (payload, thunkAPI) => {
    try {
      // const response = await axiosReact.post(LOGIN, payload);
      // if (response?.status === 200) {
      //   Cookies.set(cookieKeys?.USER, response?.data?.user_serializer);
      //   return response.data;
      // }
      Cookies.remove(cookieKeys.TOKEN);
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || somethingWentWrong);
      return thunkAPI.rejectWithValue(err?.response?.data?.statusCode);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    setPageLoader: (state, action) => {
      state.pageLoader = action.payload;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(getLogin.pending, (state) => {
      state.loading = true;
      state.isAuth = true;
    });
    builder.addCase(getLogin.fulfilled, (state) => {
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(getLogin.rejected, (state) => {
      state.loading = false;
      state.isAuth = true;
    });

    // getLogout
    builder.addCase(getLogout.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getLogout.fulfilled, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getLogout.rejected, (state) => {});
  },
});
export const { setPageLoader } = loginSlice.actions;
export default loginSlice.reducer;
