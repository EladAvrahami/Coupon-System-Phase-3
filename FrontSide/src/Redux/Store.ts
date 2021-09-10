import { combineReducers, createStore } from "redux";
import {adminReducer} from "./adminState"
import {couponReducer} from "./CouponState" 
import {companyReducer} from "./CompanyState"
import {customerReducer} from "./CustomerState"
import {authReducer} from "./AuthState"

const reducers = combineReducers({
    couponState:couponReducer,
    adminState:adminReducer,
    companyState:companyReducer,
    customerState:customerReducer,
    authState:authReducer
});

const store = createStore(reducers);

export default store;