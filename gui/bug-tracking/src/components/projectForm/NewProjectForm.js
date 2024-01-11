import { useNavigate } from "react-router-dom";
import "./NewProjectForm.css";
import { useState } from "react";
import { useUser } from "../context/UserContext";

const SERVER = "http://localhost:5001";

function NewProjectForm() {
  const [name, setName] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const { loggedInUser } = useUser();
  const { login } = useUser();

  const projectData = {
    name: name,
    repositoryLink: repositoryLink,
  };

  const updateRoleData = {
    role: "MP",
  };

  let navigate = useNavigate();

  const submitProject = async () => {
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

      const response = await fetch(`${SERVER}/api/newProject/${loggedInUser.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
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
  };
  return (
    <div className="container">
      <div className="addProjectForm">
        <input
          type="text"
          placeholder="Enter project name"
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          type="text"
          placeholder="Enter repository link"
          onChange={(evt) => setRepositoryLink(evt.target.value)}
        />
        <div className="submitProject">
          <input
            className="submitButton"
            type="button"
            value="Add project"
            onClick={submitProject}
          />
        </div>
      </div>
    </div>
  );
}

export default NewProjectForm;
