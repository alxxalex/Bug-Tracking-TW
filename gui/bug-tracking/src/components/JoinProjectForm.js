import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import "./JoinProjectForm.css";

const SERVER = "http://localhost:5001";

function JoinProjectForm() {
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

  const joinProject = async () => {
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
        
      //fetch register user in the proejct 
      // const response = await fetch(`${SERVER}/api/newTeam`, {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(teamData),
      // });

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
      <div className="joinProjectForm">
        <input
          type="text"
          placeholder="Enter project name"
          onChange={(evt) => setName(evt.target.value)}
        />

        <div className="submitTeam">
          <input
            className="submitButton"
            type="button"
            value="Join Project"
            onClick={joinProject}
          />
        </div>
      </div>
    </div>
  );
}

export default JoinProjectForm;
