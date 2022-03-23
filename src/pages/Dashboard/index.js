import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectMe } from "../../store/user/selectors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Get the lines as close to eachother as possible for the perfect 50/30/20",
    },
  },
};

export const optionsDoughnut = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Payment Types",
    },
  },
};

const labels = ["0", "Needs 50%", "Wants 30%", "Savings 20% "];

export default function Dashboard() {
  const user = useSelector(selectUser);
  const me = useSelector(selectMe);

  const status = me?.map((user) => user.status);
  const payment = user?.expenses.map((user) => user.payment_type);

  const countStatus = status?.reduce((acc, element) => {
    const alreadyInAcc = acc.find((eachIndex) => eachIndex.type === element);

    const updatedAcc = alreadyInAcc
      ? acc.map((accElement) =>
          accElement.type === element
            ? { ...accElement, amount: accElement.amount + 1 }
            : accElement
        )
      : [...acc, { type: element, amount: 1 }];
    return updatedAcc;
  }, []);

  const countPayment = payment?.reduce((acc, element) => {
    const alreadyInAcc = acc.find((eachIndex) => eachIndex.type === element);

    const updatedAcc = alreadyInAcc
      ? acc.map((accElement) =>
          accElement.type === element
            ? { ...accElement, amount: accElement.amount + 1 }
            : accElement
        )
      : [...acc, { type: element, amount: 1 }];
    return updatedAcc;
  }, []);

  console.log(countPayment);

  const totalStatus = status?.length;
  const totalPayment = payment?.length;

  const amountStat = countStatus?.map((e) => e.amount);
  const amountPay = countStatus?.map((e) => e.amount);

  const needs = Math.round((amountStat[0] / totalStatus) * 100);
  const wants = Math.round((amountStat[1] / totalStatus) * 100);
  const savings = Math.round((amountStat[2] / totalStatus) * 100);

  const Cash = Math.round((amountPay[0] / totalPayment) * 100);
  const PIN = Math.round((amountPay[1] / totalPayment) * 100);
  const BankStatement = Math.round((amountPay[2] / totalPayment) * 100);

  const data = {
    labels,
    datasets: [
      {
        label: "50/30/20 Line",
        data: [0, 50, 30, 20],
        fill: true,
        backgroundColor: "black",
        borderColor: "black",
      },
      {
        label: "Your line",
        data: [0, needs, wants, savings],
        fill: false,
        backgroundColor: "#32CD32",
        borderColor: "#32CD32",
      },
    ],
  };

  const dataDoughnut = {
    labels: ["Cash", "Pin", "Bank Statement"],
    datasets: [
      {
        label: "# of Votes",
        data: [Cash, PIN, BankStatement],
        backgroundColor: ["#EC6B56", "#FFC154", "#47B39C"],
        borderColor: ["#EC6B56", "#FFC154", "#47B39C"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <h1>
          {user.name}'s {""}Dashboard
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "110px",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <Line options={options} data={data} />
        </div>
        <div style={{ width: "20%" }}>
          <Doughnut options={optionsDoughnut} data={dataDoughnut} />
        </div>
      </div>
    </div>
  );
}
