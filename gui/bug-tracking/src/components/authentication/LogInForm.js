import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogInForm.css";

const SERVER = "http://localhost:5001";

function LogInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const userData = {
    email: email,
    password: password,
  };

  const handleClick = async () => {
    try {
      const response = await fetch(`${SERVER}/api/authenticate`, {
        method: "POST",
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
    <div className="login-container">
      <div className="login-form">
        {error && <div className="error-message">{error}</div>}

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
        <div className="login">
          <input type="button" value="Log in" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default LogInForm;