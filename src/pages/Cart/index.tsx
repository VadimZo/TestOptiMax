import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../../scss/cart.scss";
import { RootState } from "../../redux/store";
import CartItem from "./CartItem";
import { CartState } from "../../redux/state/CartState";

function Cart() {
  const { totalPrice, totalCount, items } = useSelector<RootState, CartState>(
    ({ cart }) => cart
  );

  const cartItems = useMemo(
    () =>
      Object.keys(items).map((key) => {
        return items[key].items[0];
      }),
    [items]
  );

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__inner">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="cart__bottom">
        <div className="container">
          <div className="cart__bottom-info">
            <div className="cart__bottom-quantity">{totalCount}</div>
            <div className="cart__bottom-price">{totalPrice}₽</div>
            <button className="cart__checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
