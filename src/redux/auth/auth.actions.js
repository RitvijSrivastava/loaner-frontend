import axios from "axios";
import { API } from "../../backend";
import { setUser } from "../dashboard/dashboard.actions";
import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_FAILURE,
  SIGN_OUT_FAILURE,
  REMOVE_ERROR_MESSAGE,
} from "./auth.types";

const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};

const signOutRequest = () => {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS,
  };
};

const signInSuccess = (user) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: user,
  };
};

const signOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

const signUpFailure = (errorMsg) => {
  return {
    type: SIGN_UP_FAILURE,
    payload: errorMsg,
  };
};

const signInFailure = (errorMsg) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: errorMsg,
  };
};

const signOutFailure = (errorMsg) => {
  return {
    type: SIGN_OUT_FAILURE,
    payload: errorMsg,
  };
};

const removeErrorMessageSuccess = () => {
  return {
    type: REMOVE_ERROR_MESSAGE,
  };
};

/**
 *  Sign up user.
 * @param {object} user - User Object
 * @returns void
 */
export const signUpUser = (user) => {
  return (dispatch) => {
    dispatch(signUpRequest());
    axios
      .post(`${API}/auth/signup`, JSON.stringify(user), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.error) {
          dispatch(signUpFailure(data.error));
        } else {
          dispatch(signUpSuccess());
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(signUpFailure(errorMsg));
      });
  };
};

/**
 * Sign In user. Set token in localstorage and add user to redux store.
 * @param {object} user - User object
 * @returns void
 */
export const signInUser = (user) => {
  return (dispatch) => {
    dispatch(signInRequest());
    axios
      .post(`${API}/auth/signin`, JSON.stringify(user), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.error) {
          dispatch(signInFailure(data.error));
        } else {
          if (typeof window !== undefined) {
            localStorage.setItem("jwt", JSON.stringify(data.token));
          }
          dispatch(setUser(data.user));
          dispatch(signInSuccess(data.user));
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(signInFailure(errorMsg));
      });
  };
};

/**
 * Sign out user
 * @returns void
 */
export const signOutUser = () => {
  return (dispatch) => {
    dispatch(signOutRequest());
    axios
      .get(`${API}/auth/signout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.error) {
          dispatch(signOutFailure(data.error));
        } else {
          dispatch(signOutSuccess());
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(signOutFailure(errorMsg));
      });
  };
};

/**
 * Remove error message. This is done to prevent errors popping up on refresh/reload.
 * @returns void
 */
export const removeErrorMessage = () => {
  return (dispatch) => {
    dispatch(removeErrorMessageSuccess());
  };
};
