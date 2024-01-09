import "./Home.css";
import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const SERVER = "http://localhost:5001";

function Home() {
  const [projects, setProjects] = useState([]);
  const { loggedInUser } = useUser();
  const { login } = useUser();

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${SERVER}/api/projects`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const projectsData = await response.json();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const isStudent = loggedInUser && loggedInUser.role === "Student";
  const isMP = loggedInUser && loggedInUser.role === "MP";
  const isTester = loggedInUser && loggedInUser.role === "Tester";
  let navigate = useNavigate();

  const updateRoleData = {
    role: "Tester",
  };

  const becomeTester = async () => {
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

      if (responseFromUser.ok) {
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

    <div className="home-container">
      <div className="home">
        <p>
          Welcome {loggedInUser.name}, {loggedInUser.role}
        </p>
        {(isStudent || isMP) && (
          <Link to="/addProject">
            <button className="button">Add Project</button>
          </Link>
        )}
        {isStudent && (
          <Link to="/teamForm">
            <button className="button">Add Team</button>
          </Link>
        )}
        {isStudent && (
          <button className="button" onClick={() => becomeTester()}>
            Become a Tester
          </button>
        )}
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
                  {isTester && (
                    <Link to={`/bugForm/${encodeURIComponent(project.name)}`}>
                      <button className="button">Add a bug</button>
                    </Link>
                  )}

                  {isMP && (
                    <Link to={`/bugs/${project.name}`}>
                      <button className="button">See Bugs</button>
                    </Link>
                  )}

                  {isMP && (
                    <Link to={`/editProject/${project.id}`}>
                      <i className="fa fa-pencil"></i>
                    </Link>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
