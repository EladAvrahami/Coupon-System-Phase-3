import "./AdminHome.css";

function AdminHome(): JSX.Element {
    return (
        <div className="AdminHome">
            <nav>
                <a href="#">Add company</a>
                <a href="#">Update company</a>
                <a href="#">Delete company</a>
                <a href="#">Get one company</a>
                <a href="#">Get all companies</a>
                <a href="#">Add customer</a>
                <a href="#">Update customer</a>
                <a href="#">Delete customer</a>
                <a href="#">Get one customer</a>
                <a href="#">Get all customers</a>
            </nav>
        </div>
    );
}

export default AdminHome;
