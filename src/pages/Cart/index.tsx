//@ts-nocheck
import React from 'react'
import '../../scss/cart.scss';
import { useSelector,useDispatch } from 'react-redux';
import { removeCartItem,plusCartItem,minusCartItem } from '../../redux/actions/cart';
import deleteIcon from '../../assets/icons/deleteIcon.svg';
import { RootState } from '../../redux/store';

function Cart() {

    const dispatch = useDispatch();
    const { totalPrice, totalCount, items } = useSelector<RootState>(({ cart }) => cart);
    
    const cartItems = Object.keys(items).map((key) => {
            return items[key].items[0];
        });
    
    return (
        <div className="cart">
           <div className="container">
            <div className="cart__inner">
                {
                    cartItems.map((item,i)=>(
                        console.log(item),
                        item==undefined ? null :
                       <div key={`${i}_${item?.name}`} className="cart__inner-item">
                        <div className="cart__item-left">
                             <img className="cart__inner-img" src={item.image}/>
                             <div className="cart__inner-box">
                                   <div className="cart__item-name">{item.name}</div>
                             <div className="cart__item-price">{item.price}₽</div>
                             </div>
                        </div>
                        <div className="cart__item-quantity">
                            <div onClick={()=>dispatch(plusCartItem(item.id))}>+</div><span>{items[item.id].items.length}</span><div onClick={()=>dispatch(minusCartItem(item.id))}>-</div>
                            <img className="cart__item-delete" onClick={()=>dispatch(removeCartItem(item.id))} src={deleteIcon}/>
                        </div>
                     </div>
                    ))
                }
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
    )
}

export default Cart
