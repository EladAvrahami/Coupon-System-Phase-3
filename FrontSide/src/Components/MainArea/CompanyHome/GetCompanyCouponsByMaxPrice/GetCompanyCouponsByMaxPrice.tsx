import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AxiosRequest from "../../../../axios/AxiosRequest";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CompanyData from "../../../Models/CompanyData";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";
import "./GetCompanyCouponsByMaxPrice.css";

function GetCompanyCouponsByMaxPrice(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();
    const [coupons, setCoupons] = useState<CouponData[]>([]);
    async function send(coupon:CouponData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await AxiosRequest.get("/coupons/getCouponsByMaxPrice/"+coupon.price);
            const myResponse = response.data;
            setCoupons(myResponse);

            notify.success("");
        } catch {
            notify.error("* Value must be positive.");
        }
    }

    return (
        <div className="GetCompanyCouponsByMaxPrice Box">
        {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
			<h2>Coupons by max price</h2>
            <form onSubmit={handleSubmit(send)}>
            <input type="number" name="price" placeholder="Maximum price" ref={register({
                    required: {value:true , message:"Missing value"},
                })}/>
                <span><br/>{errors.price?.message}</span>
                <br/><br/>
                
                <button>Get</button>
            </form>
        </div>
    );
}


export default GetCompanyCouponsByMaxPrice;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
// import SingleCoupon from "../../../Coupons/SingleCoupon";
// import CompanyData from "../../../Models/CompanyData";
// import CouponData from "../../../Models/CouponData";
// import notify from "../../../Services/Notify";
//
// function GetCompanyCouponsByMaxPrice(): JSX.Element {
//     const [coupons, setCoupons] = useState<CouponData[]>([]);
//
//     const {register, handleSubmit, errors} = useForm<CompanyData>();
//     const history = useHistory();
//
//     async function send(){
//         try{
//             const { data : coupons } : { data : CouponData[] } = await axios.get(
//                 `http://localhost:8080/coupons/getCouponsByMaxPrice/`,
//
//             );
//
//             setCoupons(coupons);
//             notify.success("");
//         } catch {
//             notify.error("Error")
//         }
//     }
//
//     return (
//         <div className="GetCompanyCouponsByMaxPrice row">
//             {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
//             <h2>Coupons by max price:</h2>
//             <form onSubmit={handleSubmit(send)}>
//                 <input type="number" name="price" placeholder="Maximum price" ref={register({
//                     required: {value:true , message:"Missing price."},
//                 })}/>
//                 <br/><br/>
//                 <button>Get</button>
//             </form>
//         </div>
//     );
// }
//
// export default GetCompanyCouponsByMaxPrice;