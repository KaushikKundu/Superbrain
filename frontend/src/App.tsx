import "./index.css"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Routes,Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Auth from "./pages/Auth"
export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>}></Route>
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

