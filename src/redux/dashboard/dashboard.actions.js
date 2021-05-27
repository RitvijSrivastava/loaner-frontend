import axios from "axios";
import { API } from "../../backend";
import {
  DATA_REQUEST,
  DATA_FAILURE,
  USER_DATA_SUCCESS,
  GET_LOAN_DATA_SUCCESS,
  CREATE_LOAN_DATA_SUCCESS,
} from "./dashboard.types";

const dataRequest = () => {
  return {
    type: DATA_REQUEST,
  };
};

const userDataSuccess = (user) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: user,
  };
};

const getLoanDataSuccess = (loans) => {
  return {
    type: GET_LOAN_DATA_SUCCESS,
    payload: loans,
  };
};

const createLoanDataSuccess = (loans) => {
  return {
    type: CREATE_LOAN_DATA_SUCCESS,
    payload: loans,
  };
};

const dataFailure = (errorMsg) => {
  return {
    type: DATA_FAILURE,
    payload: errorMsg,
  };
};

/**
 * Set user directly in redux store without network call.
 * Mostly use to reduce 1 network call to set user. {auth.actions} sets user in {dashboard state}
 * and dashboard reducer is presisted.
 * This is done like this, because we are already receiving a user object while signing in and the auth reducer is not needed after the user signs in.
 *
 *
 * @param {user} user - User Object
 * @returns void
 */
export const setUser = (user) => {
  return (dispatch) => {
    dispatch(userDataSuccess(user));
  };
};

/**
 * Fetch loans of a user and store it.
 * @param {string} userId - User Id
 * @returns void
 */
export const getLoans = (userId) => {
  return (dispatch) => {
    dispatch(dataRequest());
    axios
      .get(`${API}/db/getLoansByUserId`, {
        params: {
          userId: userId,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.error) {
          dispatch(dataFailure(data.error));
        } else {
          dispatch(getLoanDataSuccess(data.loans));
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(dataFailure(errorMsg));
      });
  };
};

/**
 * Create new loan.
 * @param {object} loan - Loan Object
 * @returns void
 */
export const createNewLoan = (loan) => {
  return (dispatch) => {
    dispatch(dataRequest());
    axios
      .post(`${API}/db/createNewLoan`, JSON.stringify(loan), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.error) {
          dispatch(dataFailure(data.error));
        } else {
          dispatch(createLoanDataSuccess(data.loans));
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(dataFailure(errorMsg));
      });
  };
};
