import "./App.css";
import Login from "./Components/Account/Login";
import SignUp from "./Components/Account/SignUp";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && (
        <div className="spinner flex justify-center items-center h-screen">
          <HashLoader color="#36d7b7" className="h-16" />
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
