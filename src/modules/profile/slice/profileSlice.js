import { somethingWentWrong } from "@/constants/SchemaValidation";
import { axiosReact } from "@/services/api";
import { PROFILE } from "@/services/url";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const profileState = {
  userDetail: "",
  profileLoader: false,
};

export const getUserProfile = createAsyncThunk(
  `profile/getProfileData`,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosReact.post(PROFILE + payload, payload);
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || somethingWentWrong);
      return thunkAPI.rejectWithValue(err?.response?.data?.statusCode);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: profileState,
  reducers: {
    setProfileLoader: (state, action) => {
      state.profileLoader = action.payload;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(getUserProfile.pending, (state) => {});
    builder.addCase(getUserProfile.fulfilled, (state) => {
      console.log(state);
    });
    builder.addCase(getUserProfile.rejected, (state) => {});
  },
});
export const { setProfileLoader } = profileSlice.actions;
export default profileSlice.reducer;
