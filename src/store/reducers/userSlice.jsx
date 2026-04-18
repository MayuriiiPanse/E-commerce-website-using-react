import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   user:null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            //here we cannot call api
            state.user = action.payload; //payload=data
        },

        removeuser : (state) =>{
            state.user = null;
        }
    }

})

export default userSlice.reducer;
export const {loaduser,removeuser} = userSlice.actions;