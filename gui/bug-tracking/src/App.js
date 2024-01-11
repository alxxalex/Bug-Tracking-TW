import "./App.css";
import Home from "./components/Home";
import SignUpForm from "./components/authentication/SignUpForm";
import LogInForm from "./components/authentication/LogInForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProjectForm from "./components/projectForm/NewProjectForm";
import BugForm from "./components/bugs/BugForm";
import EditProjectForm from "./components/editProject/editProjectForm";
import BugsForProject from "./components/bugs/BugsForProject";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInForm />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/addProject/:userId" element={<NewProjectForm />}></Route>
          <Route path="/bugForm/:projectName" element={<BugForm />}></Route>
          <Route
            path="/editProject/:projectId"
            element={<EditProjectForm />}
          ></Route>
          <Route path="/bugs/:projectName" element={< BugsForProject />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
