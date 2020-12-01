import * as actionTypes from "./actions";

export const reduxState = {
  pieces: [],
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
    case actionTypes.START_CRUD: {
      return { ...state, loading: true };
    }
    case actionTypes.LIS_FAIL: {
      return { ...state, error: action.error, loading: false };
    }
    case actionTypes.LIS: {
      return { ...state, pieces: action.pieces, loading: false };
    }
    case actionTypes.UPD: {
      const pieces = [...state.pieces];
      pieces[action.index] = action.piece;

      return {
        ...state,
        pieces,
        loading: false,
      };
    }
    case actionTypes.ADD: {
      const pieces = [...state.pieces];
      pieces.push(action.piece);

      return {
        ...state,
        pieces,
        loading: false,
      };
    }
    case actionTypes.DEL: {
      const pieces = [...state.pieces];
      pieces.splice(action.index, action.index + 1);

      return { ...state, pieces, loading: false };
    }

    default:
      return state;
  }
};

export default reducer;
