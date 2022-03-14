import { Link } from "react-router-dom";
import "../Homepage/homepage.css";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";

export default function Home() {
  const token = useSelector(selectToken);

  return (
    <div>
      <div className="img"></div>
      <div className="center">
        <div className="title">Manage your money</div>
        <div className="sub_title">Following the 50/30/20 Rule</div>
        {token ? (
          ""
        ) : (
          <div className="btns">
            <Link to="/signup">
              <button>Sign up now!</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
      <div className="img2">
        <div className="center2">
          <div className="sub_title2">
            The 50/30/20 rule is an easy budgeting method that can help you to
            manage your money effectively, simply and sustainably. The basic
            rule of thumb is to divide your monthly after-tax income into three
            spending categories: 50% for needs, 30% for wants and 20% for
            savings or paying off debt.
          </div>
          <div className="center3">
            <div className="sub_title3">
              By regularly keeping your expenses balanced across these main
              spending areas, you can put your money to work more efficiently.
              And with only three major categories to track, you can save
              yourself the time and stress of digging into the details every
              time you spend.
            </div>
          </div>
          <div className="center4">
            <div className="sub_title4">
              One question we hear a lot when it comes to budgeting is, “Why
              can’t I save more?” The 50/30/20 rule is a great way to solve that
              age-old riddle and build more structure into your spending habits.
              It can make it easier to reach your financial goals, whether
              you’re saving up for a rainy day or working to pay off your debt.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
