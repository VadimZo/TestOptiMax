import React from 'react';
import {  useDispatch } from 'react-redux';
import Product from '../../components/Product';
import { addToCart } from '../../redux/actions/cart';
import '../../scss/home.scss';
import { TProductItem } from '../../redux/state/CartState';

function Home() {
    const dispatch =useDispatch();
    const [products,setProducts]=React.useState<Array<TProductItem> | undefined>();

    React.useEffect(()=>{
      fetch('./products.json')
        .then(result=>result.json())
        .then(array=>setProducts(array));
    },[])

    const addItemToCart=(product:TProductItem)=>{
        dispatch(addToCart(product));
    }

    return (
        <div className="home">
            <div className="container">
               <div className="home__inner">
                       {
                           products?.map((product)=>(
                               <Product key={product.id}  onClickAdd={addItemToCart} {...product}/>
                           ))
                       }
               </div>
            </div>
        </div>
    )
}

export default Home;
