 import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        loadproduct: (state, action) => {
            state.products = action.payload; //payload=data
        },
        loadlazyproduct: (state, action) => {
            state.products = [...state.products ,...action.payload] //payload=data
        }
    }

})

export default productSlice.reducer;
export const {loadproduct,loadlazyproduct} = productSlice.actions;