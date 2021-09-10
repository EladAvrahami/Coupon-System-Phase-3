import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyData from "../../../Models/CompanyData";
import notify from "../../../Services/Notify";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CompanyData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(company:CompanyData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.delete<CompanyData>("http://localhost:8080/coupons/deleteCompany"+company.id);
            console.log(response);
            notify.success("The company was successfully deleted.");
        } catch {
            notify.error("The company was NOT deleted.")
        }
    }

    
    return (
        <div className="DeleteCompany Box">
			<h2>Delete Company</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="companyId" placeholder="Company's id" ref={register({
                    required: {value:true , message:"No number was typed"},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <button>Delete</button>
            </form>

            
        </div>
    );
}

export default DeleteCompany;