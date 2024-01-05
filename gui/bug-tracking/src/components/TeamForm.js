import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import "./TeamForm.css";

const SERVER = "http://localhost:5001";

function TeamForm() {
  const [name, setName] = useState("");
  const { loggedInUser } = useUser();
  const { login } = useUser();

  let navigate = useNavigate();

  const teamData = {
    name: name,
    userId: loggedInUser.id,
  };

  const updateRoleData = {
    role: "MP",
  };

  const addTeam = async () => {
    try {
      const responseFromUser = await fetch(
        `${SERVER}/api/updateUser/${loggedInUser.id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateRoleData),
        }
      );

      const response = await fetch(`${SERVER}/api/newTeam`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok && responseFromUser.ok) {
        const updatedUser = await responseFromUser.json();
        console.log(updatedUser);
        login(updatedUser);
        navigate("/home");
      }
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
