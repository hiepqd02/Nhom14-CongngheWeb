import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Boards from "./Components/Pages/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import Board from "./Components/Pages/Board";
import AlertSnackBar from "./Components/AlertSnackBar";
import { useEffect } from "react";
import { loadUser } from "./Services/userService";
import Store from "./Redux/store";
import FreeRoute from "./Utils/FreeRoute";
const App = () => {
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);
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
        <Route path="/" element={
          <FreeRoute><Login /></FreeRoute>
        } />
        <Route path="/register" element={
          <FreeRoute> <Register /></FreeRoute>
        } />
      </Routes>
      <AlertSnackBar />

    </BrowserRouter>
  );
};

export default App;
