import "./Layout.css";
import Header from "../Header/Header";
import AsideMenu from "../Aside/Aside";
import Copyright from "../Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import Routing from "../../Routing/Routing";
import { QueryClient, QueryClientProvider } from "react-query";

//func    name     return type
function Layout():JSX.Element{ 
    //JSX.Element = The component UI
    const client=new QueryClient(); //JSX.Element = The component UI
    return (
        <div className="Layout">
             <QueryClientProvider client={client}>
            <BrowserRouter>
                {/*<header>*/}
                <Header/>
                {/*</header>*/}
                <main className="container">
                <Routing/>
                {/* <CompaniesTable/>
                <CustomerTable/> */}
                </main>
                   <Copyright/>
            </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default Layout;