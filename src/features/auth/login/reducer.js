import { createSlice } from "@reduxjs/toolkit";
import get from "lodash/fp/get";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {},
  reducers: {
    store(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = currentUserSlice;

export const isLoggedInSelector = (state) =>
  !!get("currentUser.username", state);

export const { store } = actions;

export default reducer;