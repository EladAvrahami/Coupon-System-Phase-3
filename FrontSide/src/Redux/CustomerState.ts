import CouponData from "../Components/Models/CouponData";
import CustomerData from "../Components/Models/CustomerData";


export class CustomerState{
    public customer:CustomerData;
    public coupons:CouponData[] = [];
}

export enum CustomerActionType{
    GetCustomerCoupons="GetCustomerCoupons",
    PurchaseCoupon = "PurchaseCoupon",
    GetCustomerCouponsByCategory = "GetCustomerCouponsByCategory",
    GetCustomerCouponsByMaxPrice = "GetCustomerCouponsByMaxPrice",
    GetCustomerDetails = "GetCustomerDetails",
    CouponPurchase = "CouponPurchase"
}
//GetCustomerDetails
export interface CustomerAction{
    type:CustomerActionType;
    payload?: any;
}

export function GetCustomerCoupons(coupons:CouponData):CustomerAction{
    return {type: CustomerActionType.GetCustomerCoupons, payload:coupons}
}

export function CouponPurchase(id: number):CustomerAction{
    return {type: CustomerActionType.CouponPurchase, payload:id}
}

export function GetCustomerCouponsByCategory(coupons: CouponData):CustomerAction{
    return {type: CustomerActionType.GetCustomerCouponsByCategory, payload:coupons}
}

export function GetCustomerCouponsByMaxPrice(coupons: CouponData):CustomerAction{
    return {type: CustomerActionType.GetCustomerCouponsByMaxPrice, payload:coupons}
}

export function GetCustomerDetails():CustomerAction{
    return {type: CustomerActionType.GetCustomerDetails, }
}


//reducer
export function customerReducer(currentState: CustomerState = new CustomerState, action:CustomerAction):CustomerState{
    const newState = {...currentState};

    switch(action.type){
        case CustomerActionType.GetCustomerCoupons:
            newState.customer.coupons = action.payload;
            break;

        case CustomerActionType.CouponPurchase:
            newState.customer.coupons.push(action.payload);
            break;

        case CustomerActionType.GetCustomerCouponsByCategory:
            newState.customer.coupons = action.payload;
          break;

        case CustomerActionType.GetCustomerCouponsByMaxPrice:
            newState.customer.coupons = action.payload;
            break;

        case CustomerActionType.GetCustomerDetails:
               newState.customer = action.payload;
               break;

    }
    return newState;
}