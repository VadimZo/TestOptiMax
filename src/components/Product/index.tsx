//@ts-nocheck
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { ProductInt } from '../../pages/Home';
import { removeCartItem,plusCartItem,minusCartItem } from '../../redux/actions/cart';
import { RootState } from '../../redux/store';

let showArray=[];

interface ProductProps extends ProductInt{
    onClickAdd:(arg:ProductInt)=>void
  }
  

function Product({onClickAdd,id,name,price}:ProductProps) {
    const dispatch = useDispatch();
    const items = useSelector<RootState>(({cart}) => cart.items);
   
    const addToCart=()=>{
        const product={id,name,price}
        onClickAdd(product);
        showArray=[...showArray,id];
    }

   
    if(items[id]?.items.length==0 || items[id]?.items.length==undefined  ){
        showArray = showArray.filter(item=>item!==id);
    }

   

    return (
        <div className="home__inner-item">
            <div className="home__item-name">{name}</div>
            <div className="home__item-price">{price}₽</div>
            {!showArray.includes(id) && <div onClick={addToCart} className="home__item-add" >Add to cart</div>}
            {showArray.includes(id) && <div className="home__item-quantity">
                <div onClick={()=>dispatch(plusCartItem(id))}>+</div><span>{items[id]?.items.length}</span><div onClick={()=>dispatch(minusCartItem(id))}>-</div>
            </div>}
        </div>
    )
}

export default Product;
