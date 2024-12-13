import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SingUp from "./pages/SingUp/SingUp";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singUp" element={<SingUp />} />
    </Routes>
  </Router>
);

function App() {
  return <div>{routes}</div>;
}

export default App;
