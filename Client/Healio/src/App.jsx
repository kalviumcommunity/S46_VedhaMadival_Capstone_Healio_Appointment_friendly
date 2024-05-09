import "./App.css";
import Login from "./Components/Account/Login";
import SignUp from "./Components/Account/SignUp";
import Home from "./Components/Home";
import { Routes,Route} from "react-router-dom";

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
