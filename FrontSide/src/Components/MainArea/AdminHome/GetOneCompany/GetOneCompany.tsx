import { Component } from "react";
import "./GetOneCompany.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyData from "../../../Models/CompanyData";

interface CompanyProps {
    id:number;  
}

interface CompanyState {
    company:CompanyData
}

class GetCompanyCoupons extends Component<CompanyProps, CompanyState> {

    public constructor(props: CompanyProps) {
        super(props);
        this.state = {            
            company : new CompanyData  
        };
        
    }

    public render(): JSX.Element {
        return (
            <div className="GetCompanyCoupons">
                <br/>
                Company Details:
                <hr/>
               
                <div className="Box ">                                   
                    {this.state.company.id} <br/>
                    {this.state.company.name} <br/>
                    {this.state.company.email} <br/>
                    {this.state.company.password}<br/>
                    {this.state.company.coupons}<br/>
            </div>
            </div>
        );
    }

    public async componentDidMount(){
        const result = await axios.get("http://localhost:8080/coupons/getCouponsByCompany/"+this.props.id);
        const companyResult = result.data;
        //console.log(carData);
        this.setState({
            company : companyResult
        })
    }
}

export default GetCompanyCoupons;