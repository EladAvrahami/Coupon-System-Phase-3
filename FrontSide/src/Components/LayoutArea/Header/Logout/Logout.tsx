import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../../../../src/Redux/Store";
import { LogoutAction } from "../../../../Redux/AuthState";
import notify from "../../../Services/Notify";
import Header from "../Header";
import {useDispatch} from "react-redux";
import {unAuthorize} from "../../../../reduxToolkit/LoginSlice";

// const Logout = () => {
//     localStorage.localStorage.clear();;
//     history.push("/HomePage");
//   };


function Logout(): JSX.Element {

    // const dispatch = useDispatch();
    // dispatch(unAuthorize());

    // store.dispatch(LogoutAction());
    //localStorage.clear();
    //const history=useHistory();
    // useEffect(()=>{
    //     // store.dispatch(LogoutAction());
    //     notify.success("You have logged-out successfully.");
    //     // history.push('');
    // });
    return (
        <Header/>
    );
}

export default Logout;
