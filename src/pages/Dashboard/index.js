import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Your 50/30/20 Chart",
    },
  },
};
const labels = ["0", "50%", "30%", "20% "];

export const data = {
  labels,
  datasets: [
    {
      label: "50/30/20 Line",
      data: [0, 50, 30, 20],
      fill: true,
      backgroundColor: "red",
      borderColor: "red",
    },
    {
      label: "Your line",
      data: [0, 33, 25, 35],
      fill: false,
      backgroundColor: "#32CD32",
      borderColor: "#32CD32",
    },
  ],
};

export default function Dashboard() {
  const user = useSelector(selectUser);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>
          {user.name}'s {""}Dashboard
        </h1>
      </div>
      <div>
        <div>
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
