import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { walletslice } from "./walletSlice";
import { useridSlice } from "./Userid";

const store = configureStore({
    reducer: {
        users : userSlice.reducer,
        wallet: walletslice.reducer,
        userId : useridSlice.reducer
    },
});

export default store;
