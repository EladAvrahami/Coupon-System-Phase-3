import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AxiosRequest from "../../../../axios/AxiosRequest";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CouponData from "../../../Models/CouponData";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";

function GetCustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponData[]>([]);

    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
    const { data : coupons } : { data : CouponData[] } = await AxiosRequest.get(`/coupons/getCouponsByCustomer2/`+customer.id);
    setCoupons(coupons);
            notify.success("");
        } catch {
            notify.error("* There's NO customer with that id.")
        }
    }
   
       return (
           <div className="GetCustomerCoupons Box">
               {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
			<h2>Get customer coupons:</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"Missing id."},
                })}/>
                <br/><br/>
                <button>Get</button>
            </form>
        </div>
       );
   }
   
   export default GetCustomerCoupons;