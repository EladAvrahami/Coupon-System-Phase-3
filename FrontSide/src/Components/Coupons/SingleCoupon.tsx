import { Component } from "react";
import CouponData from "../Models/CouponData";


interface SingleCouponProps {
	myCoupon:CouponData;
}

class SingleCoupon extends Component<SingleCouponProps> {

    public render(): JSX.Element {
        return (

            <div className="SingleCompany Box">		
              {this.props.myCoupon.image} <br/>
            <pre>
                COUPON ID:        {this.props.myCoupon.id} <br/>
				COMPANY ID:      {this.props.myCoupon.companyID} <br/>
				CATEGORY:          {this.props.myCoupon.category} <br/>
				TITLE:                   {this.props.myCoupon.title} <br/>
                DESCRIPTION:     {this.props.myCoupon.description} <br/>
                START DATE:        {this.props.myCoupon.startDate} <br/>
				END DATE:           {this.props.myCoupon.endDate} <br/>
				AMOUNT:            {this.props.myCoupon.amount} <br/>
				PRICE:                  {this.props.myCoupon.price} <br/>
                IMAGE:                  {this.props.myCoupon.image} <br/>

                </pre>
            </div>
        );
    }
}
export default SingleCoupon;