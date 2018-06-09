const UPDATE_FORM = "UPDATE_FORM";
const UPDATE_RESPONSE = "UPDATE_RESPONSE";

const initState = {
  firstName: "",
  lastName: "",
  homeAddress: "",
  email: "",
  response: {}
};

const updateForm = (field) => {
  return {
    type: UPDATE_FORM,
    field
  };
};

export const updatedForm = (field) => {
  return (dispatch) => {
    dispatch(updateForm(field));
  };
};

const updateResponse = (response) => {
  return {
    type: UPDATE_RESPONSE,
    response
  };
};

export const updatedResponse = (response) => {
  return (dispatch) => {
    dispatch(updateResponse(response));
  };
};

const checkoutReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        ...action.field
      };
    case UPDATE_RESPONSE:
      return {
        ...state,
        response: action.response
      };
    default:
      return state;
  }
};

export default checkoutReducer;
