const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const getPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);
const getCount = (arr) => arr.reduce((count) => count + 1, 0);

const getTotalPrice = (arr) =>
  Object.keys(arr)
    .map((key) => arr[key].totalPrice)
    .reduce((sum, el) => sum + el, 0);
const getTotalCount = (arr) =>
  Object.keys(arr)
    .map((key) => arr[key].items.length)
    .reduce((count, el) => count + el, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const currentItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];
      const newObj = {
        ...state.items,
        [action.payload.id]: {
          items: currentItems,
          totalPrice: getPrice(currentItems),
          totalCount: getCount(currentItems),
        },
      };
      return {
        ...state,
        items: newObj,
        totalPrice: getTotalPrice(newObj),
        totalCount: getTotalCount(newObj),
      };
    }

    case "REMOVE_CART_ITEM": {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case "PLUS_CART_ITEM": {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getPrice(newObjItems),
        },
      };

      const totalCount = getTotalCount(newItems);
      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;

      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(0, -1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getPrice(newObjItems),
        },
      };

      const totalCount = getTotalCount(newItems);
      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cart;
