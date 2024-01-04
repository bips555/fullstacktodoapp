import Home from "./components/Home.component.jsx";
import Login from "./components/Login.component.jsx";
import Register from "./components/Register.component.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
