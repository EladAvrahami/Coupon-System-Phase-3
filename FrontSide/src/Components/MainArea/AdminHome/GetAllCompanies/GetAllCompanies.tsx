import axios from "axios";
import { Component } from "react";
import { GetAllCompaniesAction } from "../../../../Redux/adminState";
import store from "../../../../Redux/Store";
import SingleCompany from "../../../Companies/SingleCompany";
import CompanyData from "../../../Models/CompanyData";

interface CompanyState {
    companies : CompanyData[];
}

class GetAllCompanies extends Component<{}, CompanyState> {
    public constructor(props: {}) {
        super(props);
       this.state = {
          companies: store.getState().adminState.companies
    }
}
    public render(): JSX.Element {
        return (
            <div className="GetAllCompanies">
                <br/>
                <div>
                    {this.state.companies.map(item => <SingleCompany key={item.id} myCompany={item}/>)}
                </div>
            </div>
        );
    }
    public async componentDidMount(){
        
            const response = await axios.get("http://localhost:8080/coupons/getAllCompanies")
            const myResponse = response.data;
          
            store.dispatch(GetAllCompaniesAction(myResponse));

            this.setState({
                companies: myResponse
            });
    }
}

export default GetAllCompanies;