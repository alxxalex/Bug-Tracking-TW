import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="button-container">
        <div className="signup-button">
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>

        <div className="login-button">
          <Link to="/login">
            <button>Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
