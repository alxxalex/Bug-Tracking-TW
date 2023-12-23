import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = "http://localhost:5001";

function SignUpForm(_props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    name: name,
    email: email,
    password: password,
  };
  let navigate = useNavigate();
  const addUser = async () => {
    await fetch(`${SERVER}/api/newUser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    navigate("/");
  };

  return (
    <div className="signup-form">
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
          <input type="button" value="submit" onClick={addUser} />
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
