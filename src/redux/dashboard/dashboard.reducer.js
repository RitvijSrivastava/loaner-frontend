import {
  LOAN_DATA_REQUEST,
  LOAN_DATA_SUCCESS,
  LOAN_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
} from "./dashboard.types";

const initialState = {
  loading: false,
  user: null,
  loans: null,
  error: "",
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_REQUEST:
    case LOAN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case LOAN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loans: action.payload,
        error: "",
      };
    case USER_DATA_FAILURE:
    case LOAN_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
