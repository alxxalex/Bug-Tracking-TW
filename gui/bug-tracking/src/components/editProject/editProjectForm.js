import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editProjectForm.css";

const SERVER = "http://localhost:5001";

function EditProjectForm() {
  const [name, setName] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const { projectId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${SERVER}/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const projectData = await response.json();
        setName(projectData.name);
        setRepositoryLink(projectData.repositoryLink);
      } catch (error) {
        console.error("Error fetching project details:", error.message);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const projectData = {
    name: name,
    repositoryLink: repositoryLink,
  };

  const submitProject = async () => {
    try {
      const response = await fetch(`${SERVER}/api/updateProject/${projectId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        console.log(updatedProject);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="editProjectForm">
        <input
          type="text"
          placeholder="Enter project name"
          value={name} // Use 'value' instead of 'onChange' to set initial value
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          type="text"
          placeholder="Enter repository link"
          value={repositoryLink} // Use 'value' instead of 'onChange' to set initial value
          onChange={(evt) => setRepositoryLink(evt.target.value)}
        />
        <div className="submitProject">
          <input
            className="submitButton"
            type="button"
            value="Update project"
            onClick={submitProject}
          />
        </div>
      </div>
    </div>
  );
}

export default EditProjectForm;
