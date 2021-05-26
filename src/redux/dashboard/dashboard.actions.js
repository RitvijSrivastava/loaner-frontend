import axios from "axios";
import { API } from "../../backend";
import {
  LOAN_DATA_REQUEST,
  LOAN_DATA_SUCCESS,
  LOAN_DATA_FAILURE,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
} from "./dashboard.types";

const userDataRequest = () => {
  return {
    type: USER_DATA_REQUEST,
  };
};

const loanDataRequest = () => {
  return {
    type: LOAN_DATA_REQUEST,
  };
};

const userDataSuccess = (user) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: user,
  };
};

const loanDataSuccess = (loans) => {
  return {
    type: LOAN_DATA_SUCCESS,
    payload: loans,
  };
};

const userDataFailure = (errorMsg) => {
  return {
    type: USER_DATA_FAILURE,
    payload: errorMsg,
  };
};

const loanDataFailure = (errorMsg) => {
  return {
    type: LOAN_DATA_FAILURE,
    payload: errorMsg,
  };
};

/**
 * Set user directly in redux store without network callF.
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
    dispatch(loanDataRequest());
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
          dispatch(loanDataFailure(data.error));
        } else {
          dispatch(loanDataSuccess(data.loans));
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(loanDataFailure(errorMsg));
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
    dispatch(loanDataRequest());
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
          dispatch(loanDataFailure(data.error));
        } else {
          dispatch(loanDataSuccess(data.loans));
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.error;
        dispatch(loanDataFailure(errorMsg));
      });
  };
};
