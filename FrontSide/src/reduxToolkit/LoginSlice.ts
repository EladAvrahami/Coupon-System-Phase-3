import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: {
        //email: localStorage.getItem("Username") !== null ? localStorage.getItem("Username") : '',
        email: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : '',
        //role: localStorage.getItem("Role") !== null ? localStorage.getItem("Role") : '',
        role: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).clientType : '',
    },
    reducers: {
        /*כניסה */
        authorize: (state, action) => {
            const { emailValue, roleValue } = action.payload;
            state.email = emailValue;
            state.role = roleValue;
        },
         /* בעצם מחזיר לסטייט של לוגין סלייס שדות ריקים -יציאה  */
        unAuthorize: (state) => {
            state.email = '';
            state.role = '';
        },
    }
});

export const {
    authorize,
    unAuthorize
} = LoginSlice.actions;

export default LoginSlice.reducer;