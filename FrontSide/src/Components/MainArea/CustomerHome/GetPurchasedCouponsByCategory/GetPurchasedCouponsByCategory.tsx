import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponData from "../../../Models/CouponData";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./GetPurchasedCouponsByCategory.css";

function GetPurchasedCouponsByCategory(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(coupon:CouponData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.get<CouponData>("http://localhost:8080/coupons/getCouponsPerCustomerByCategory/"+coupon.category);
            console.log(response);
            notify.success("There is a customer with that id.");
        } catch {
            notify.error("There is NO customer with that id.")
        }
    }

    
    return (
        <div className="GetPurchasedCoupons Box">
			<h2>Get All Coupons Per Customer By Category</h2>
            <form onSubmit={handleSubmit(send)}>
            <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"Missing id"},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <input type="text" name="category" placeholder="Category" ref={register({
                    required: {value:true , message:"Missing id"},
                })}/>
                <span><br/>{errors.category?.message}</span>
                <br/><br/>
                <button>Get </button>
            </form>
        </div>
    );
}


export default GetPurchasedCouponsByCategory;