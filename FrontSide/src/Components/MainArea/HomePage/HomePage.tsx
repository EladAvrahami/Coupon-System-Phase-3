
import { Link } from "react-router-dom";
import Logo from "../../LayoutArea/Logo/Logo";
import Routing from "../../Routing/Routing";
import "./HomePage.css"

//import Discount from "../Discount/Discount"
//import Special from "../Specials/Special"

function HomePage():JSX.Element{
    return(
        <div className="HomePage">
            <h1>Welcome to our coupon website!</h1>
            <h2>Your best place for purchasing coupons!</h2>  
            <Link  to="/CouponStore">
                    <button className="btn btn-primary btn-s mx-5 ">Search & Buy! </button>
                    </Link>  
        </div>
    );
}

export default HomePage;
