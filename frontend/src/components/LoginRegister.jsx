import React, { useState } from 'react';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('Docente'); 
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const cambiarModo = (modoLogin) => {
    setIsLogin(modoLogin);
    setUsername('');
    setPassword('');
    setMensajeExito('');
    setMensajeError('');
  };

  const handleFormulario = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');

    // URL de tu API local en .NET 8
    const URL_BASE = 'http://localhost:5000/api/Auth';
    const urlEndpoint = isLogin ? `${URL_BASE}/login` : `${URL_BASE}/registrar`;

    const cuerpoPeticion = isLogin 
      ? { username, password } 
      : { username, password, rol };

    try {
      const respuesta = await fetch(urlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuerpoPeticion)
      });

      if (!respuesta.ok) {
        const datosError = await respuesta.json();
        throw new Error(datosError.mensaje || 'Error en las credenciales o procesamiento.');
      }

      if (isLogin) {
        // Si el login es correcto, guardamos el Token JWT en el navegador
        const data = await respuesta.json();
        localStorage.setItem('token_ticket', data.token || data);
        setMensajeExito('¡Ingreso exitoso al sistema! Redirigiendo...');
      } else {
        // Si el registro es correcto
        setMensajeExito('¡Usuario registrado con éxito en PostgreSQL! Ya puedes iniciar sesión.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setMensajeError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-1">ConstruSoftTicket</h2>
        <p className="text-center text-gray-500 mb-8">Sistema de Reportes Técnicos</p>

        <div className="flex border-b-2 border-gray-200 mb-6">
          <button onClick={() => cambiarModo(true)} className={`flex-1 py-3 text-center font-semibold transition-colors ${isLogin ? 'text-blue-600 border-b-3 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
            Iniciar Sesión
          </button>
          <button onClick={() => cambiarModo(false)} className={`flex-1 py-3 text-center font-semibold transition-colors ${!isLogin ? 'text-blue-600 border-b-3 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
            Registrarse
          </button>
        </div>

        {mensajeExito && <div className="p-3 mb-4 text-sm text-green-800 bg-green-100 border-l-4 border-green-500 rounded-md">{mensajeExito}</div>}
        {mensajeError && <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 border-l-4 border-red-500 rounded-md">{mensajeError}</div>}

        <form onSubmit={handleFormulario}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Ej: jesus_admin" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Rol de Usuario</label>
              <select className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="Docente">Docente</option>
                <option value="Administrador">Administrador</option>
                <option value="Soporte Tecnico">Soporte Técnico</option>
              </select>
            </div>
          )}

          <button type="submit" className="w-full py-3 mt-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300">
            {isLogin ? 'Ingresar al Sistema' : 'Crear Cuenta Nueva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;