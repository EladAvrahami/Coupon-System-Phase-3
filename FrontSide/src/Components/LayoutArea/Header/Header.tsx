import { Link,NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import {useEffect, useState} from "react";
import store from "../../../Redux/Store";
import {UserInterface} from "../../../interfaces/UserInterface";
import {useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import ConfigureStore from "../../../reduxToolkit/StoreConfig";
import Logout from "./Logout/Logout";
import {unAuthorize} from "../../../reduxToolkit/LoginSlice";

function Header():JSX.Element{
    const dispatch = useDispatch();

    var history = useHistory();
    useSelector(store.getState);
    //  const result:any = useSelector(()=> store.getState().authState.isLogged)
    const isLogged = () =>{ if(store.getState().authState.isLogged){

      return <NavLink exact to="/Logout">Logout</NavLink>;

    } else{
      return <NavLink exact to="/Login">Login</NavLink>
    }
    }
    var Login = ()=>{
        history.push("/Login");
    }


    const handleLogout = () => {
     dispatch(unAuthorize());
     localStorage.clear();
    }

    // const [clientType] = useState(store.getState().authState.user.clientType) //taken from Aside.tsx line 10
    // const [clientType] = useState(localStorage.getItem("user")) // maybe you can use just this instead?
    const { email, role } = useSelector((state) => ConfigureStore.getState().LoginSlice);

    return(
        <div className="Header py-3 shadow-sm">
            <Link to="/">  {/* הוספת לינק שיפנה למסך הבית בלחיצה על לוגו */}
            <h3 className="font-weight-bold text-primary mx-1">Coupon System</h3>
            </Link>

            <div className="InHeader d-flex shadow-sm">

                {/*תפריט אורח  */}
                {role === '' && <div className="inHeader ml-auto d-flex mr-3"  >
                  {/*onClick={Login}*/}
                   
                  <Link  to="/CouponStore">
                    <button className="button btn btn-primary btn-s mx-1 margin-right: 30px " >Search & Buy!</button>
                    </Link>

                    <Link to="/Login">
                    <button className=" button btn btn-primary btn-s mx-1 "  >Login</button>
                    </Link>
                </div>}

                {role === 'admin' && <div className="inHeader ml-auto d-flex mr-3">
                    <Link  to="/GetCustomerCoupons/">
                    <button className="btn btn-primary btn-xs mx-2">Customer coupons</button>
                    </Link>
                    <Link  to="/GetCompanyCoupons/">
                    <button className="btn btn-primary btn-xs ms-2">Company coupons</button>
                    </Link>
                    <Link  to="/CustomersTable">
                    <button className="btn btn-primary btn-xs ms-2 ">Manage customers</button>
                    </Link>
                    <Link  to="/CompaniesTable">
                    <button className="btn btn-primary btn-xs ms-2 ">Manage companies</button>
                    </Link>
                    <Link  to="/">
                    <button className="btn btn-primary btn-s mx-1 " onClick={ handleLogout }>Logout</button>
                    </Link>
                <div>
                {/* <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button> */}
                 </div>
                </div>}

                {role === 'company' && <div className="inHeader ml-auto d-flex mr-3">
                <Link  to="/GetCompanyDetails">
                  <button className="btn btn-primary btn-xs mx-5">Company details</button>
                </Link>
                <Link  to="/SingleCompanyTable">
                  <button className="btn btn-primary btn-xs mx-5">Coupons management</button>
                </Link>
                
                    <Link  to="/GetCompanyCouponsByMaxPrice">
                    <button className="btn btn-primary btn-s mx-1 " >My coupons by max price</button>
                    </Link>

                    <Link  to="/">
                    <button className="btn btn-primary btn-s mx-1 " onClick={ handleLogout }>Logout</button>
                    </Link>
                <div>
                 {/* <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button> */}
                  {/* <NavLink exact to="/Logout">Logout</NavLink> */}
                 </div>
                </div>}

                {role === 'customer' && <div className="inHeader ml-auto d-flex mr-3">
                    
                 <Link  to="/CouponPurchase">
                    <button className="btn btn-primary btn-s mx-1 " >Purchase coupons</button>
                    </Link> 
                    <Link  to="/GetCustomerDetails">
                    <button className="btn btn-primary btn-s mx-1 " >My details</button>
                    </Link>
                    <Link  to="/GetPurchasedCouponsByMaxPrice">
                    <button className="btn btn-primary btn-s mx-1 " >My coupons by max price</button>
                    </Link>
                    <Link  to="/SingleCustomerTable/">
                    <button className="btn btn-primary btn-s mx-1 " >My coupons</button>
                    </Link>
                    <Link  to="/CouponStore">
                    <button className="btn btn-primary btn-s mx-1 " >Search & Buy!</button>
                    </Link>
                    <Link  to="/">
                    <button className="btn btn-primary btn-s mx-1 " onClick={ handleLogout }>Logout</button>
                    </Link>
                    <div>

                 {/* <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button> */}
                 </div>
                </div>}
            </div>
        </div>
    );
}

export default Header;