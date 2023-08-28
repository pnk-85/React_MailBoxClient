import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';
import receivedReducer from './recieved';
import sentReducer from './sent'


const store = configureStore ({
    reducer : {
        auth : authReducer,
        received : receivedReducer,
        sent : sentReducer,
    }
})

export default store;