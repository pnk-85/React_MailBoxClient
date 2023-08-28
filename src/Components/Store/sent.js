import { createSlice } from "@reduxjs/toolkit";

const initialsentState = {
  sentMails: [],
};

const sentSlice = createSlice({
  name: "sent",
  initialState: initialsentState,
  reducers: {
    getsentMail(state, action) {
      state.sentMails = action.payload;
    },
    addEmail(state, action) {
      state.sentMails = [...state.sentMails, action.payload];
      console.log(" sent mails", state.sentMails);
    },
  },
});

export const sentActions = sentSlice.actions;

export default sentSlice.reducer;