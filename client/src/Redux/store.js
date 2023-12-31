import { configureStore } from "@reduxjs/toolkit"
import userReducer from './Slices/userSlices'
import alertReducer from './Slices/alertSlice'
import cardReducer from './Slices/cardSlice'

const Store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        store:cardReducer,
    }
})

export default Store
