import { NavLink } from "react-router-dom";
import "./Aside.css"
import store from "../../../Redux/Store";
import SingleCompanyTable from "../../Tables/SingleCompanyTable/SingleCompanyTable";


function AsideMenu():JSX.Element{
    console.log("Zeevik the fox")
   
    console.log(store.getState().authState.user.clientType);
    switch (store.getState().authState.user.clientType) {
      case "admin":
        return(
            <div className="AdminMenu container">
               <NavLink exact to="/GetCustomerCoupons/" >Get customer coupons</NavLink>
                <NavLink exact to="/GetCompanyCoupons/" >Get company coupons</NavLink>
                <NavLink exact to="/CustomersTable" >Manage customers</NavLink>
                <NavLink exact to="/CompaniesTable" >Manage companies</NavLink>
            </div> 
        );
          case "company":
            return (

              
              <div className="CompanyMenu container">
                <NavLink exact to="/GetCompanyCouponsByMaxPrice/" >Coupons by max-price</NavLink>
                <NavLink exact to="/GetCompanyDetails">Company details</NavLink>
                <NavLink exact to="/SingleCompanyTable">Coupons management</NavLink>
                {/* <SingleCompanyTable/> */}
              </div>
            );
            case "customer":
            return (
              <div className="CustomerMenu container">
              <NavLink exact to="/CouponPurchase" >Purchase coupons</NavLink>
                <NavLink exact to="/MyPurchasedCouponsByMaxPrice/" >My coupons by max-price</NavLink>
                <NavLink exact to="/GetCustomerDetails" >My details</NavLink>
                <NavLink exact to="/SingleCustomerTable/" >My coupons</NavLink>
                {/* <SingleCustomerTable/> */}
              </div>
            );
      default:
  
    return(

<div className="GustMenu container">
              <NavLink exact to="/CouponPurchase" >קצת עלינו</NavLink>
                <NavLink exact to="/MyPurchasedCouponsByMaxPrice/" >הקופונים שלנו </NavLink>
                <NavLink exact to="/GetCustomerDetails" >וכו</NavLink>
                <NavLink exact to="/SingleCustomerTable/" >וכו</NavLink>
                {/* <SingleCustomerTable/> */}
              </div>

           
            //     {/*תפריט של אדמין  */}
            //      {/* <NavLink exact to="/AddCompany" >Add company</NavLink>
            //     <NavLink exact to="/UpdateCompany" >Update company</NavLink>
            //     <NavLink exact to="/DeleteCompany" >Delete company</NavLink>
            //     <NavLink exact to="/GetOneCompany/" >Get company by id</NavLink>
            //     <NavLink exact to="/GetAllCompanies" >Get all companies</NavLink>
            //     <NavLink exact to="/AddCustomer" >Add customer</NavLink>
            //     <NavLink exact to="/UpdateCustomer">Update customer</NavLink>
            //     <NavLink exact to="/DeleteCustomer">Delete customer</NavLink>
            //     <NavLink exact to="/GetOneCustomer/:id">My details</NavLink>
            //     <NavLink exact to="/GetAllCustomers">Get all customers</NavLink> * */}
                

                 
            //      {/*תפריט של חברה */}
            //    {/*<NavLink exact to="/AddCoupon" >Add coupon</NavLink>
            //     <NavLink exact to="/UpdateCoupon" >Update coupon</NavLink>
            //     <NavLink exact to="/DeleteCoupon" >Delete Coupon</NavLink>
            //     <NavLink exact to="/GetCompanyCoupons/" >Get All Coupons</NavLink>
            //     <NavLink exact to="/GetCompanyCouponsByCategory" >All Coupons By Category</NavLink>
            //     <NavLink exact to="/GetCompanyCouponsByMaxPrice/" >All Coupons By price</NavLink>
            //     <NavLink exact to="/GetCompanyDetails">Company details</NavLink>*/}
                 
                 
                 
            //      {/*תפריט של הלקוח */}
            //     {/* <NavLink exact to="/CouponPurchase" >Purchase coupons</NavLink>
            //     <NavLink exact to="/MyPurchasedCoupons/" >My coupons</NavLink>
            //     <NavLink exact to="/MyPurchasedCouponsByCategory" >my coupons by category</NavLink>
            //     <NavLink exact to="/MyPurchasedCouponsByMaxPrice/" >my coupons by price</NavLink>
            //     <NavLink exact to="/MyDetails" >my details</NavLink>
              

                
            //     {/* 
            //         <a href="/car">חיפוש רכב</a>
            //         <a href="/bike">חיפוש דו גלגלי</a>
            //         <a href="/handicap">בדיקת רכב נכה</a>
            //         <a href="/off">האם הורד מהכביש</a>
            //         <a href="/recall">האם עבר ריקול</a>
            //         <a href="/stolen">בדיקת רכב גנוב</a>
               
            // </nav>
            //  */}
     
    );
}
}

export default AsideMenu;