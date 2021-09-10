import CredentialsModel from "../Components/Models/CredentialsModel";
import UserModel from "../Components/Models/UserModel";
import jwt_decode from "jwt-decode"


//auth state
export class AuthState{
    public user:UserModel = null;
    public isLogged:boolean;
    public constructor(){
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {this.user = storedUser}
    }
}
//auth action types
export enum AuthActionType{
    Register="Register",
    Login="Login",
    Logout = "Logout"
}
//auth action
export interface AuthAction{
    type:AuthActionType,
    payload? : any
}
//auth action creators
export function RegisterAction(user: UserModel):AuthAction{
    return {type: AuthActionType.Register, payload:user}
}
export  function LoginAction(user:UserModel):AuthAction{
    return {type:AuthActionType.Login, payload:user}
}
export  function LogoutAction():AuthAction{
    return {type: AuthActionType.Logout}
}

//auth reducer
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction):AuthState{
    const newState = {...currentState}; //spread operator = שכפול אובייקט לאובייקט חדש
    switch(action.type){
        case AuthActionType.Register:

            //here the payload is the registered user sent from the server
            //we deleted the newStateUser and AuthAction , since we combine it
        case AuthActionType.Login:
            //need to install npm install jwt-decode
            // var decoded = JSON.parse(jwt_decode(action.payload));        
            //newState.user.userId = decoded.id;
           // newState.user.token = action.payload;
          //  newState.user.email = decoded.sub;
            //here is the payload is the logged in user sent from the server
            newState.user = action.payload; 
            newState.isLogged=true;
            //saving in the local storage (won't be deleted)
            localStorage.setItem("user",JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.user = null;
            newState.isLogged=false;
            localStorage.removeItem("user")
    }
    return newState;
}
export default AuthState;