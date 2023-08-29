import { createSlice } from "@reduxjs/toolkit";

const initialReceivedState = {
  receivedMails: [],
};

const receivedSlice = createSlice({
  name: "received",
  initialState: initialReceivedState,
  reducers: {
    getReceivedMail(state, action) {
      
      if(!action.payload){
        state.receivedMails =[];
      }else {
        state.receivedMails = [...action.payload];
      }
      console.log('state.receivedMails', state.receivedMails);
    },
    addEmail(state, action) {
      state.receivedMails = [...state.receivedMails, action.payload];
    },

    removeEmail(state, action) {
      let updatedItems;
      updatedItems = state.receivedMails.filter(
        el => el.id !== action.payload
      );
      state.receivedMails = [...updatedItems]
    },

    readMail(state, action) {
      let updatedItem = [];
      for(let el of state.receivedMails){
        if(el.id === action.payload.id){
          updatedItem.push(action.payload);
        }else {
          updatedItem.push(el);
        }
      }
      state.receivedMails = [...updatedItem];
    }
  },
});

export const receivedActions = receivedSlice.actions;

export default receivedSlice.reducer;