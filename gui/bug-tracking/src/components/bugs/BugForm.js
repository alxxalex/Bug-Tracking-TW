import "./BugForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useParams } from 'react-router-dom';

function BugForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
    const [commitLink, setcommitLink] = useState("");
    const [priority, setPriority] = useState("");
    const [error, setError] = useState(null);
    const { loggedInUser } = useUser();
    const { projectName } = useParams();
    let navigate = useNavigate();


    const SERVER = "http://localhost:5001";

    let bug = {
        name: name,
        description: description,
        severity: severity || 'High',
        commitLink: commitLink,
        raisedBy: loggedInUser.name,
        assignedProjectMember: "",
        priority: priority || 'High',
        projectName: projectName
    }

    async function submitBug() {
        try {
            const response = await fetch(`${SERVER}/api/newBug`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bug),
            });

            if (response.ok) {
                navigate("/home");
            } else {
                setError("Authentication failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred");
        }
    }

    return (
        <div className="bugForm-container">
            <div className="bugForm">
                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    placeholder="Enter bug name"
                    onChange={(evt) => setName(evt.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter bug description"
                    onChange={(evt) => setDescription(evt.target.value)}
                />
                <label for="severities">Severity: </label>
                <select id="severities" name="severities"
                    onChange={(evt) => setSeverity(evt.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <input
                    type="text"
                    placeholder="Enter bug commitLink"
                    onChange={(evt) => setcommitLink(evt.target.value)}
                />

                <label for="Priority: ">Priority: </label>
                <select id="priorities" name="priorities"
                    onChange={(evt) => setPriority(evt.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <div className="submitBug" >
                    <input type="button" value="Add bug" onClick={submitBug} />
                </div>
            </div>
        </div>
    );
}

export default BugForm;

