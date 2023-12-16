import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Boards from "./Components/Pages/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Board from "./Components/Pages/Board";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={
          <ProtectedRoute>
            <Boards />
          </ProtectedRoute>} />
        <Route path="/board/:id" element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
