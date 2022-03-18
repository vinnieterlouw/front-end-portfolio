import axios from "axios";

export default axios.create({
  baseURL: "https://moneymanager503020.herokuapp.com",
  //baseURL: 'http://localhost:4000'
});
