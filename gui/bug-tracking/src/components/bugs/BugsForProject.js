import "../Home.css";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

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

    return (
        <div className="home-container">
            <div className="home">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugs.map((bug, index) => (
                            <tr key={index}>
                                <td className="td-button">
                                    {bug.name}
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
