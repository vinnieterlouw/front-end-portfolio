import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMe } from "../../store/user/actions";
import { selectMe } from "../../store/user/selectors";
import { createExpense } from "../../store/user/actions";

import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

export default function Expenses() {
  const dispatch = useDispatch();
  const user = useSelector(selectMe);

  const optionsStatus = ["Necessary", "Somewhat necessary", "Not necessary"];
  const optionsCategory = [
    "Clothing",
    "Groceries",
    "House",
    "Car",
    "Take out",
    "Restaurant",
    "Vacation",
    "Other",
  ];
  const optionsPayment = ["Cash", "PIN", "Credit Card"];

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(optionsCategory[0]);
  const [payment_type, setPayment_type] = useState(optionsPayment[0]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(optionsStatus[0]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const columns = [
    { field: "description", headerName: "Description", width: 220 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "payment_type", headerName: "Payment Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];

  const rows = user && user.expenses;

  function submitForm(event) {
    // console.log("input", name, content, imageUrl);
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
    setInputValue("");
    setInputValue2("");
    setInputValue3("");
  }

  return (
    <div>
      {user ? (
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
          renderInput={(params) => <TextField {...params} label="Status" />}
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
          Submit
        </button>
      </div>
    </div>
  );
}
