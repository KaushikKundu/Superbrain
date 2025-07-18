import "./index.css"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import { BrowserRouter, Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

