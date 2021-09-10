import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.post<CustomerData>("http://localhost:8080/coupons/addCustomer",customer);
            console.log(response);
            notify.success("The customer was successfully added.");
        } catch {
            notify.error("The customer was NOT added.")
        }
    }
    
    return (
        <div className="AddCustomer Box">
			<h2>Add Customer</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="email" placeholder="Customer's email" ref={register({
                    required: {value:true , message:"Missing email"},
                    minLength: {value:10 , message:"Minimum length is 10 chars"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="text" name="firstName" placeholder="Customer's first name" ref={register({
                    required: {value:true , message:"Missing email"},
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
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddCustomer;