import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Tickets() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  // Traemos la función de logout y el token de tu contexto
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    try {
      setLoading(true);
      
      // Llamada directa a tu backend en .NET (ajusta el puerto si es distinto a 5000)
      const response = await fetch("http://localhost:5000/api/Ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descripcion }),
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar el ticket. Verifica el servidor.");
      }

      setExito("¡Ticket registrado correctamente!");
      setTitulo("");
      setDescripcion("");
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => setExito(""), 3000);

    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* ================= BARRA DE NAVEGACIÓN SUPERIOR ================= */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          {/* Logo Icono */}
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold italic shadow-md">
            CS
          </div>
          <h1 className="text-xl font-extrabold text-blue-600 tracking-tight">
            Constru<span className="text-gray-800">Soft</span>
          </h1>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors border border-red-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </button>
      </nav>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-grow flex items-center justify-center p-6">
        
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* PANEL IZQUIERDO: Información */}
          <div className="md:w-5/12 bg-blue-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 tracking-wide">Registro de Incidencias</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Ingrese los detalles del problema técnico. Nuestro equipo de soporte evaluará el requerimiento a la brevedad.
              </p>
              
              <ul className="space-y-4 text-sm text-blue-200">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Sea claro y conciso en el título.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Detalle el área o laboratorio afectado.</span>
                </li>
              </ul>
            </div>
            
            <div className="relative z-10 mt-12 pt-6 border-t border-blue-700/50">
              <p className="text-xs text-blue-300">Soporte Técnico ConstruSoft</p>
            </div>
          </div>

          {/* PANEL DERECHO: Formulario */}
          <div className="md:w-7/12 p-10 bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
              Detalles del Ticket
            </h3>

            {/* Alertas */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded shadow-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
              </div>
            )}
            {exito && (
              <div className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded shadow-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {exito}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Título */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Título de la Incidencia *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-gray-50 focus:bg-white"
                  placeholder="Ej: Fallo de conexión en servidor principal"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              {/* Campo Descripción */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción Detallada *</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-gray-50 focus:bg-white resize-none"
                  rows="5"
                  placeholder="Describa el problema, mensajes de error, o pasos para reproducirlo..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                ></textarea>
                <p className="text-right text-xs text-gray-400 mt-1">Sea lo más específico posible</p>
              </div>

              {/* Botón Guardar */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      Registrar Ticket
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}