import CouponData from "../Components/Models/CouponData";


export class CouponState{
    public coupons:CouponData[] = [];
}

export enum CouponActionType{
    CouponDownloaded="CouponDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDelete = "CouponDelete"
}

export interface CouponAction{
    type:CouponActionType;
    payload?: any;
}

export function couponDownloadedAction(coupons: CouponData[]):CouponAction{
    return {type: CouponActionType.CouponDownloaded, payload:coupons}
}

export function couponAddedAction(coupon: CouponData):CouponAction{
    return {type: CouponActionType.CouponAdded, payload:coupon}
}

export function couponUpdateAction(coupon: CouponData):CouponAction{
    return {type: CouponActionType.CouponUpdated, payload:coupon}
}

export function couponDeleteAction(id:number):CouponAction{
    return {type: CouponActionType.CouponDelete, payload:id}
}


//reducer
export function couponReducer(currentState: CouponState = new CouponState, action:CouponAction):CouponState{
    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.CouponDownloaded:
            newState.coupons = action.payload;
            break;

        case CouponActionType.CouponAdded:
            newState.coupons.push(action.payload);
            break;

        case CouponActionType.CouponUpdated:
            
        //     coupons: {
        //         newState.coupons,     
        //         newState.coupons.map(item => {
        //         if (item.couponId === action.payload.couponId) {
        //           return { ...item, status: 'in' };
        //         }
        //         return item;
        //     }
        //   )}
        //   break;
        case CouponActionType.CouponDelete:
             newState.coupons.filter(coupon=> coupon.id !== action.payload.couponId
                );
            break;
    }
    return newState;
}