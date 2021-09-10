import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from '../Item/Item';
import Cart from '../Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from '../App.styles';//כפתור סטייל מגיע מהעיצוב של האפ
// Types
export type CartItemType = {
id:number;
companyID:number;
category:string;
title:string;
description:string;
startDate:string;
endDate:string;
amount:number;
price:number;
image:string;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('http://localhost:8080/coupons/getAllCoupons')).json();
//האוויט הראשטון זה לקריאה של האייפיאיי והאוויט השני שנמיר אותו לגייסון 
const CouponStore = () => {
  const [cartOpen, setCartOpen] = useState(false);// סט-עגלה-פתוחה הוא בוליאני
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);
/*פונקציהבעלת משתנה צובר מסוג מספר שיבפור את מס הפריטים בעגלה */
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);//נוסיף למצבר כמות שיתאר את עמות הפריטים בעגלה ונאתחל ל0


    /*הוספה של פריטים לעגלה */
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(previous => {
      // 1. Is the item already added in the cart?
      //במידה והעגלה ריקה נוסיף את הפריט אליה,לעומת זאת אם היא כבר קיימת בעגלה 
      const isItemInCart = previous.find(item => item.id === clickedItem.id);//בדיקה האם הפריט שלחצתי עליו קיים בעגלה עי השוואה של שני האידי 
//find יחזיר לי אמת או שקר אם קיים במערך

//בדיקה אם הפריט קיים בעגלה ************************
      if (isItemInCart) {
        return previous.map(item =>//פריוויוס הוא סטייט
          item.id === clickedItem.id//האיידי שקיים בעגלה שווה לאידי של הפריט שנלחץ
            ? { ...item, amount: item.amount }//שיניתי כך שבעצם יהיה ניתן להוסיף רק קופון 1 *******************
            : item//אחרת נחזיר את הפריט כמו שהוא 
        );
      }
      // First time the item is added //זה מה שיקרה בלחיצה הראשונה 
      //נחזיר מערך עם כל הפריטים הקודמים שבעגלה,באמצעות ההעתקה,ונוסיף את הפריט למערך
      return [...previous, { ...clickedItem, amount: 1 }];//נשתשמש בהעתקה על המצב הקודם 
    });
  };

  /*//בדיקה אם הפריט קיים בעגלה ************************
      if (isItemInCart) {
        return previous.map(item =>//פריוויוס הוא סטייט
          item.id === clickedItem.id//האיידי שקיים בעגלה שווה לאידי של הפריט שנלחץ
            ? { ...item, amount: item.amount + 1 }//יצירת ספרדאופרטור (מעתיק) לפריט הישן ,ניקח את הפרופרטי כמות ונאמר שהוא יהיה הכמות של הפריט ועוד אחד
            : item//אחרת נחזיר את הפריט כמו שהוא 
        );
      }
      // First time the item is added //זה מה שיקרה בלחיצה הראשונה 
      //נחזיר מערך עם כל הפריטים הקודמים שבעגלה,באמצעות ההעתקה,ונוסיף את הפריט למערך
      return [...previous, { ...clickedItem, amount: 1 }];//נשתשמש בהעתקה על המצב הקודם 
    });
  };
 */



  //טיפול במחיקת הפריט מהעגלה
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>//קריאה למצב האחרון שהיינו בו 
      prev.reduce((sum, item) => {
        if (item.id === id) {//אם התז של הפריט שווה לתז של הארגומנט
          if (item.amount === 1) return sum; 
          return [...sum, { ...item, amount: item.amount - 1 }];
        } else {
          return [...sum, item];
        }
      }, [] as CartItemType[])//מערך ריק מאותו סוג של מערך של פריטים בעגלה
    );
  };

  if (isLoading) return <LinearProgress />;//בטעינה של המסך יציג קו כחול של התקדמות
  if (error) return <div>Something went wrong ...</div>;//בשגיאה יצי הודעה

  return (
    <Wrapper>
    <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
      <Cart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
    </Drawer>
    <StyledButton onClick={() => setCartOpen(true)}>{/*בלחיצת על כפתור העגלה תיפתח לתפריט */}
      <Badge badgeContent={getTotalItems(cartItems)} color='error'>{/*Badge נותן תגית אדומה על עגלה לפי מס הפריטים ששלחנו אליה  */}
        <AddShoppingCartIcon/>
      </Badge>
    </StyledButton>
    <Grid container spacing={3}>
      {data?.map(item => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  </Wrapper>
  );
};

export default CouponStore;



















