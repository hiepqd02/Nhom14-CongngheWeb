import {configureStore} from "@reduxjs/toolkit"
import userReducer from './Slices/userSlices'
import alertReducer from './Slices/alertSlice'
import cardReducer from './Slices/cardSlice'

import boardsReducer from './Slices/boardsSlice'

const Store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        store: cardReducer,
        boards: boardsReducer
    }
})

export default Store
