import "./App.css";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Home /> */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
