import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";
import "./GetCompanyCouponsByCategory.css";

function GetCompanyCouponsByCategory(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(coupon:CouponData){
            //lecturer is in json mode, ready to send.....      
            const response = await axios.get<CouponData>("http://localhost:8080/coupons/GetCompanyCouponsByCategory/{/id}{/categoryId}");
            console.log(response);
    }

    /*
    useEffect(() => {
       if (store.getState().authState.user.clientType!="company"){
            notify.error("You are not allowed, you little p***");
            history.push("/Login");
        }
    })
    */
    
    return (
        <div className="GetCompanyCouponsByCategory Box">
			<h2>Get company coupons by category</h2>
            <input type="number" name="category" placeholder="Category id." ref={register({
                    required: {value:true , message:"No category number was typed"},
                })}/>
                <span><br/>{errors.category?.message}</span>
                <br/><br/>
                <button>Get</button>
        </div>
    );
}

export default GetCompanyCouponsByCategory;