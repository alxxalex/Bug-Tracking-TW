import "../Home.css";
import "./BugsForProject.css";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const SERVER = "http://localhost:5001";

function BugsForProject() {
    const [bugs, setBugs] = useState([]);
    const { projectName } = useParams();


    const fetchBugs = async () => {
        try {
            const response = await fetch(`${SERVER}/api/bugs/${encodeURIComponent(projectName)}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const bugsData = await response.json();
            setBugs(bugsData);
        } catch (error) {
            console.error("Error fetching bugs for the project:", error.message);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);


    async function updateBugStatus(id, status) {
        try {
            const response = await fetch(`${SERVER}/api/bugs/updateBugSatus`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status }),
            });

            if (response.ok) {
                const updatedBugs = bugs.map((bug) => {
                    if (bug.id === id) {
                        return { ...bug, status };
                    }
                    return bug;
                });

                setBugs(updatedBugs);

            }

        } catch (error) {

            console.error("Error:", error);
        }
    }

    async function saveCommitLinkSolvedBug(id) {
        const commitLinkSolvedBug = document.getElementById("commitLinkSolvedBug");
        const selectStatus = document.getElementById("selectStatus");
        const commitLinkBugSolved = commitLinkSolvedBug.value;
        const status = selectStatus.value;

        if (status !== 'Resolved') {
            Swal.fire({
                icon: "error",
                title: "First you need to solve the bug",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (!commitLinkBugSolved) {
            Swal.fire({
                icon: "error",
                title: "Complete the commit link",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (commitLinkBugSolved
            && status === 'Resolved') {

            try {
                const response = await fetch(`${SERVER}/api/bugs/updateBugSolvedCommitLink`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id, commitLinkBugSolved }),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Commit link has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            } catch (error) {

                console.error("Error:", error);
            }

        }
    }

    return (
        <div className="home-container">
            <div className="home">
                <Link to={`/home`}>
                    <button className="button-back">
                        <div className="button-box">
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </button>
                </Link>

                <h3>Bugs for {projectName}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Severity</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Commit Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs.map((bug, index) => (
                            <tr key={index}>
                                <td>
                                    {bug.name}
                                </td>
                                <td>
                                    {bug.severity}
                                </td>
                                <td>
                                    {bug.priority}
                                </td>
                                <td>
                                    <select id="selectStatus" className="selectStatus" value={bug.status}
                                        onChange={(e) => {
                                            updateBugStatus(bug.id,
                                                e.target.value)
                                        }}>
                                        <option value="Unsolved"> Unsolved</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </td>
                                <td>
                                    <input id="commitLinkSolvedBug" type="text"></input>
                                    <i className="gg-check" onClick={() => saveCommitLinkSolvedBug(bug.id)}></i>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BugsForProject;
