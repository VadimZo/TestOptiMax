export const addToCart = (itemObj) => ({
    type: 'ADD_TO_CART',
    payload: itemObj,
  });
  export const removeCartItem = (id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: id,
  });
  
  export const plusCartItem = (id) => ({
    type: 'PLUS_CART_ITEM',
    payload: id,
  });
  
  export const minusCartItem = (id) => ({
    type: 'MINUS_CART_ITEM',
    payload: id,
  });
  export const clearCart = () => ({
    type: 'CLEAR_CART',
  });