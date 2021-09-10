import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notify";
import CouponData from "../../../Models/CouponData";
import "./CouponPurchase.css";
import CustomerData from "../../../Models/CustomerData";
import UserModel from "../../../Models/UserModel";
import AxiosRequest from "../../../../axios/AxiosRequest";

function CouponPurchase(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(coupon:CouponData){
        await AxiosRequest.post<CouponData>("coupons/purchaseCoupon/"+coupon.id)
            .then(response => {
                console.log(response.data)
                notify.success("* Coupon successfully purchased!")
            })
            .catch(error => {
                console.log(error.response.data.message);
               notify.error(error.response.data.message);
            })
        // try{
        //     const response = await AxiosRequest.post<CouponData>("coupons/purchaseCoupon/"+coupon.id);
        //     console.log(response.data);
        //     notify.success("The coupon was successfully purchased!");

        // } catch {
        //     notify.error("The coupon was NOT purchased.");
        // }
    }
    
    return (
        <div className="CouponPurchase Box">
			<h2>Coupon Purchase</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Coupon's ID" ref={register({
                   required: {value:true , message:"Please enter coupon id number."},
                   min: {value:1, message:"ID number can only be positive."}
               })}/>
               <span><br/>{errors.id?.message}</span>
               <br/><br/>
                <button>Purchase</button>
            </form>
        </div>
    );
}

export default CouponPurchase;