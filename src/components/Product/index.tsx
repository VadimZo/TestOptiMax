//@ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { plusCartItem, minusCartItem, removeCartItem } from "../../redux/actions/cart";
import { RootState } from "../../redux/store";
import { CartState } from "../../redux/state/CartState";

interface ProductProps extends TProductItem {
  onClickAdd: (arg: TProductItem) => void;
}

function Product({ onClickAdd, id, name, price, image }: ProductProps) {
  const dispatch = useDispatch();
  const items = useSelector<RootState, CartState["items"]>(
    ({ cart }) => cart.items
  );

  const addToCart = () => {
    const product = { id, name, price, image };
    onClickAdd(product);
  };

  return (
    <div className="home__inner-item">
      <img className="home__inner-img" src={image} alt="product" />
      <div className="home__item-name">{name}</div>
      <div className="home__item-price">{price}₽</div>
      {!items[id] && (
        <div onClick={addToCart} className="home__item-add">
          Add to cart
        </div>
      )}
      {items[id] && (
        <div className="home__item-quantity quantity-item">
          <div onClick={() => dispatch(plusCartItem(id))}>+</div>
          <span>{items[id]?.items.length}</span>
          <div
            onClick={() =>
              items[id]?.items.length === 1
                ? dispatch(removeCartItem(id))
                : dispatch(minusCartItem(id))
            }
          >
            -
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
