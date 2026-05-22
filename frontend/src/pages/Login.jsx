import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as loginService, registrar as registrarService } from "../services/authService";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Docente");
  
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const cambiarPestana = (modoLogin) => {
    setIsLogin(modoLogin);
    setUsername("");
    setPassword("");
    setRol("Docente");
    setError("");
    setExito("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    try {
      setLoading(true);
      if (isLogin) {
        const res = await loginService(username, password);
        login(res.token, username);
        setExito("¡Autenticación exitosa! Redirigiendo...");
        setTimeout(() => { navigate("/tickets"); }, 1000);
      } else {
        await registrarService(username, password, rol);
        setExito("¡Usuario registrado con éxito en PostgreSQL!");
        setTimeout(() => { cambiarPestana(true); }, 2000);
      }
    } catch (err) {
      setError(err.message || "Error en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "25px", border: "1px solid #444", borderRadius: "8px", backgroundColor: "#1e1e1e", color: "#fff" }}>
      <h2 style={{ textAlign: "center", margin: "0 0 5px 0" }}>Control de Acceso - ConstruSoft</h2>
      
      <div style={{ display: "flex", marginBottom: "20px", borderBottom: "2px solid #333" }}>
        <div style={{ flex: 1, textAlign: "center", padding: "12px", cursor: "pointer", fontWeight: "bold", color: isLogin ? "#0066cc" : "#888", borderBottom: isLogin ? "3px solid #0066cc" : "none" }} onClick={() => cambiarPestana(true)}>Iniciar Sesión</div>
        <div style={{ flex: 1, textAlign: "center", padding: "12px", cursor: "pointer", fontWeight: "bold", color: !isLogin ? "#0066cc" : "#888", borderBottom: !isLogin ? "3px solid #0066cc" : "none" }} onClick={() => cambiarPestana(false)}>Registrarse</div>
      </div>

      {error && <FormMessage type="error" message={error} />}
      {exito && <div style={{ padding: "10px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "5px", marginBottom: "15px" }}>{exito}</div>}

      <form onSubmit={handleSubmit}>
        <InputField label="Usuario de Red" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField label="Contraseña" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {!isLogin && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600" }}>Rol</label>
            <select style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#333", color: "#fff" }} value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="Docente">Docente</option>
              <option value="Administrador">Administrador</option>
              <option value="Soporte Tecnico">Soporte Técnico</option>
            </select>
          </div>
        )}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
          {loading ? "Procesando..." : (isLogin ? "Ingresar al Sistema" : "Registrar Cuenta Nueva")}
        </button>
      </form>
    </div>
  );
}