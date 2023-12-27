import "./Home.css";
import { useEffect, useState } from "react";

const SERVER = "http://localhost:5001";

function Home() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${SERVER}/api/projects`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const projectsData = await response.json();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="home">
      <button className="button">Add Project</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td className="td-button">
                <button className="button">Test</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
