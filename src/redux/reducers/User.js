import { createSlice } from "@reduxjs/toolkit";
const initialState={userToken:""}
const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        addUserToken(state,action){
            console.log('I am here',action.payload)
            state.userToken = action.payload;
        }
    }

})
export const userActions=userSlice.actions
export default userSlice.reducer