import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  balance: null,
  expenses: null,
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
      console.log("add reducer", action.payload);
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

    default:
      return state;
  }
}
