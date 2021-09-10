import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../CouponStore/couponStore';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

// id:number;
// companyID:number;
// category:string;
// title:string;
// description:string;
// startDate:string;
// endDate:string;
// amount:number;
// price:number;
// image:string;

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>{/*כותרת מודגש  */}
      <p>{item.category}</p>
      <p>{item.description}</p>
      <p>End-Date:<br/>{item.endDate}</p>
      <h3>₪{item.price}</h3>{/*מחיר מודגש  */}
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;





















/*import Button  from "@material-ui/core/Button";
//types: מגיע מה APP.tsx
import{CartItemType} from '../App'
//STYLES' לייבא את הסטייל  
import { Wrapper } from './Item.stayles';

type Props={
    item:CartItemType;
    handelAddToCart:(clickedItem:CartItemType) => void; 
}
//לריאקט פונקציית קומפוננטה נרשום FC
const Item:React.FC<Props> =({item, handelAddToCart})=>(
    <Wrapper>
        <img src={item.image} alt={item.title}/>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() =>handelAddToCart(item)}>Add to cart</Button>
    </Wrapper>
)

export default Item;*/
