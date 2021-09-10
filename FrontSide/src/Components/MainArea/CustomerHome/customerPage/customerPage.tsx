import React from "react";
import AsideMenu from "../../../LayoutArea/Aside/Aside";
import "./customerPage.css";
import SingleCustomerTable from "../../../Tables/SingleCustomerTable/SingleCustomerTable";
import { Link } from "react-router-dom";

function customerPage(): JSX.Element {
    return (
        <div className="customerPage">
			
            <main>
                <h1>Welcome customer!</h1>
                <Link  to="/CouponStore">
                    <button className="btn btn-primary btn-s mx-5 ">Search & Buy! </button>
                    </Link>  
            </main>
        </div>
    );
}

export default customerPage;
