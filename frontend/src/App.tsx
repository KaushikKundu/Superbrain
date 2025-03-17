import "./index.css"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import { BrowserRouter, Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

