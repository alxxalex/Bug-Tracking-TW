import "./App.css";
import Home from "./components/Home";
import SignUpForm from "./components/authentication/SignUpForm";
import LogInForm from "./components/authentication/LogInForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInForm />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
