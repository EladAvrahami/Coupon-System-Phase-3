import CouponData from "./CouponData";

class CustomerData{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    coupons?:CouponData[];

}
export default CustomerData;