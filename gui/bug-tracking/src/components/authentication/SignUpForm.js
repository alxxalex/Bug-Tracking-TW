import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const SERVER = "http://localhost:5001";

function SignUpForm(_props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const userData = {
    name: name,
    email: email,
    password: password,
  };
  let navigate = useNavigate();
  const addUser = async () => {
    try {
      const response = await fetch(`${SERVER}/api/newUser`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        setError("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        {error && <div className="error-message">{error}</div>}

        <div>
          <div className="name">
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(evt) => setName(evt.target.value)}
            />
          </div>
          <div className="email">
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="submit">
            <input type="button" value="Submit" onClick={addUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
