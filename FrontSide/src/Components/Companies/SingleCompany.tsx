import { Component } from "react";
import CompanyData from "../Models/CompanyData";



interface SingleCompanyProps {
	myCompany:CompanyData
}

class SingleCompany extends Component<SingleCompanyProps> {

    public render(): JSX.Element {
        return (
            <div className="SingleCompany Box">
				COMPANY ID: {this.props.myCompany.id} <br/>
                NAME: {this.props.myCompany.name} <br/>
                EMAIL: {this.props.myCompany.email} <br/>
                PASSWORD: {this.props.myCompany.password}<br/>
                {/* {this.props.myCompany.coupons}<br/> */}
            </div>
        );
    }
}
export default SingleCompany;