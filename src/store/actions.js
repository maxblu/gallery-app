import axios from "../axios-orders";

export const ADD = "CRE";
export const DEL = "DEL";
export const UPD = "UPD";
export const LIS = "LIS";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export const checkTokenTimeOut = (expeiztionTime) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), parseInt(expeiztionTime) * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: AUTH_LOGOUT,
  };
};

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBg1Up4GcuOLy7Lx1qbPZ5BVtyGE4PtQCE";

    if (!method) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBg1Up4GcuOLy7Lx1qbPZ5BVtyGE4PtQCE";
    }

    axios
      .post(url, authData)
      .then((resp) => {
        const expirationDate = new Date(
          new Date().getTime() + parseInt(resp.data.expiresIn) * 1000
        );

        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", resp.data.localId);

        dispatch(authSuccess(resp.data));
        dispatch(checkTokenTimeOut(resp.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (new Date() <= expirationDate) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({ localId: userId, idToken: token }));
        dispatch(
          checkTokenTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
