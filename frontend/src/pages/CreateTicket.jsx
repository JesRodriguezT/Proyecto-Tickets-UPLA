import { useState } from "react";
import InputField from "../components/InputField";

export default function CreateTicket() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // Acción directa para el botón de cerrar sesión
  const handleLogoutClick = () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log("Sesión destruida.");
    window.location.href = "/login"; // Redirección forzada por navegador
  };

  // Acción al presionar el botón de registrar ticket
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Mostramos el mensaje de éxito en verde arriba del formulario
    setMensajeExito("¡Ticket creado con éxito! Registrado en el sistema.");
    
    // 2. Reseteamos los campos
    setTitulo("");
    setDescripcion("");

    // 3. Desvanecer la alerta después de 4 segundos
    setTimeout(() => {
      setMensajeExito("");
    }, 4000);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "25px", border: "1px solid #444", borderRadius: "8px", backgroundColor: "#1e1e1e", color: "#fff" }}>
      
      {/* Cabecera con título y botón de Logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "15px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Registro de Ticket v2.0</h2>
          <p style={{ fontSize: "13px", color: "#aaa", margin: "5px 0 0 0" }}>Integridad de reportes de incidencias técnicas.</p>
        </div>
        
        <button 
          type="button" 
          onClick={handleLogoutClick}
          style={{ padding: "10px 16px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Cuadro de Alerta Verde */}
      {mensajeExito && (
        <div style={{ padding: "12px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "5px", marginBottom: "20px", fontSize: "14px", fontWeight: "600", borderLeft: "5px solid #28a745" }}>
          {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Título del ticket"
          name="titulo"
          placeholder="Mínimo 5 caracteres"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>Descripción de la incidencia</label>
          <textarea
            style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #444", backgroundColor: "#333", color: "#fff", fontSize: "14px", minHeight: "120px", boxSizing: "border-box" }}
            placeholder="Escriba detalladamente el problema aquí..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "5px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}>
          Boleto de registro
        </button>
      </form>
    </div>
  );
}