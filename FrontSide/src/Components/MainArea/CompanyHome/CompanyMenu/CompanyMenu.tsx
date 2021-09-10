import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
            <nav>
                <a href="#">Add coupon</a>
                <a href="#">Update coupon</a>
                <a href="#">Delete coupon</a>
                <a href="#">Get all company coupons</a>
                <a href="#">Get all company coupons by category</a>
                <a href="#">Get all company coupons by max price</a>
                <a href="#">Get company details</a>
            </nav>
        </div>
    );
}

export default AdminMenu;