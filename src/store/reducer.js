import * as actionTypes from "./actions";

export const reduxState = {
  obras: null,
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = reduxState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.AUTH_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.authData.idToken,
        userId: action.authData.localId,
        error: null,
      };
    }
    case actionTypes.AUTH_LOGOUT: {
      return {
        ...state,
        token: null,
        userId: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
