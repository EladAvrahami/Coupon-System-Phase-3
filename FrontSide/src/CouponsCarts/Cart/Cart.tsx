import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../CouponStore/couponStore';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Button, Icon } from '@material-ui/core';
import { CouponPurchase } from '../../Redux/CustomerState';
import { Link } from 'react-router-dom';



type Props = {
  cartItems: CartItemType[];//העגלה מקבלת מערך של מוצרים
  addToCart: (clickedItem: CartItemType) => void;//הפונקציה הוספה לעגלה לא מחזירה כלום ולכן וויד
  removeFromCart: (id: number) => void;//פונקציה שמקבלת תז מסוג מספר שזה יהיה התז של המוצר
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  //חישוב של סכום כל הפריטים בעגלה
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>My Shopping Cart (: </h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}{/*בדיקה אם העגלה ריקה תכתוב שאין פריטיםבמידה ויש אל תציג כלום */}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
        removeFromCart={removeFromCart}
        />
      ))}
     <div> <h2>Total Cart: {calculateTotal(cartItems).toFixed(2)} ₪</h2> {/*הצגת סכום כל פירטי העגלה */}</div>



         {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
         <Link to="/CouponPurchase">  {/* הוספת לינק שיפנה למסך הבית בלחיצה על לוגו */}
         <Button className='payCartBtn'>
      purchase coupons  <CreditCardIcon className='CreditCardIcon' >onClick={CouponPurchase}</CreditCardIcon>
      </Button>
             </Link>
      
    </Wrapper>
  );
};

export default Cart;