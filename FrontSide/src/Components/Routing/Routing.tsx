import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../LayoutArea/Header/Login/Login";
import AddCompany from "../MainArea/AdminHome/AddCompany/AddCompany";
import AddCustomer from "../MainArea/AdminHome/AddCustomer/AddCustomer";
import DeleteCompany from "../MainArea/AdminHome/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../MainArea/AdminHome/DeleteCustomer/DeleteCustomer";
import GetAllCustomers from "../MainArea/AdminHome/GetAllCompanies/GetAllCompanies";
import GetAllCompanies from "../MainArea/AdminHome/GetAllCompanies/GetAllCompanies";
import GetOneCompany from "../MainArea/AdminHome/GetOneCompany/GetOneCompany";
import GetOneCustomer from "../MainArea/AdminHome/GetOneCustomer/GetOneCustomer";
import UpdateCompany from "../MainArea/AdminHome/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../MainArea/AdminHome/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../MainArea/CompanyHome/AddCoupon/AddCoupon";
import DeleteCoupon from "../MainArea/CompanyHome/DeleteCoupon/DeleteCoupon";
import GetCompanyCouponsByCategory from "../MainArea/CompanyHome/GetCompanyCouponsByCategory/GetCompanyCouponsByCategory";
import GetCompanyCouponsByMaxPrice from "../MainArea/CompanyHome/GetCompanyCouponsByMaxPrice/GetCompanyCouponsByMaxPrice";
import GetCompanyDetails from "../MainArea/CompanyHome/GetCompanyDetails/GetCompanyDetails";
import UpdateCoupon from "../MainArea/CompanyHome/UpdateCoupon/UpdateCoupon";
import Page404 from "../Routing/Page404/Page404";
import GetCompanyCoupons from "../MainArea/AdminHome/GetCompanyCoupons/GetCompanyCoupons";
import "./Routing.css";
import store from "../../Redux/Store";
import CustomersTable from "../Tables/CustomersTable/CustomersTable";
import CompaniesTable from "../Tables/CompaniesTable/CompaniesTable";
import MyPurchasedCoupons from "../MainArea/CustomerHome/MyPurchasedCoupons/MyPurchasedCoupons";
import SingleCompanyTable from "../Tables/SingleCompanyTable/SingleCompanyTable";
import SingleCustomerTable from "../Tables/SingleCustomerTable/SingleCustomerTable";
import GetCustomerCoupons from "../MainArea/AdminHome/GetCustomerCoupons/GetCustomerCoupons";
import GetCustomerDetails from "../MainArea/CustomerHome/GetCustomerDetails/GetCustomerDetails";
import companyPage from "../MainArea/CompanyHome/companyPage/companyPage";
import customerPage from "../MainArea/CustomerHome/customerPage/customerPage";
import adminPage from "../MainArea/AdminHome/adminPage/adminPage";
import HomePage from "../MainArea/HomePage/HomePage";
import Logout from "../LayoutArea/Header/Logout/Logout";
import CouponPurchase from "../MainArea/CustomerHome/PurchaseCoupon/CouponPurchase";
import CouponStore from "../../CouponsCarts/CouponStore/couponStore";
import GetPurchasedCouponsByMaxPrice from "../MainArea/CustomerHome/GetPurchasedCouponsByMaxPrice/GetPurchasedCouponsByMaxPrice";


function Routing(): JSX.Element {

    return (
        <div className="Routing">          
                <Route path="/Login" component={Login} exact />
                <Route path="/AddCompany" component={AddCompany} exact />
                <Route path="/UpdateCompany" component={UpdateCompany} exact />
                <Route path="/DeleteCompany" component={DeleteCompany} exact />
                <Route path="/GetOneCompany/" component={GetOneCompany} exact />
                <Route path="/GetAllCompanies" component={GetAllCompanies} exact />
                <Route path="/AddCustomer" component={AddCustomer} exact />
                <Route path="/UpdateCustomer" component={UpdateCustomer} exact />
                <Route path="/DeleteCustomer" component={DeleteCustomer} exact />   
                <Route path="/GetOneCustomer/:id" component={GetOneCustomer} exact/>
                <Route path="/GetAllCustomers" component={GetAllCustomers} exact/>
                <Route path="/AddCoupon" component={AddCoupon} exact />
                <Route path="/UpdateCoupon" component={UpdateCoupon} exact />
                <Route path="/DeleteCoupon" component={DeleteCoupon} exact />
                <Route path="/GetCompanyCoupons/" component={GetCompanyCoupons} exact />
                <Route path="/GetCompanyCouponsByCategory" component={GetCompanyCouponsByCategory} exact />
                <Route path="/GetCompanyCouponsByMaxPrice/" component={GetCompanyCouponsByMaxPrice} exact />
                <Route path="/GetCompanyDetails" component={GetCompanyDetails} exact />
               <Route path="/CouponPurchase" component={CouponPurchase} exact />
               <Route path="/CompaniesTable" component={CompaniesTable} exact />
               <Route path="/CustomersTable" component={CustomersTable} exact />
               <Route path="/MyPurchasedCoupons" component={MyPurchasedCoupons} exact />
               <Route path="/SingleCustomerTable" component={SingleCustomerTable} exact />
               <Route path="/SingleCompanyTable" component={SingleCompanyTable} exact />
               <Route path="/GetCustomerCoupons" component={GetCustomerCoupons} exact/>
               <Route path="/GetCustomerDetails" component={GetCustomerDetails} exact/>
               <Route path="/CompanyPage" component={companyPage} exact/>
               <Route path="/CustomerPage" component={customerPage} exact/>
               <Route path="/AdminPage" component={adminPage} exact/>
               <Route path="/Logout" component={Logout} exact/>
               <Route path="/CouponStore" component={CouponStore} exact/>
               <Route path="/GetPurchasedCouponsByMaxPrice" component = {GetPurchasedCouponsByMaxPrice} exact/>
               <Route path="/" component={HomePage} exact/>
               {/* <Route path ="/" component={HomePage} exact /> */}
               {/* <Redirect from="/" to="/" exact /> */}
            {/* <Route component={Page404}/>  MUST BE LAST !!!!!!! */}
        </div>
    );
}

export default Routing;