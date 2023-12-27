import { useNavigate } from 'react-router-dom';
import './NewProjectForm.css'
import { useState } from "react";

const SERVER = "http://localhost:5001";

function NewProjectForm() {
    const [name, setName] = useState("")
    const [repositoryLink, setRepositoryLink] = useState("")

    const projectData = {
        name: name,
        repositoryLink: repositoryLink
    }

    let navigate = useNavigate();

    const submitProject = async () => {
        try {
            const response = await fetch(`${SERVER}/api/newProject`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                navigate("/home");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
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
                    <input className='submitButton' type="button" value="Add project"
                        onClick={submitProject}
                    />
                </div>
            </div>
        </div>
    );
}

export default NewProjectForm;