import React from 'react';
import {  useDispatch } from 'react-redux';
import Product from '../../components/Product';
import { addToCart } from '../../redux/actions/cart';
import '../../scss/home.scss';

export interface ProductInt {
    id:number,
    name:string,
    price:number,
    image:string
}


function Home() {
    const dispatch =useDispatch();
    const [products,setProducts]=React.useState<Array<ProductInt> | undefined>();

    React.useEffect(()=>{
      fetch('./products.json')
        .then(result=>result.json())
        .then(array=>setProducts(array));
    },[])

    const addItemToCart=(product:ProductInt)=>{
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
