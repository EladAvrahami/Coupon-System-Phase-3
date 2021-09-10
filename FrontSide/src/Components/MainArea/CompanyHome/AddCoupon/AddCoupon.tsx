import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(coupon:CouponData){
        try{   
            const response = await axios.post<CouponData>("http://localhost:8080/couponsdb/addCoupon",coupon);
            console.log(response);
            notify.success("The coupon was successfully added.");
        } catch {
            notify.error("The coupon was NOT added.")
        }
    }

    
    return (
        <div className="AddCoupon Box">
			<h2>Add coupon</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="companyId" placeholder="Company id" ref={register({
                    required: {value:true , message:"Missing company id."},
                })}/>
                <span><br/>{errors.companyID?.message}</span>
                <br/><br/>
                <input type="number" name="category" placeholder="Category id" ref={register({
                    required: {value:true , message:"Missing category id."},
                })}/>
                <span><br/>{errors.category.message}</span>
                <br/><br/>
                <input type="text" name="title" placeholder="Title" ref={register(
                    {required:true, minLength:3, pattern: /^[A-Z].+$/}
                )}/>
                <span><br/>{errors.title?.message}</span>
                <br/><br/>
                <input type="text" name="description" placeholder="Description" ref={register(
                    {required:true, minLength:8, pattern: /^[A-Z].+$/}
                )}/>
                <span><br/>{errors.description?.message}</span>
                <br/><br/>
                <input type="text" name="start date" placeholder="Start date" ref={register(
                    {required:true}
                )}/>
                <span><br/>{errors.startDate?.message}</span>
                <br/><br/>
                <input type="text" name="end date" placeholder="End date" ref={register(
                    {required:true}
                )}/>
                <span><br/>{errors.endDate?.message}</span>
                <br/><br/>
                <input type="number" name="amount" placeholder="Amount" ref={register({
                    required: {value:true , message:"Missing amount."},
                })}/>
                <span><br/>{errors.amount?.message}</span>
                <br/><br/>
                <input type="text" name="price" placeholder="Price" ref={register({
                required:{value: true, message: "Missing price."},
                })}/>
                <span><br/>{errors.image?.message}</span>
                <br/><br/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddCoupon;