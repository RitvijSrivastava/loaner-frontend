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

const initialState = {
  loading: false,
  user: null,
  status: null,
  error: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
        status: null,
        error: "",
      };
    case SIGN_UP_SUCCESS:
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: "SUCCESS",
        error: "",
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        status: "FAILURE",
        error: action.payload,
      };
    case REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

export default authReducer;
