import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectMe, selectUser } from "../../store/user/selectors";
import {
  changeBalance,
  createExpense,
  deleteExpense,
} from "../../store/user/actions";
import "../Expenses/expense.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete } from "@mui/material";

export default function Expenses() {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const spendByUser = me?.map((user) => parseInt(user.amount));
  const totalSpend = spendByUser?.reduce((a, b) => a + b, 0);

  const optionsStatus = ["Needs", "Wants", "Savings"];
  const optionsCategory = [
    "Clothing",
    "Groceries",
    "House",
    "Book to Savings Account",
    "School",
    "Personal Items",
    "Car",
    "Other",
  ];
  const optionsPayment = ["Cash", "PIN", "Bank Statement"];

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [payment_type, setPayment_type] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");

  const columns = [
    { field: "description", headerName: "Description", width: 220 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Needs/Wants", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "payment_type", headerName: "Payment Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];

  useEffect(() => {
    if (!user.email) navigate("/");
  }, [user, navigate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    dispatch(deleteExpense());
    setOpen(false);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const current = new Date();
    const currentMonth = months[current.getMonth()];
    doc.text(`Expenses ${currentMonth}`, 20, 10);
    doc.autoTable({
      theme: "striped",
      columns: columns.map((col) => ({
        ...col,
        dataKey: col.field,
        header: col.headerName,
      })),
      body: me,
    });
    doc.save("table.pdf");
  };

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

  function submitBalanceChange(event) {
    event.preventDefault();
    dispatch(changeBalance(balance));

    setBalance("");
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
                      setBalance(e.target.value);
                    }}
                    value={balance}
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
                    onClick={submitBalanceChange}
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
                <p class="d-flex flex-row justify-content-center text-align-center">
                  &euro;{" "}
                  <span class="text-dark">{user.balance - totalSpend}</span>
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="card p-3">
          <div class="card-bottom pt-3 px-3 mb-2">
            <div class="d-flex flex-row justify-content-center text-align-center">
              <div class="d-flex flex-column ">
                <span class="d-flex flex-row justify-content-center text-align-center">
                  Export Expenses
                </span>
                <p>
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
                    onClick={() => downloadPdf()}
                  >
                    Export as PDF
                  </button>
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="card p-3">
          <div class="card-bottom pt-3 px-3 mb-2">
            <div class="d-flex flex-row justify-content-center text-align-center">
              <div class="d-flex flex-column ">
                <span class="d-flex flex-row justify-content-center text-align-center">
                  Delete Expenses{" "}
                </span>
                <div>
                  <Button
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
                    onClick={handleClickOpen}
                  >
                    DELETE ALL
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to delete?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Click delete to permently delete you expenses, click
                        cancel to stop and go back!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDelete}>Delete</Button>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "10px",
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
          marginTop: "10px",
          flexDirection: "row",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <TextField
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          defaultValue="22/02/2022"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
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
          value={amount}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
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
              marginBottom: "15px",
            }}
          >
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
