import "./AdminHome.css";

function AdminHome(): JSX.Element {
    return (
        <div className="AdminHome">
            <nav>
                <a href="#">Coupon purchase</a>
                <a href="#">Get all coupons per customer</a>
                <a href="#">Get all coupons per customer by category</a>
                <a href="#">Get all coupons per customer by max price</a>
                <a href="#">Get customer details</a>
            </nav>
        </div>
    );
}

export default AdminHome;