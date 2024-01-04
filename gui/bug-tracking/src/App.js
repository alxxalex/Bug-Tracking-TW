import "./App.css";
import Home from "./components/Home";
import SignUpForm from "./components/authentication/SignUpForm";
import LogInForm from "./components/authentication/LogInForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProjectForm from "./components/projectForm/NewProjectForm";
import BugForm from "./components/BugForm";
import TeamForm from "./components/TeamForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInForm />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/addProject" element={<NewProjectForm />}></Route>
          <Route path="/bugForm" element={<BugForm />}></Route>
          <Route path="/teamForm" element={<TeamForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
