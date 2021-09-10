import { Component } from "react";
import CustomerData from "../Models/CustomerData";



interface SingleCustomerProps {
	myCustomer:CustomerData
}

class SingleCustomer extends Component<SingleCustomerProps> {

    public render(): JSX.Element {
        return (
            <div className="SingleCustomer Box">
				{this.props.myCustomer.id} <br/>
                {this.props.myCustomer.firstName} <br/>
                {this.props.myCustomer.lastName} <br/>
                {this.props.myCustomer.email}<br/>
                {this.props.myCustomer.password}<br/>
                {/*{this.props.myCustomer.coupons}<br/>*/}
            </div>
        );
    }
}
export default SingleCustomer;