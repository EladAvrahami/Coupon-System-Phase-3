import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyData from "../../../Models/CompanyData";
import notify from "../../../Services/Notify";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CompanyData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(company:CompanyData){
        try{
            //lecturer is in json mode, ready to send.....   
            console.log("trying to update");
            console.log(company);   
            const response = await axios.post<CompanyData>("http://localhost:8080/coupons/updateCompany",company);          
            console.log(response);
            notify.success("The company was successfully updated.");
        } catch {
            notify.error("The company was NOT updated.")
        }
    }

    return (
        <div className="UpdateCompany Box">
			<h2>Update Company</h2>
            <form onSubmit={handleSubmit(send)}>
            <input type="number" name="companyId" placeholder="Company's id" ref={register({
                    required: {value:true , message:"Missing id"},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <input type="email" name="email" placeholder="Company's email" ref={register({
                    required: {value:true , message:"Missing email"},
                    minLength: {value:10 , message:"Minimum length is 10 chars"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="text" name="name" placeholder="Company's name" ref={register({
                required:{value: true, message: "Missing name"},
                minLength: {value:3, message: "Minimum length is 3 chars"}
                })}/>
                <span><br/>{errors.name?.message}</span>
                <br/><br/>
                <input type="text" name="password" placeholder="Company's password" ref={register({
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

export default UpdateCompany;