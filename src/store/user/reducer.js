import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  // deleteExpense,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  balance: null,
  expenses: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("action login", action.payload);
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      console.log("logout reducer");
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "user/addExpense": {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case "user/editBalance": {
      return {
        ...state,
        balance: action.payload.balance,
      };
    }

    case "expense/expenseDeleted": {
      console.log("deleteExpense");
      return {
        ...state,
        expenses: [],
      };
    }

    default:
      return state;
  }
}
