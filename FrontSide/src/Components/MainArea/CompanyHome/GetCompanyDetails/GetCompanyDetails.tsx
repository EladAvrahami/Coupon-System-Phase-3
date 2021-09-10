import { Component } from "react";
import "./GetCompanyDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyData from "../../../Models/CompanyData";
import AxiosRequest from "../../../../axios/AxiosRequest";

interface GetCompanyDetailsState {
    myCompany:CompanyData;
}

class GetCompanyDetails extends Component<{}, GetCompanyDetailsState> {

    public constructor(props:{} ) {
        super(props);
        this.state = {            
            myCompany : new CompanyData  
        };
        
    }

    public render(): JSX.Element {
        return (
            <div className="GetCompanyDetails">               
                <div className="Box GetCompanyDetails">   
                                <h3>Company details:</h3>                                
                   COMPANY NAME: {this.state.myCompany.name} <br/>
                   ID: {this.state.myCompany.id} <br/>
                   EMAIL: {this.state.myCompany.email} <br/>
                </div>
                
            </div>
        );
    }

    public async componentDidMount(){
        //const result = await axios.get("http://localhost:8080/coupons/getOneCompanyLoggedIn"); //OLD
        const result = await AxiosRequest.get("/coupons/getCompanyLoggedIn");
        const CompanyData = result.data;
        console.log(CompanyData);
        this.setState({
            myCompany : CompanyData
        })
    }
}

export default GetCompanyDetails;