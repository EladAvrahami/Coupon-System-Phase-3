//handling Car AppState
import CompanyData from "../Components/Models/CompanyData";
import CustomerData from "../Components/Models/CustomerData"
//Car AppState - המידע ברמת האפליקציה הקשור לרכבים - אלו בעצם יהיו כל הרכבים במערכת
export class AdminState{
    public company:CompanyData ;
    public companies:CompanyData[] = []; //אנחנו נאתחל את האובייקט הפנימי כמערך של רכבים
    public customer:CustomerData;
    public customers: CustomerData[] = [];
    //מסוג קאר דאטה//זה המידע שמי שייגש למערכת יקבל את הקאר דאטה
}

//-----------------------------------------------------------------------------
//Car Action Types - אלו הפעולות שניתן לבצע על המידע ברמת האפליקציה
//זה האינם של הפעולות CRUD
export enum adminActionType{
    AddCompany = "AddCompany",               //post -> create
    DeleteCompany = "DeleteCompany",      //del -> delete
    UpdateCompany="UpdateCompany",          //put -> update
    GetAllCompanies = "GetAllCompanies", //get  -> read 
    GetOneCompanyLoggedIn="GetOneCompanyLoggedIn",//get  -> read  
    AddCustomer = "AddCustomer",               //post -> create
    UpdateCustomer="UpdateCustomer",          //put -> update
    DeletedCustomer = "DeletedCustomer",      //del -> delete
    GetAllCustomers = "GetAllCustomers", //get  -> read 
    GetOneCustomerById="GetOneCustomerById",//get  -> read 
    GetCompanyCoupons="GetCompanyCoupons"
    
}

//--------------------------------------------------------------------------------------
//Car Action - אובייקט המכיל את המידע עבור הפעולה שאנו מבצעים על המידע ברמת האפליקציה
export interface AdminAction{//אומר לי מה סוג הפעולות שאנחנו רוצים להעביר אינטרפייס
    type: adminActionType,
    payload?: any; //it can be anything 
}

//--------------------------------------------------------------------------------------------------------------------
//Car Action Creators - ייבאתי את קופון דאטה על מנת שיוסיף אליו נתוני קופון חדשים
export function AddCompanyAction(company:CompanyData):AdminAction{//מביאים ךו מכוניות ואמרים שרוצים לעשות פעולה
    return {type:adminActionType.AddCompany, payload: company}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function UpdateCompanyAction(company:CompanyData):AdminAction{//car הוא שם המשתנה יכול להיות גם משה //carData אומר לי מה הפונקציה תחזיר לי בסוף
    return {type: adminActionType.UpdateCompany, payload: company}
}
export function DeleteCompanyAction(id: number):AdminAction{
    return{type:adminActionType.DeleteCompany,payload:id}
}

export function GetAllCompaniesAction(companies:CompanyData[]):AdminAction{
    return {type: adminActionType.GetAllCompanies,payload:companies}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function GetOneCompanyLoggedInAction(company:CompanyData):AdminAction{
    return {type: adminActionType.GetOneCompanyLoggedIn, payload: company}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function GetCompanyCouponsAction(companyId : number):AdminAction{
    return {type: adminActionType.GetCompanyCoupons, payload: companyId}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function AddCustomerAction(customer:CustomerData):AdminAction{
    return {type: adminActionType.AddCustomer, payload: customer}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function UpdateCustomerAction(customer:CustomerData):AdminAction{//car הוא שם המשתנה יכול להיות גם משה //carData אומר לי מה הפונקציה תחזיר לי בסוף
    return {type: adminActionType.UpdateCustomer, payload: customer}
}

export function DeleteCustomerAction(id: number):AdminAction{
    return{type:adminActionType.DeletedCustomer,payload:id}
}

export function GetAllCustomersAction(customers:CustomerData[]):AdminAction{
    return {type: adminActionType.GetAllCustomers,payload:customers}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}

export function GetOneCustomerByIdAction(customer: CustomerData):AdminAction{
    return {type: adminActionType.GetOneCustomerById, payload: customer}//מחזיר את הפעולה ואת הדאטה ששלחנו לו
}


//------------------------------------------------------------------------------------------------
//Car Reducer - פונקציה המבצעת את הפעולה בפועל
                                // איתחול הפעולה פעםאחת בלבד //      tell where the action take from 
export function adminReducer(currentState: AdminState = new AdminState(), action:AdminAction):AdminState{//חתימה קבוע לא לשנות !!! פונקציה המחזירה לבסוף קארסטייט כלשהו
   
    const newState = {...currentState} //Spread Operator - שכפול אובייקט 
    switch(action.type){   
        case adminActionType.AddCompany:
        newState.company = action.payload;
            break;
    
        case adminActionType.GetAllCompanies:
        newState.companies= action.payload;
        break;

        case adminActionType.GetCompanyCoupons:
        newState.company=action.payload;
        break;

        case adminActionType.GetOneCompanyLoggedIn:
            newState.company=action.payload;
        
/*
case companiesActionType.DeletedCoupon:
            newState.coupon.filter(coupon=> coupon.couponId !== action.payload.couponId
                );
            break;
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
    }
    */
}
    return newState;//לאחר שמצא איזו פעולה לעשות בהתאם לארגומנטים שנשלחו אליו יחזיר את המצב החדש לאחר שינויים
}