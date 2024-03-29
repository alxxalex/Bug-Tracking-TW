import "./Home.css";
import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const SERVER = "http://localhost:5001";

function Home() {
  const [projects, setProjects] = useState([]);
  const { loggedInUser } = useUser();
  const { login } = useUser();
  const { logout } = useUser();

  const isStudent = loggedInUser && loggedInUser.role === "Student";
  const isMP = loggedInUser && loggedInUser.role === "MP";
  const isTester = loggedInUser && loggedInUser.role === "Tester";
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateRoleData = {
    role: "Tester",
  };

  const fetchAllProjects = async () => {
    try {
      const response = await fetch(`${SERVER}/api/projects`);

      if (response.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const fetchProjectsForMp = async () => {
    console.log("Fetching projects for: " + loggedInUser.name);
    try {
      const response = await fetch(
        `${SERVER}/api/projects/user/${loggedInUser.id}`
      );
      if (response.ok) {
        const projectsForMpData = await response.json();
        setProjects(projectsForMpData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    if (isTester || isStudent) {
      fetchAllProjects();
    } else {
      fetchProjectsForMp();
    }
  });

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
        login(updatedUser);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/home");
  };

  async function joinProject(projectId) {
    const responseFromUser = await fetch(
      `${SERVER}/api/updateUser/${loggedInUser.id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "MP",
        }),
      }
    );

    if (responseFromUser.ok) {
      const updatedUser = await responseFromUser.json();
      login(updatedUser);

      const responseJoinProject = await fetch(
        `${SERVER}/api/joinProject/${updatedUser.id}/${projectId}`,
        {
          method: "POST",
        }
      );

      if (responseJoinProject.ok) {
        console.log("Successfully joined the project");
      } else {
        console.error("Failed to join the project");
      }
    } else {
      console.error("Failed to update user role");
    }
  }

  return (
    <div className="home-container">
      <i id="logOut" className="fa fa-sign-out" onClick={handleLogout}></i>
      <div className="home">
        <p>
          Welcome {loggedInUser.name}, {loggedInUser.role}
        </p>
        {(isStudent || isMP) && (
          <Link to={`/addProject/${loggedInUser.id}`}>
            <button className="button">Add Project</button>
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
                    <Link to={`/bugForm/${encodeURIComponent(project.id)}`}>
                      <button className="button">Add a bug</button>
                    </Link>
                  )}

                  {isMP && (
                    <Link to={`/bugs/${project.id}`}>
                      <button className="button">See Bugs</button>
                    </Link>
                  )}
                  {isStudent && (
                    <button
                      className="button"
                      onClick={() => {
                        joinProject(project.id);
                      }}
                    >
                      Join project
                    </button>
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
