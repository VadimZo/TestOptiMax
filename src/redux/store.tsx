import { createStore, compose } from "redux";
import { CartState } from "./state/CartState";
import { rootReducer } from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface RootState {
  cart: CartState;
}

const store = createStore(rootReducer, composeEnhancers());

export default store;
