import axios from "axios";

const initialState = {
  postedOrders: []
};

const POSTED_ORDER = "POSTED_ORDER";

const postOrder = (order) => ({
  type: POSTED_ORDER,
  order
});

export const postedOrder = (order) => {
  return (dispatch) => {
    dispatch(postOrder(order));
  };
};

const receiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTED_ORDER: {
      return {
        ...state,
        postedOrders: [...state.postedOrders, action.order]
      };
    }

    default:
      return state;
  }
};

export default receiptReducer;
