import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CompanyData from "../../../Models/CompanyData";
import notify from "../../../Services/Notify";
import "./AddCompany.css";
import { Avatar, Button, ButtonGroup, Checkbox, Grid, InputLabel, NativeSelect, Paper, TextField, Typography } from "@material-ui/core";
import AxiosRequest from "../../../../axios/AxiosRequest";

const paperStyle = { padding: '30px 20px', width: '30%', margin: '5% auto' }
function AddCompany(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CompanyData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(company:CompanyData){
        try{
            //lecturer is in json mode, ready to send.....      
            // const response = await axios.post<CompanyData>("http://localhost:8080/coupons/createcompany",company);
            const response = await AxiosRequest.post<CompanyData>("/coupons/addCompany",company); //the link was wrong
            console.log(response);
            notify.success("The company was successfully added.");
        } catch {
            notify.error("The company was NOT added.")
        }
    }

    
    return (
/*
        <div className="AddNewCompany">
        <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid>
               
                <h2 style={{ margin: 0, fontSize: 40 }}>Add new Company </h2>
                <Typography>  please fill details in order add new Company (: </Typography>
            </Grid>
            <form onSubmit={handleSubmit(send)}>
                <br />
                {/*להשתמש באינפוט לייבל במקום טקסט פילד על מנת לעשות הודעות שגיאה מתאימות  *///}
                  //  {/* https://material-ui.com/api/input-label/#main-content*/}

               /* <TextField size="medium" fullWidth label="company's name" placeholder="please enter company's name" type="text" name="name" required inputRef={register(
                    {required:{value:false , message:"Missing name"}})}
                  
               />
                <TextField size="medium" fullWidth label="Email" placeholder="please enter company's email" type="email" name ="email" required  inputRef={register(
                    { minLength:3, pattern: /^[A-Z].+$/}
                )} />
                <TextField size="medium" fullWidth label="Password" placeholder="please enter company's password" type="text" name ="password" required />
                <br /><br />
                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary" type="submit">Send</Button>
                    <Button color="default" type="reset">Cancel</Button>
                </ButtonGroup>


            </form>

        </Paper>
    </Grid>
        
    </div>*/

       

        <div className="AddCompany Box">
			<h2>Add Company</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="email" placeholder="Company's email" ref={register({
                    required: {value:true , message:"Missing email"},
                    minLength: {value:10 , message:"Minimum length is 10 chars"}
                })}/>
                <span><br/>{errors.email?.message}</span>
                <br/><br/>
                <input type="text" name="name" placeholder="Company's name" ref={register(
                    {required:true, minLength:3, pattern: /^[A-Z].+$/}
                )}/>
                {errors.name?.type==="minLength" && <span><br/>Must have 3 letters</span>}
                {errors.name?.type==="required" && <span><br/>You must enter a name</span>}
                {errors.name?.type==="pattern" && <span><br/>You must start with capital letter</span>}
                <br/><br/>
                <input type="text" name="password" placeholder="Company's password" ref={register({
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

export default AddCompany;
