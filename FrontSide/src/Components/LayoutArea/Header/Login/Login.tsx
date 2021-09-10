import { Avatar, Button, ButtonGroup, Checkbox, Grid, InputLabel, NativeSelect, Paper, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import notify from "../../../Services/Notify";
import "./Login.css";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { LoginAction } from "../../../../Redux/AuthState"
import store from "../../../../Redux/Store"
import clientType from "./Enums/clientType";
import UserModel from "../../../Models/UserModel";
import jwt_decode from "jwt-decode"
import {useDispatch, useSelector} from "react-redux";
import {authorize} from "../../../../reduxToolkit/LoginSlice";

const paperStyle = { padding: '30px 20px', width: '30%', margin: '5% auto' }
//const AvatarStyle={align:'center'}
function Login(): JSX.Element {
 const { register, handleSubmit, errors } = useForm<CredentialsModel>();
    //for sending the browser to specific location 
    const history = useHistory();

    const dispatch = useDispatch();

    async function send(credential: CredentialsModel) {
        switch (credential.clientType){

            case clientType.ADMINISTRATOR:
                try{
                    const response = await axios.post<string>("http://localhost:8080/coupons/adminLogin",credential);
                    console.log(response.data);
                    const decoded =JSON.parse(JSON.stringify( jwt_decode(response.data)));
                    const userInfo = {email:decoded.sub,password:"",clientType:decoded.userType, token:response.data,userId:decoded.id,name:decoded.name}
                    store.dispatch(LoginAction(userInfo));
                    console.log("our user in redux")
                    console.log(store.getState().authState.user);
                    notify.success("* Admin login successful!");
                    history.push("/adminPage");

                    dispatch(authorize({
                        emailValue: JSON.parse(localStorage.getItem("user")).email,
                        roleValue: JSON.parse(localStorage.getItem("user")).clientType
                    }))

                }catch(err){
                    notify.error("* Login failed. You either typed wrong details, or this account does not exist.");
                    console.log(err);
                }     
        break;

        case clientType.COMPANY:
        try {
            const response = await axios.post<string>("http://localhost:8080/coupons/companyLogin",credential);
            console.log(response.data);
            const decoded =JSON.parse(JSON.stringify( jwt_decode(response.data)));
            const userInfo = {email:decoded.sub,password:"",clientType:decoded.userType, token:response.data,userId:decoded.id,name:decoded.name}
            store.dispatch(LoginAction(userInfo));
            console.log(userInfo);
            notify.success("* Company login successful!");
            history.push("/companyPage");

            dispatch(authorize({
                emailValue: JSON.parse(localStorage.getItem("user")).email,
                roleValue: JSON.parse(localStorage.getItem("user")).clientType
            }))

        } catch {
            notify.error("Login failed. You either typed wrong details, or this account does not exist");
        }
        break;

        case clientType.CUSTOMER:
        try {
            const response = await axios.post<string>("http://localhost:8080/coupons/customerLogin",credential);
            console.log(response);
            const decoded =JSON.parse(JSON.stringify( jwt_decode(response.data)));
            const userInfo = {email:decoded.sub,password:"",clientType:decoded.userType, token:response.data,userId:decoded.id,name:decoded.name}
            store.dispatch(LoginAction(userInfo));
            notify.success("* Customer login successful!");
            history.push("/customerPage");

            dispatch(authorize({
                emailValue: JSON.parse(localStorage.getItem("user")).email,
                roleValue: JSON.parse(localStorage.getItem("user")).clientType
            }))

        } catch {
            notify.error("* Login failed. You either typed wrong details, or this account does not exist");
        }
        break;

        default:
            history.push("/HomePage");
            break;
        
    }
    }
    return (
        <div className="Login Box">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit(send)}>
            <input type="email" name="email" placeholder="Email" ref={register({
                // required: {value:true , message:"Missing email"},
                // minLength: {value:10 , message:"Minimum length is 10 chars"}
            })}/>
            <span><br/>{errors.email?.message}</span>
            <br/><br/>
            <input type="password" name="password" placeholder="Password" ref={register(
                // {required:true, minLength:3, pattern: /^[A-Z].+$/}
            )}/>
            {/* {errors.password?.type==="minLength" && <span><br/>Must have 3 letters</span>}
            {errors.password?.type==="required" && <span><br/>You must enter a name</span>}
            {errors.password?.type==="pattern" && <span><br/>You must start with capital letter</span>} */}
            <br/><br/>
            <input type="clientType" name="clientType" placeholder="ClientType" ref={register({
            // required:{value: true, message: "Missing password"},
            // minLength: {value:8, message: "Minimum length is 8 chars"}
            })}/>
            {/* <span><br/>{errors.password?.message}</span> */}
            <br/><br/>
            <button>LOGIN</button>
        </form>
    </div>
        // <Grid>
        //     <Paper elevation={20} style={paperStyle}>
        //         <Grid>
        //             <Player
        //                 autoplay
        //                 loop
        //                 src="https://assets5.lottiefiles.com/packages/lf20_1simvuvy.json"
        //                 style={{ height: '40%', width: '40%', margin: '-12% auto' }}
        //             >
        //                 <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        //             </Player>
        //            {/* <Avatar style={{ margin: '1% auto', backgroundColor: '#0e7ebe' }}></Avatar> */}
        //               {/*  <LockOpenOutlinedIcon />*/}
        //             {/*  </Avatar> */}
        //             <h1 style={{ margin: 0, fontSize: 40 }}>Login</h1>
        //             <Typography>  Please fill your details in order to get in  (: </Typography>
        //         </Grid>
        //         <form onSubmit={handleSubmit(send)}>

        //             <TextField size="medium" fullWidth label="Email" placeholder="Please enter your email" type="email" name="email" required />
        //             {register({
        //                 required: { value: true, message: "Missing email" },
        //                 minLength: { value: 10, message: "Minimum length is 10 chars" }
        //             })}
        //             <br />
        //             <br />
        //             <TextField size="medium" fullWidth label="Password" placeholder="Please enter your password" type="text" name="password" required />
        //             <br />
        //             <br />
        //             <InputLabel htmlFor="select"> choose client type</InputLabel>
        //             <NativeSelect fullWidth id="select" style={{ fontSize: 20, backgroundColor: '0e7ebe' }}>
        //                 <option value="customer">Customer</option>
        //                 <option value="company">Company</option>
        //                 <option value="admin">Admin</option>
        //             </NativeSelect>
        //             <br />
        //             <br />
        //             <ButtonGroup variant="contained" fullWidth>
        //                 <Button color="primary" type="submit">Send</Button>
        //                 <Button color="default" type="reset">Cancel</Button>
        //             </ButtonGroup>
        //         </form>

        //     </Paper>




        // </Grid>

    );
                
                }               

export default Login;