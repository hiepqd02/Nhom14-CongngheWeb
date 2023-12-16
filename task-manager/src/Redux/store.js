import { configureStore } from "@reduxjs/toolkit"
import userReducer from './Slices/userSlices'
const Store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default Store