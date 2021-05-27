import {
  DATA_REQUEST,
  DATA_FAILURE,
  USER_DATA_SUCCESS,
  GET_LOAN_DATA_SUCCESS,
  CREATE_LOAN_DATA_SUCCESS,
} from "./dashboard.types";

const initialState = {
  loading: false,
  user: null,
  loans: null,
  status: "",
  error: "",
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        loading: true,
        status: "",
        error: "",
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        status: "",
        error: "",
      };
    case GET_LOAN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loans: action.payload,
        status: "",
        error: "",
      };
    case CREATE_LOAN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loans: action.payload,
        status: "SUCCESS",
        error: "",
      };
    case DATA_FAILURE:
      return {
        ...state,
        loading: false,
        status: "",
        error: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
