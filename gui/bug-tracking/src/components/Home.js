import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="signup-button">
      {/* Use Link to navigate to the SignUpForm */}
      <Link to="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  );
}

export default Home;
