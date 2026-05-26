import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import CreateTicket from "./pages/CreateTicket";
import Register from "./pages/Register"; // <-- 1. IMPORTAMOS EL NUEVO COMPONENTE

// Componente Guardián: Verifica si el Token JWT existe
function RutaProtegida({ children }) {
  const { token } = useContext(AuthContext);
  
  // Si no hay token guardado en el contexto, redirige de inmediato al Login
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Rutas Públicas: Cualquiera puede ver el Login y el Registro */}
          <Route path="/login" element={<Login />} />
          
          {/* ========== 2. AGREGAMOS LA RUTA DE REGISTRO ========== */}
          <Route path="/register" element={<Register />} />

          {/* Rutas Privadas: Protegidas con el Guardián de Token */}
          <Route 
            path="/tickets" 
            element={
              <RutaProtegida>
                <CreateTicket />
              </RutaProtegida>
            } 
          />

          {/* Redirección por defecto: Si entran a la raíz o rutas inexistentes, van al Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}