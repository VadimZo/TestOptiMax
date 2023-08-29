import { useDispatch, useSelector } from "react-redux";

import {
  removeCartItem,
  plusCartItem,
  minusCartItem,
} from "../../redux/actions/cart";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { RootState } from "../../redux/store";
import { CartState } from "../../redux/state/CartState";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div key={item.id} className="cart__inner-item">
      <div className="cart__item-left">
        <img alt="product" className="cart__inner-img" src={item?.image} />
        <div className="cart__inner-box">
          <div className="cart__item-name">{item.name}</div>
          <div className="cart__item-price">{item.price}₽</div>
        </div>
      </div>
      <div className="cart__item-quantity quantity-item">
        <CartCountActions item={item} />
        <img
          className="cart__item-delete"
          onClick={() => dispatch(removeCartItem(item.id))}
          src={deleteIcon}
          alt="delete icon"
        />
      </div>
    </div>
  );
};

const CartCountActions = ({ item }) => {
  const { items } = useSelector<RootState, CartState>(({ cart }) => cart);
  const dispatch = useDispatch();
  return (
    <>
      <div onClick={() => dispatch(plusCartItem(item.id))}>+</div>
      <span>{items[item.id].items.length}</span>
      <div
        onClick={() =>
          items[item.id].items.length === 1
            ? dispatch(removeCartItem(item.id))
            : dispatch(minusCartItem(item.id))
        }
      >
        -
      </div>
    </>
  );
};

export default CartItem;
