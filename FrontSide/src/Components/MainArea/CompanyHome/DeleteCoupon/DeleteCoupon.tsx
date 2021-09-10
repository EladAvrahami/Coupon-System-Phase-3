import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import CompanyData from "../../../Models/CompanyData";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(coupon:CouponData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.delete<CouponData>("http://localhost:8080/couponsdb/deleteCoupon/"+coupon.id);
            console.log(response);
            notify.success("The coupon was successfully deleted.");
        
        } catch {
            notify.error("The coupon was NOT deleted.")
        }
    }

    
    return (
        <div className="DeleteCoupon Box">
			<h2>Delete Coupon</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Coupon's id" ref={register({
                    required: {value:true , message:"No id number was typed."},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <button>Delete</button>
            </form>
        </div>
    );
}

export default DeleteCoupon;