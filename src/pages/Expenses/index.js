import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectMe, selectUser } from "../../store/user/selectors";
import { changeBalance, createExpense } from "../../store/user/actions";
import "../Expenses/expense.css";

import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

export default function Expenses() {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const user = useSelector(selectUser);

  const spendByUser = me?.map((user) => parseInt(user.amount));
  const totalSpend = spendByUser?.reduce((a, b) => a + b, 0);

  const optionsStatus = ["Needs", "Wants", "Savings"];
  const optionsCategory = [
    "Clothing",
    "Groceries",
    "House",
    "Car",
    "Take out",
    "Restaurant",
    "Vacation",
    "Saving to bank",
    "Other",
  ];
  const optionsPayment = ["Cash", "PIN", "Bank Statement"];

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(optionsCategory[0]);
  const [payment_type, setPayment_type] = useState(optionsPayment[0]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(optionsStatus[0]);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  console.log(date);

  const columns = [
    { field: "description", headerName: "Description", width: 220 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Needs/Wants", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "payment_type", headerName: "Payment Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];

  const rows = me;

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      createExpense(description, date, amount, status, category, payment_type)
    );

    setDescription("");
    setDate("");
    setAmount("");
    setStatus("");
    setCategory("");
    setPayment_type("");
  }

  return (
    <div>
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <div class="card p-3">
          <div class="card-bottom pt-3 px-3 mb-2">
            <div class="d-flex flex-row justify-content-between text-align-center">
              <div class="d-flex flex-column">
                <span>Starting balance</span>
                <p>
                  &euro; <span class="text-dark">{user?.balance}</span>
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Change Balance"
                    variant="outlined"
                    size="small"
                    type="number"
                    onChange={(e) => {
                      console.log("called, changing balance");
                      setBalance(e.target.value);
                    }}
                  />
                  <button
                    style={{
                      backgroundColor: "Black",
                      color: "white",
                      padding: "8px",
                      width: "70px",
                      textDecoration: "none",
                      border: "none",
                      borderRadius: "15px",
                      margin: "10px",
                      fontSize: "10px",
                    }}
                    onClick={() => dispatch(changeBalance(balance))}
                  >
                    Change
                  </button>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="card p-3">
          <div class="card-bottom pt-3 px-3 mb-2">
            <div class="d-flex flex-row justify-content-between text-align-center">
              <div class="d-flex flex-column ">
                <span>Balance Left</span>
                <p>
                  &euro;{" "}
                  <span class="text-dark">{user.balance - totalSpend}</span>
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      {me ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 400,
              width: "60%",
              marginTop: "20px",
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "40px",
        }}
      >
        {" "}
        <h2>Add Expense</h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "row",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Date (YYYY-MM-DD)"
          variant="outlined"
          onChange={(e) => setDate(e.target.value)}
        />
        <Autocomplete
          value={status}
          onChange={(event, newValue) => {
            setStatus(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={optionsStatus}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Need/Want/Saving" />
          )}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "row",
        }}
      >
        <Autocomplete
          value={category}
          onChange={(event, newValue2) => {
            setCategory(newValue2);
          }}
          inputValue={inputValue2}
          onInputChange={(event, newInputValue2) => {
            setInputValue2(newInputValue2);
          }}
          id="controllable-states-demo"
          options={optionsCategory}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
        <Autocomplete
          value={payment_type}
          onChange={(event, newValue3) => {
            setPayment_type(newValue3);
          }}
          inputValue={inputValue3}
          onInputChange={(event, newInputValue3) => {
            setInputValue3(newInputValue3);
          }}
          id="controllable-states-demo"
          options={optionsPayment}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField {...params} label="Payment Type" />
          )}
        />
        <TextField
          id="outlined-number"
          label="Amount in Euro's"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "100px",
        }}
      >
        <button
          style={{
            backgroundColor: "Black",
            color: "white",
            padding: "8px",
            width: "200px",
            textDecoration: "none",
            border: "none",
            borderRadius: "15px",
            margin: "10px",
          }}
          onClick={submitForm}
        >
          Add!
        </button>
      </div>
    </div>
  );
}
