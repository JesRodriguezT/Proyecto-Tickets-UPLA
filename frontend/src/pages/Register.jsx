import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("Usuario");
  
  // ✅ Estados independientes para cada "ojito"
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarClaveConfirm, setMostrarClaveConfirm] = useState(false);
  
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch("http://localhost:5000/api/Auth/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: username, 
          password: password, 
          rol: rol 
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al registrar en la base de datos.");
      }

      setExito(`¡Usuario ${username} creado como ${rol} con éxito!`);
      
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setError(`Fallo en el servidor: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      
      {/* ================= PANEL IZQUIERDO ================= */}
      <div 
        className="hidden md:flex md:w-[60%] relative items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/65 to-blue-800/45"></div>
        <div className="relative z-10 text-center text-white border-[3px] border-white/70 rounded-br-3xl rounded-tl-3xl p-12 backdrop-blur-sm shadow-2xl">
          <h2 className="text-2xl font-light mb-1 tracking-wide">Gestión de Accesos</h2>
          <h1 className="text-5xl font-extrabold tracking-widest drop-shadow-lg">
            CONSTRUSOFT
          </h1>
          <p className="mt-3 text-white/80 font-light tracking-wider">Configuración de nuevos perfiles de usuario</p>
        </div>
      </div>

      {/* ================= PANEL DERECHO ================= */}
      <div className="w-full md:w-[40%] flex items-center justify-center p-8 bg-white relative z-10 shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-sm">
          
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-blue-600 font-extrabold text-2xl tracking-tighter text-center">Registrar Nuevo Usuario</h2>
            <p className="text-gray-500 mt-2 text-xs tracking-wide">Asigne las credenciales y el nivel de acceso</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded shadow-sm break-words">
              {error}
            </div>
          )}
          {exito && (
            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded shadow-sm font-bold">
              {exito}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nombre de Usuario */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre de Usuario</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-gray-50 transition-all"
                placeholder="Ej. jrodriguez"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Selector de Rol */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Rol del Sistema</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-gray-50 transition-all cursor-pointer font-medium"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="Usuario">Usuario (Cliente)</option>
                <option value="Técnico">Técnico de Soporte</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-gray-50 transition-all"
                placeholder="usuario@construsoft.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Contraseña Principal */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={mostrarClave ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-gray-50 transition-all font-sans"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setMostrarClave(!mostrarClave)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {mostrarClave ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña (Ahora con ojito) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={mostrarClaveConfirm ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-gray-50 transition-all font-sans"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setMostrarClaveConfirm(!mostrarClaveConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {mostrarClaveConfirm ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botón de Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98]"
              >
                {loading ? "Registrando..." : "Registrar Usuario"}
              </button>
            </div>

          </form>

          {/* Volver al Login */}
          <div className="mt-6 text-center border-t pt-4 border-gray-100">
            <span className="text-[13px] text-gray-600">
              ¿Desea volver atrás?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Regresar al Login
              </Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}