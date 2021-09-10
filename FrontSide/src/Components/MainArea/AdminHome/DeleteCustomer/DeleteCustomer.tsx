import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.delete<CustomerData>("http://localhost:8080/coupons/deleteCustomer/"+customer.id);
            console.log(response);
            notify.success("The customer was successfully deleted.");
        } catch {
            notify.error("The customer was NOT deleted.")
        }
    }

    
    return (
        <div className="DeleteCustomer Box">
			<h2>Delete Customer</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"No number was typed"}
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <button>Delete</button>
            </form>
        </div>
    );
}

export default DeleteCustomer;