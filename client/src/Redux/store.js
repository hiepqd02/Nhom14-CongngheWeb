import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slices/userSlices";
import alertReducer from "./Slices/alertSlice";
import boardsReducer from "./Slices/boardsSlice";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import cardReducer from "./Slices/cardSlice";

const Store = configureStore({
        reducer: {
                user: userReducer,
                alert: alertReducer,
                boards: boardsReducer,
                list: listReducer,
                card: cardReducer,
                board: boardReducer
        }
})

export default Store
