import "./index.css"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Routes,Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import  SignUp  from "./pages/SignUp"
import SignIn from "./pages/Signin"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
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

