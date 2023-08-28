import { createSlice } from "@reduxjs/toolkit";

const initialReceivedState = {
  receivedMails: [],
};

const receivedSlice = createSlice({
  name: "received",
  initialState: initialReceivedState,
  reducers: {
    getReceivedMail(state, action) {
      state.receivedMails = action.payload;
    },
    addEmail(state, action) {
      state.receivedMails = [...state.receivedMails, action.payload];
    },
  },
});

export const receivedActions = receivedSlice.actions;

export default receivedSlice.reducer;