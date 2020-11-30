import { auth, db } from "../../../firebase/";

const fireAuth = auth;
const firestore = db;

const docRefs = {
  adminUsers: firestore.collection("admin_users"),
};

export const ACTION_TYPE = {
  LOGIN_USER_START: "LOGIN_USER_START",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",
  // ------------------------------- \\
  LOGOUT_USER_START: "LOGOUT_USER_START",
  LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS",
  LOGOUT_USER_FAIL: "LOGOUT_USER_FAIL",
  // ------------------------------- \\
  CREATE_USER_START: "CREATE_USER_START",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL: "CREATE_USER_FAIL",
  // ------------------------------- \\
  CREATE_USER_WITH_FIELDS_START: "CREATE_USER_WITH_FIELDS_START",
  CREATE_USER_WITH_FIELDS_SUCCESS: "CREATE_USER_WITH_FIELDS_SUCCESS",
  CREATE_USER_WITH_FIELDS_FAIL: "CREATE_USER_WITH_FIELDS_FAIL",
};

// Firebase Auth Observer

fireAuth.onAuthStateChanged((authUser) => {
  if (authUser) {
    localStorage.setItem("localAuth", JSON.stringify(authUser));
  } else {
    localStorage.removeItem("localAuth");
  }
});

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_TYPE.LOGIN_USER_START,
    });

    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({
          type: ACTION_TYPE.LOGIN_USER_SUCCESS,
          payload: result.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPE.LOGIN_USER_FAIL,
          error: error.message,
        });
      });
  };
};

export const logoutUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.LOGOUT_USER_START });
    fireAuth
      .signOut()
      .then(() => {
        dispatch({ type: ACTION_TYPE.LOGOUT_USER_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPE.LOGOUT_USER_FAIL, error: error.message });
      });
  };
};

export const createUserWithFields = (
  email,
  password,
  displayName,
  userRole,
  firstName,
  lastName,
  userTitle
) => {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPE.CREATE_USER_WITH_FIELDS_START });

    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((registeredUserInfo) => {
        docRefs.adminUsers
          .add({
            uid: registeredUserInfo.user.uid,
            userRole: userRole,
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
            userTitle: userTitle,
          })
          .then((result) => {
            console.log(result);
            fireAuth
              .signOut()
              .then(() => {
                dispatch({
                  type: ACTION_TYPE.CREATE_USER_WITH_FIELDS_SUCCESS,
                });
              })
              .catch((errorSignOut) => {
                dispatch({
                  type: ACTION_TYPE.CREATE_USER_WITH_FIELDS_FAIL,
                  error: errorSignOut.message,
                });
              });
          })
          .catch((errorAddingUserFields) => {
            dispatch({
              type: ACTION_TYPE.CREATE_USER_WITH_FIELDS_FAIL,
              error: errorAddingUserFields.message,
            });
          });
      })
      .catch((errorSignIn) => {
        dispatch({
          type: ACTION_TYPE.CREATE_USER_WITH_FIELDS_FAIL,
          error: errorSignIn.message,
        });
      });
  };
};
