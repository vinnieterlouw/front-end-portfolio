import myAxios from "../axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

import { selectUser } from "./selectors";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await myAxios.post(`/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await myAxios.post(`/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await myAxios.get(`$/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data.userWithExpenses));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// export const getMe = (meData) => ({
//   type: "user/getMe",
//   payload: meData,
// });

// export const fetchMe = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/auth/me`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const user = response.data;
//       const token = localStorage.getItem("token");
//       console.log("fetch data by id", response);
//       dispatch(loginSuccess({ token, user }));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const addExpense = (data) => ({
  type: "user/addExpense",
  payload: data,
});

export const createExpense = (
  description,
  date,
  amount,
  status,
  category,
  payment_type
) => {
  return async (dispatch, getState) => {
    try {
      const user = selectUser(getState());
      const userId = user.id;
      const response = await myAxios.post(
        `/expense/post/${userId}`,
        { description, date, amount, status, category, payment_type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response create story", response.data);

      dispatch(addExpense(response.data));
      dispatch(
        showMessageWithTimeout(
          "Posted",
          false,
          "Added Expense Succesfully",
          1500
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const editBalance = (data) => ({
  type: "user/editBalance",
  payload: data,
});

export const changeBalance = (balance) => {
  return async (dispatch, getState) => {
    try {
      console.log("Getting to the action");
      const user = selectUser(getState());
      const userId = user.id;
      const response = await myAxios.patch(
        `/expense/editbalance/${userId}`,
        { balance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(editBalance(response.data));
      dispatch(
        showMessageWithTimeout("Posted", false, "Balance Changed", 1500)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const expenseDeleted = () => ({
  type: "expense/expenseDeleted",
});

export const deleteExpense = () => {
  return async (dispatch, getState) => {
    try {
      const user = selectUser(getState());
      const userId = user.id;
      const response = await myAxios.delete(`/expense/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      dispatch(expenseDeleted());
    } catch (error) {
      console.log(error);
    }
  };
};
