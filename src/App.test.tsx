import { render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import Header from './components/Header';
import store from './redux/store';
import { BrowserRouter as Router,Router as Route } from 'react-router-dom';
import Product from './components/Product';
import userEvent from '@testing-library/user-event';
import App from './App';
import cart from './redux/reducers/cart';


const Wrapper = ({ children }) => (
    <Router>
        <Provider store={store}>{children}</Provider>
    </Router>
);

describe(('test render Components'),()=>{
    it('test render Header component', () => {
        render(<Header/>,{ wrapper:Wrapper });
        expect(screen.getByRole('link',{name: /test_optimax/i})).toBeInTheDocument();
    });
    it('test render Product component',()=>{
        render(<Product onClickAdd={()=>''} id={1} name="Апельсин" price={100} image="ссылка"/>,{wrapper:Wrapper});
        expect(screen.getByText(/апельсин/i)).toBeInTheDocument();
    })
})

describe(('test Router'),()=>{
    it(('Cart route test'),()=>{
        render(<App/>,{wrapper:Wrapper});
        userEvent.click(screen.getByTestId("cartSvg"),{button:0});
        expect(screen.getByRole('button',{name:/checkout/i})).toBeInTheDocument();
    })
});

describe(('test cart Reducer'),()=>{
    const obj={
        id:1,name:"Апельсин",price:80,
        image:"https://i.pinimg.com/originals/6e/a9/15/6ea91530a39b956310a3f152340ff916.jpg"
    }

    const objHaveItem={
        items:{
            1:{
                items:[obj],
                totalPrice:80
            }
        },
        totalCount:1,
        totalPrice:80
    }


    it(('test add to cart '),()=>{
      const state = cart({items:[],totalPrice:0,totalCount:0},{type:"ADD_TO_CART",payload:obj});
        expect(state).toEqual({
            items:{
                1:{
                    items:[obj],
                    totalCount: 1,
                    totalPrice:80
                }
            },
            totalCount:1,
            totalPrice:80
        });
    })
    it(('test plus item to cart '),()=>{
        const state = cart(objHaveItem,{type:"PLUS_CART_ITEM",payload:1});
          expect(state).toEqual({
              items:{
                  1:{
                      items:[obj,obj],
                      totalPrice:160
                  }
              },
              totalCount:2,
              totalPrice:160
          });
      })

      it(('test remove item from cart '),()=>{
        const state = cart(objHaveItem,{type:"REMOVE_CART_ITEM",payload:1});
          expect(state).toEqual({
              items:{},
              totalCount:0,
              totalPrice:0
          });
      })

      it(('test remove item from cart '),()=>{
        const state = cart(objHaveItem,{type:"MINUS_CART_ITEM",payload:1});
          expect(state).toEqual({
            items:{
              1 : {
                items: [],
                totalPrice: 0,},
              },
              totalCount:0,
              totalPrice:0
          });
      })
});
