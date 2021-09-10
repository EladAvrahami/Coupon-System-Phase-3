import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.post<CustomerData>("http://localhost:8080/coupons/updateCustomer",customer);
            console.log(response);
            notify.success("The customer was successfully updated.");
        } catch {
            notify.error("The customer was NOT updated.")
        }
    }

    
    return (
        <div className="UpdateCustomer Box">
			<h2>Update Customer</h2>
            <form onSubmit={handleSubmit(send)}>
            <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"Missing id"},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <input type="text" name="email" placeholder="Customer's email" ref={register({
                    required: {value:true , message:"Missing email"},
                    minLength: {value:10 , message:"Minimum length is 10 chars"}
                })}/>
                <br/><br/>
                <input type="text" name="firstName" placeholder="Customer's name" ref={register({
                    required: {value:true , message:"Missing first name"},
                    minLength: {value:3 , message:"Minimum length is 3 chars"}
                })}/>
                <span><br/>{errors.firstName?.message}</span>
                <br/><br/>
                <input type="text" name="lastName" placeholder="Customer's last name" ref={register({
                    required: {value:true , message:"Missing last name"},
                    minLength: {value:3 , message:"Minimum length is 3 chars"}
                })}/>
                <span><br/>{errors.lastName?.message}</span>
                <br/><br/>
                <input type="text" name="password" placeholder="Customer's password" ref={register({
                required:{value: true, message: "Missing password"},
                minLength: {value:8, message: "Minimum length is 8 chars"}
                })}/>
                <span><br/>{errors.password?.message}</span>
                <br/><br/>
                <button>Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;