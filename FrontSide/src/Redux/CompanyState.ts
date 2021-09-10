
//handling Car AppState

import CompanyData from "../Components/Models/CompanyData";
import CouponData from "../Components/Models/CouponData";

//Car AppState - המידע ברמת האפליקציה הקשור לרכבים - אלו בעצם יהיו כל הרכבים במערכת
export class CompanyState{
    public coupon:CouponData ;
    public companies:CompanyData[]; //אנחנו נאתחל את האובייקט הפנימי כמערך של רכבים
    //מסוג קאר דאטה//זה המידע שמי שייגש למערכת יקבל את הקאר דאטה
}

//-----------------------------------------------------------------------------
//Car Action Types - אלו הפעולות שניתן לבצע על המידע ברמת האפליקציה
//זה האינם של הפעולות CRUD
export enum companiesActionType{
    AddCoupon = "AddCoupon",               //post -> create
    DeletedCoupon = "DeletedCoupon",      //del -> delete
    UpdateCoupon="UpdateCoupon",          //put -> update
    GetCompanyCoupons = "GetCompanyCoupons", //get  -> read 
    GetCouponsByCategory="GetCouponsByCategory",//get  -> read 
    GetCouponsByMaxPrice="GetCouponsByMaxPrice", //get  -> read  
    GetCompanyDetails="GetCompanyDetails"
}

//--------------------------------------------------------------------------------------
//Car Action - אובייקט המכיל את המידע עבור הפעולה שאנו מבצעים על המידע ברמת האפליקציה
export interface CompanyAction{//אומר לי מה סוג הפעולות שאנחנו רוצים להעביר אינטרפייס
    type: companiesActionType,
    payload?: any; //it can be anything 
}

//--------------------------------------------------------------------------------------------------------------------
//Car Action Creators - ייבאתי את קופון דאטה על מנת שיוסיף אליו נתוני קופון חדשים
export function AddCouponAction(coupon: CouponData[],company:CompanyData):CompanyAction{//מביאים לו מכוניות ואמרים שרוצים לעשות פעולה
    return {type:companiesActionType.AddCoupon, payload: coupon}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function DeletedCoupon(id: number):CompanyAction{
    return{type:companiesActionType.DeletedCoupon,payload:id}
}

export function CouponUpdateAction(coupon: CouponData[]):CompanyAction{//car הוא שם המשתנה יכול להיות גם משה //carData אומר לי מה הפונקציה תחזיר לי בסוף
    return {type: companiesActionType.UpdateCoupon, payload: coupon}
}

export function GetCompanyCoupons(coupons: CouponData[]):CompanyAction{
    return {type: companiesActionType.GetCompanyCoupons, payload: coupons}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function GetCouponsByCategory(categoryId:number):CompanyAction{
    return {type: companiesActionType.GetCouponsByCategory, payload: categoryId}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}
export function GetCouponsByMaxPrice(maxPrice:number):CompanyAction{
    return {type: companiesActionType.GetCouponsByMaxPrice, payload: maxPrice}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}
export function GetCompanyDetails():CompanyAction{
    return{type:companiesActionType.GetCompanyDetails,}
}


//------------------------------------------------------------------------------------------------
//Car Reducer - פונקציה המבצעת את הפעולה בפועל
                                // איתחול הפעולה פעםאחת בלבד //      tell where the action take from 
export function companyReducer(currentState: CompanyState = new CompanyState(), action:CompanyAction):CompanyState{//חתימה קבוע לא לשנות !!! פונקציה המחזירה לבסוף קארסטייט כלשהו
   
    const newState = {...currentState} //Spread Operator - שכפול אובייקט 
    switch(action.type){   
        case companiesActionType.AddCoupon:
        newState.coupon = action.payload;
            break;
/*
        case companiesActionType.DeletedCoupon:
            newState.coupon.filter(coupon=> coupon.couponId !== action.payload.couponId
                );
            break;
*/
        case companiesActionType.GetCompanyCoupons:
            newState.coupon=action.payload
            break;

        case companiesActionType.UpdateCoupon:
            newState.coupon=action.payload
            break;

        case companiesActionType.GetCouponsByCategory:
                newState.coupon=action.payload
                break;
        case companiesActionType.GetCouponsByMaxPrice:
                    newState.coupon=action.payload
                    break;
        case companiesActionType.GetCompanyDetails:
                newState.companies=action.payload
                break;            
    }
    return newState;//לאחר שמצא איזו פעולה לעשות בהתאם לארגומנטים שנשלחו אליו יחזיר את המצב החדש לאחר שינויים
}