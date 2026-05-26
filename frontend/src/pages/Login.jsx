import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as loginService } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recordar, setRecordar] = useState(true);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await loginService(username, password);
      login(res.token, username);
      navigate("/tickets");
    } catch (err) {
      setError(err.message || "Credenciales incorrectas.");
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/60 to-blue-800/40"></div>
        <div className="relative z-10 text-center text-white border-[3px] border-white/70 rounded-br-3xl rounded-tl-3xl p-12 backdrop-blur-sm shadow-2xl">
          <h2 className="text-2xl font-light mb-1 tracking-wide">Bienvenido al Portal de</h2>
          <h1 className="text-5xl font-extrabold tracking-widest drop-shadow-lg">
            CONSTRUSOFT
          </h1>
          <p className="mt-3 text-white/80 font-light tracking-wider">Gestión Integral de Tickets de Soporte</p>
        </div>
      </div>

      {/* ================= PANEL DERECHO ================= */}
      <div className="w-full md:w-[40%] flex items-center justify-center p-8 bg-white relative z-10 shadow-[-15px_0_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-sm">
          
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-blue-600 font-extrabold text-3xl tracking-tighter">Constru<span className="text-gray-800">Soft</span></h2>
            <p className="text-gray-500 mt-5 text-[13px] tracking-wide">Por favor ingrese sus credenciales de red</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded shadow-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Usuario de Red</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all shadow-sm"
                placeholder="Ej. jrodriguez"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={mostrarClave ? "text" : "password"}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-sans transition-all shadow-sm"
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="recordar"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-all"
                checked={recordar}
                onChange={() => setRecordar(!recordar)}
              />
              <label htmlFor="recordar" className="ml-2.5 block text-[13px] text-gray-700 cursor-pointer">
                Recordar credenciales
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98]"
              >
                {loading ? "Autenticando..." : "Iniciar Sesión"}
              </button>
            </div>

          </form>

          <div className="mt-8 text-center">
            <span className="text-[13px] text-gray-600">
              ¿No tienes una cuenta en ConstruSoft?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Regístrate aquí
              </Link>
            </span>
          </div>

          <div className="mt-16 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} ConstruSoft S.A.C. - Todos los derechos reservados.
          </div>

        </div>
      </div>
    </div>
  );
} 