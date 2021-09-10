import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AxiosRequest from "../../../../axios/AxiosRequest";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CompanyData from "../../../Models/CompanyData";
import CouponData from "../../../Models/CouponData";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./GetPurchasedCouponsByMaxPrice.css";

function GetPurchasedCouponsByMaxPrice(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();
    const [coupons, setCoupons] = useState<CouponData[]>([]);
    async function send(coupon:CouponData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await AxiosRequest.get("/coupons/getCouponsPerCustomerByMaxPrice/"+coupon.price);
            const myResponse = response.data;
            setCoupons(myResponse);

            notify.success("");
        } catch {
            notify.error("* Value must be positive.")
        }
    }

    return (
        <div className="GetPurchasedCouponsByMaxPrice Box">
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


export default GetPurchasedCouponsByMaxPrice;

// import { Component } from "react";
// import "./GetCustomerDetails.css";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import CompanyData from "../../../Models/CompanyData";
// import CustomerData from "../../../Models/CustomerData";
// import CouponData from "../../../Models/CouponData";

// interface GetPurchasedCouponsByMaxPriceProps {
//     price:number;
// }

// class GetPurchasedCouponsByMaxPrice extends Component<GetPurchasedCouponsByMaxPriceProps,{}> {

//     public constructor(props:GetPurchasedCouponsByMaxPriceProps ) {
//         super(props);
//         this.state = {            
//             myCoupon : new CouponData  
//         };
        
//     }

//     public render(): JSX.Element {
//         return (
//             <div className="GetPurchasedCouponsByMaxPrice">               
//                 <div className="Box GetPurchasedCouponsByMaxPrice"> 
//                     <h3>Coupons by maximum price:</h3>
//                 COUPON ID:         {this.props.myCoupon.id} <br/>
// 				COMPANY ID:        {this.props.myCoupon.companyID} <br/>
// 				CATEGORY:          {this.props.myCoupon.category} <br/>
// 				TITLE:             {this.props.myCoupon.title} <br/>
//                 DESCRIPTION:       {this.props.myCoupon.description} <br/>
//                 START DATE:        {this.props.myCoupon.startDate} <br/>
// 				END DATE:          {this.props.myCoupon.endDate} <br/>
// 				AMOUNT:            {this.props.myCoupon.amount} <br/>
// 				PRICE:             {this.props.myCoupon.price} <br/>
//                 IMAGE:             {this.props.myCoupon.image} <br/>
//                 </div>
//             </div>
//         );
//     }

//     public async componentDidMount(){
//         const response = await axios.get<CouponData>("http://localhost:8080/coupons/getCouponsPerCustomerByMaxPrice/"+price);
//         const CustomerData = result.data;
//         console.log(CustomerData);
//         this.setState({
//             myCustomer : CustomerData
//         })
//     }
// }

// export default GetPurchasedCouponsByMaxPrice;