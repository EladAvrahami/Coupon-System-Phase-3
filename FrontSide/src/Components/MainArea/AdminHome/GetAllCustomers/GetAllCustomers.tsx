
import axios from "axios";
import { Component } from "react";
import { GetAllCustomersAction } from "../../../../Redux/adminState";
import SingleCustomer from "../../../Customers/SingleCustomer"
import store from '../../../../Redux/Store';
import CustomerData from "../../../Models/CustomerData";

interface CustomerState {
    customers : CustomerData[];
}

class GetAllCustomers extends Component<{}, CustomerState> {
    public constructor(props: {}) {
        super(props);
       this.state = {
          customers: store.getState().adminState.customers
    }
}
    public render(): JSX.Element {
        return (
            <div className="GetAllCustomers">
                <br/>
                <div>
                    {this.state.customers.map(item => <SingleCustomer key={item.id} myCustomer={item}/>)}
                </div>
            </div>
        );
    }
    public async componentDidMount(){
        
            const response = await axios.get("http://localhost:8080/coupons/getallcustomers")
            const myResponse = response.data;
          
            store.dispatch(GetAllCustomersAction(myResponse));

            this.setState({
                customers: myResponse
            });
    }
}

export default GetAllCustomers;