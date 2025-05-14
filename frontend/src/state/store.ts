import {configureStore} from "@reduxjs/toolkit"
import loginState from "./auth/loginSlice"
import itemState from "./item/itemslice"

export const store = configureStore({
    reducer:{loginState,itemState},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch