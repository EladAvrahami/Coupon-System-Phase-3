import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./GetOneCustomer.css";

function GetOneCustomer(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.get<CustomerData>("http://localhost:8080/coupons/GetOneCustomer");
            console.log(response);
            notify.success("There is a customer with that id.");
        } catch {
            notify.error("There is NO customer with that id.")
        }
    }

    
    return (
        <div className="GetOneCustomer Box">
			<h2>Get one customer</h2>
            <form onSubmit={handleSubmit(send)}>
            <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"Missing id"},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <button>Get</button>
            </form>
        </div>
    );
}

export default GetOneCustomer;