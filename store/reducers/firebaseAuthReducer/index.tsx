import { ACTION_TYPE } from "../../actions/fireAuthActions";

const localAuthData = JSON.parse(localStorage.getItem("localAuth"));

let initialState = {
  isAuth: false,
  authUser: {
    userDisplayName: null,
    userEmail: null,
    userRole: null,
  },
  isLoading: false,
  error: [],
};

if (localAuthData) {
  initialState = { ...initialState, isAuth: true };
} else {
  initialState = { ...initialState, isAuth: false };
}

export const firebaseAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN_USER_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, isAuth: true };

    case ACTION_TYPE.LOGIN_USER_FAIL:
      return { ...state, isLoading: false };

    case ACTION_TYPE.LOGOUT_USER_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.LOGOUT_USER_SUCCESS:
      return { ...state, isLoading: false, isAuth: false };

    case ACTION_TYPE.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        error: [action.error],
      };

    default:
      return state;
  }
};
