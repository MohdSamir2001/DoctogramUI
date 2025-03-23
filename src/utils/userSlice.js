import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    removeUser: (state) => null,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
