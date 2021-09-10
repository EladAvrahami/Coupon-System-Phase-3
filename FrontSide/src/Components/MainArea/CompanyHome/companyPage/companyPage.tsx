import AuthState from "../../../../Redux/AuthState";
import { CompanyState } from "../../../../Redux/CompanyState";
import SingleCompany from "../../../Companies/SingleCompany";
import AsideMenu from "../../../LayoutArea/Aside/Aside";
import SingleCompanyTable from "../../../Tables/SingleCompanyTable/SingleCompanyTable";
import "./companyPage.css";

function companyPage(): JSX.Element {
    return (
        <div className="companyPage">
			
            <main>
            <h1>Welcome company!</h1>
            </main>
        </div>
    );
}

export default companyPage;
