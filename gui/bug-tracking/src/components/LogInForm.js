import { useState } from "react";

function LogInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form">
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
        <input type="button" value="add" />
      </div>
    </div>
  );
}

export default LogInForm;
