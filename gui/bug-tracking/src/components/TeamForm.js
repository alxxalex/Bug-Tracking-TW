import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import "./TeamForm.css";

const SERVER = "http://localhost:5001";

function TeamForm() {
  const [name, setName] = useState("");
  const { loggedInUser } = useUser();

  let navigate = useNavigate();

  const teamData = {
    name: name,
    userId: loggedInUser.id,
  };

  const addTeam = async () => {
    try {
      await fetch(`${SERVER}/api/newTeam`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="addTeamForm">
        <input
          type="text"
          placeholder="Enter team name"
          onChange={(evt) => setName(evt.target.value)}
        />

        <div className="submitTeam">
          <input
            className="submitButton"
            type="button"
            value="Add team"
            onClick={addTeam}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamForm;
