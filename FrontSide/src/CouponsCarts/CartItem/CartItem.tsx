import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// Types
import { CartItemType } from '../CouponStore/couponStore';
// Styles
import { Wrapper } from './CartItem.styles';
//הפריטים שבחלון שנפתח בצד כאשר לוחצים על העגלה 


type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (//הפונקציה מקבלת אייטם ופונק של הוספה והחסרה מעגלה
  <Wrapper>
    <div>
    <div className='priceContainer' >
      <h3>{item.title}</h3>
      </div>
      <div className='information'>
        <div className='priceContainer' >
          <p>Price: {item.price} ₪</p>
          <p>Price: {item.image} </p>
          </div>
        {/*<p>Total: {(item.amount * item.price).toFixed(2)}₪</p>*/}{/**קבלת הסכום הטוטאלי עבור כמות מוצרים מאותו סוג */}
        {/*toFixed ייתן לנו נק עשרונית 2מקומות אחורה ^*/}
      </div>


      {/*כפתורי מינוס פלוס פריטים שבתוך העגלה */}
      <div className='buttons'>
       {/* <Button
          size='small'
          disableElevation//כדי שלא יהיה צל 
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
       <p>{item.amount}</p>*/}

        <DeleteIcon className='deleteIcon'
         onClick={() => removeFromCart(item.id)}
       >
       </DeleteIcon>
        
      </div>
    </div>
    <img className='imgInCart' src={item.image} alt={item.title} />{/*תמונה תהיה לפי נתומונה שתתקבל מהאייטם */}
  </Wrapper>
);

export default CartItem;