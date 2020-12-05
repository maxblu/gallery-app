import axios from "../axios-orders";
import { storage } from "../firebase/firebase";

export const ADD = "CRE";
export const DEL = "DEL";
export const UPD = "UPD";
export const PATCHV = "PATCHV";
export const LIS = "LIS";
export const LIS_FAIL = "LIST_FAIL";

export const START_CRUD = "START_CRUD";
export const CHV = "START_CHV";

export const SERCH = "SERCH";

export const CLE = "CLE";

export const CRUDFAIL = "CRUDFAIL";

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

export const searchFin = (pieces) => {
  return {
    type: SERCH,
    result: pieces,
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

export const startCRUD = () => {
  return {
    type: START_CRUD,
  };
};

export const crudFail = (error) => {
  return {
    type: CRUDFAIL,
    error: error,
  };
};

export const startCHAV = () => {
  return {
    type: CHV,
  };
};

export const getPiecesSucces = (pieces) => {
  return {
    type: LIS,
    pieces: pieces,
  };
};

export const getPiecesFail = (error) => {
  return {
    type: LIS_FAIL,
    error: error,
  };
};

export const update = (piece, index) => {
  return {
    type: UPD,
    piece: piece,
    index: index,
  };
};

export const updatePartial = (visible, index) => {
  return {
    type: PATCHV,
    visible: visible,
    index: index,
  };
};

export const create = (piece) => {
  return {
    type: ADD,
    piece: piece,
  };
};

export const delet = (index) => {
  return {
    type: DEL,
    index: index,
  };
};

export const cleanError = () => {
  return {
    type: CLE,
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

        // dispatch(getPieces("admin"));
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

        // dispatch(getPieces("admin"));
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

export const getPieces = (mode) => {
  return (dispatch) => {
    let url = "/pieces.json";
    if (mode === "user") {
      url = '/pieces.json?orderBy="visible"&equalTo=true';
    }

    axios
      .get(url)
      .then((resp) => {
        const fetchedPieces = [];
        for (let key in resp.data) {
          fetchedPieces.push({ ...resp.data[key], id: key });
        }
        dispatch(getPiecesSucces(fetchedPieces));
      })
      .catch((err) => {
        dispatch(getPiecesFail(err));
      });
  };
};

export const updatePiece = (piece, index, token) => {
  return (dispatch) => {
    axios
      .put("/pieces/" + piece.id + ".json?auth=" + token, piece)
      .then((resp) => {
        dispatch(update(piece, index));
      })
      .catch((erro) => {
        dispatch(crudFail(erro));
      });
  };
};

export const updatePartialPiece = (id, data, index, token) => {
  return (dispatch) => {
    dispatch(updatePartial(data.visible, index));
    axios
      .patch("/pieces/" + id + ".json?auth=" + token, data)
      .then((resp) => {})
      .catch((erro) => {
        // console.log(err);
        dispatch(updatePartial(!data.visible, index));
        dispatch(crudFail(erro));
      });
  };
};

export const createPiece = (piece, token) => {
  return (dispatch) => {
    axios
      .post("/pieces.json?auth=" + token, piece)
      .then((resp) => {
        dispatch(create(piece));
      })
      .catch((erro) => {
        dispatch(crudFail(erro));
      });
  };
};

export const deletePiece = (piece, index, token) => {
  return (dispatch) => {
    if (piece.image_url) {
      deleteOldOne(piece.image_url);
    }
    axios
      .delete("/pieces/" + piece.id + ".json?auth=" + token)
      .then((resp) => {
        dispatch(delet(index));
      })
      .catch((erro) => {
        dispatch(crudFail(erro));
      });
  };
};

export const crudManager = (data, action, index, token) => {
  return (dispatch) => {
    switch (action) {
      case "CRE": {
        dispatch(createPiece(data, token));
        break;
      }
      case "UPD": {
        dispatch(updatePiece(data, index, token));
        break;
      }
      case "DEL": {
        dispatch(deletePiece(data, index, token));
        break;
      }

      default:
        break;
    }
  };
};

export const handlePhotoStorage = (image_url, photo) => {
  return new Promise((resolve, reject) => {
    if (image_url) {
      deleteOldOne(image_url);
    }

    const uploadTask = storage
      .ref(`/images/${photo.raw.name}`)
      .put(photo.raw.file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {},
      (err) => {
        reject(err);
      },
      () => {
        storage
          .ref("images")
          .child(photo.raw.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            resolve(fireBaseUrl);
          });
      }
    );
  });
};

export const deleteOldOne = (imageRef) => {
  const deleteRef = storage.refFromURL(imageRef);

  deleteRef
    .delete()
    .then((resp) => {})
    .catch((err) => {});
};

export const searchPieces = (pieces, value, searchParam) => {
  return (dispatch) => {
    const result = [];

    for (let key in pieces) {
      if (
        pieces[key][searchParam].toLowerCase().includes(value.toLowerCase())
      ) {
        result.push(pieces[key]);
      }
    }

    dispatch(searchFin(result));
  };
};
