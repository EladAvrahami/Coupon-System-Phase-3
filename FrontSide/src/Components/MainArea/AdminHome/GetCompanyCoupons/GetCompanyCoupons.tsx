// // import axios from "axios";
// // import { Component } from "react";
// // import { useForm } from "react-hook-form";
// // import { useHistory } from "react-router-dom";
// // import store from "../../../../Redux/Store";
// // import SingleCompany from "../../../Companies/SingleCompany";
// // import CompanyData from "../../../Models/CompanyData";
// // import notify from "../../../Services/Notify";
// // import axios from "axios";
// // import { useForm } from "react-hook-form";
// // import { useHistory } from "react-router-dom";
// // import CompanyData from "../../../Models/CompanyData";
// // import notify from "../../../Services/Notify";
// // import "./DeleteCompany.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AxiosRequest from "../../../../axios/AxiosRequest";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CompanyData from "../../../Models/CompanyData";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";

// function GetCompanyCoupons(): JSX.Element {
//     const {register, handleSubmit, errors} = useForm<CompanyData>();
//     //for sending the browser to specific location 
//     const history = useHistory();

//     async function send(company:CompanyData){
//         try{
//             //lecturer is in json mode, ready to send.....      
//             const response = await axios.get<CompanyData>("http://localhost:8080/coupons/getCouponsByCompany");
//             console.log(response);
//             const myResponse = response.data;
            
//             console.log(myResponse)
//             notify.success("The company was successfully deleted.");
//         } catch {
//             notify.error("The company was NOT deleted.")
//         }
//     }

    
//     return (
//         <div className="GetCompanyCoupons Box">
// 			<h2>Get Company Coupons</h2>
//             <form onSubmit={handleSubmit(send)}>
//                 <input type="number" name="companyId" placeholder="Company's id" ref={register({
//                     required: {value:true , message:"No number was typed"},
//                 })}/>
//                 <span><br/>{errors.companyId?.message}</span>
//                 <br/><br/>
//                 <button>Get</button>
//             </form>
//         </div>
//     );
// }

// export default GetCompanyCoupons;


// interface GetCompanyCouponsProps {
//     companyId:number;  
// }

// interface CompanyState {
//     companies:CompanyData[];
// }
// const {register, handleSubmit, errors} = useForm<CompanyData>();
//  //for sending the browser to specific location 
//  const history = useHistory();
 
//  async function send(customer:CompanyData){
//     try{
//         //lecturer is in json mode, ready to send.....      
//         const response = await axios.get("http://localhost:8080/coupons/getCouponsByCompany"+this.props.companyId);
//         console.log(response);
//         notify.success("");
//     } catch {
//         notify.error("")
//     }
// }
//        const { register, handleSubmit, errors } () = this.props;

// class GetCompanyCoupons extends Component<GetCompanyCouponsProps, CompanyState> {
//     public constructor(props: GetCompanyCouponsProps) {
//         super(props);
//         this.state = {            
//             companies: store.getState().adminState.companies
//         };
//  }

 

//     public render(): JSX.Element {
 

 
//     return (
//       <form onSubmit={handleSubmit(this.onSubmit)}>
//         <input name="companyId" defaultValue="Company id" ref={register} />
//         <input
//           name="exampleRequired"
//           ref={register({ required: true, maxLength: 10 })}
//         />
//         {errors.exampleRequired && <p>This field is required</p>}
//         <input type="submit" />
//       </form>
//         );
//     }
    
    

//     public async componentDidMount(){
//         const result = await axios.get("http://localhost:8080/coupons/getCompanyCoupons/"+this.props.companyId);
//         const companyResult = result.data;
//         //console.log(carData);
//         this.setState({
//             companies:companyResult
//         })
//     }

// export default GetCompanyCoupons;

function GetCompanyCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponData[]>([]);

    const {register, handleSubmit, errors} = useForm<CompanyData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(company:CompanyData){
        try{
            //lecturer is in json mode, ready to send.....      
    const { data : coupons } : { data : CouponData[] } = await AxiosRequest.get(`/coupons/getCouponsByCompany/`+company.id);
    setCoupons(coupons);
            notify.success("");
        } catch {
            notify.error("* There's no company with that id.")
        }
    }
   
       return (
           <div className="CompanyAllCouponsPage Box">
               {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
			<h2>Get company coupons:</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Company's id" ref={register({
                    required: {value:true , message:"Missing id."},
                })}/>
                <br/><br/>
                <button>Get</button>
            </form>
        </div>
       );
   }
   
   export default GetCompanyCoupons;