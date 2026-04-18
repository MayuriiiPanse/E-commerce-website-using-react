import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    carts: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadcart: (state, action) => {
            state.carts = action.payload; //payload=data
        }
    }

})

export default cartSlice.reducer;
export const {loadcart } = cartSlice.actions;