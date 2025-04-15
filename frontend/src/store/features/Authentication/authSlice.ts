import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AuthState{
    isAuthenticated : boolean;
    name: string;
    phoneNumber : string;
    emailAdded : boolean
}

const initialState : AuthState = {
    isAuthenticated : false,
    name : "",
    phoneNumber :"",
    emailAdded : false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers : {
        FirstSignUpData:(state,action: PayloadAction<{name:string,phoneNumber:string}>)=>{
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.emailAdded = false
        },
        setLoginName : (state,action:PayloadAction<string>)=>{
            state.name = action.payload;
        },
        loginSuccess: (state,action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        logoutStatus : (state) => {
            state.isAuthenticated = false;
            state.name = "";
            state.phoneNumber = "";
        }
    }
})


export const {FirstSignUpData,loginSuccess,logoutStatus , setLoginName} = authSlice.actions;
export default authSlice.reducer;