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

  const estilos = {
    pantalla: { fontFamily: 'Segoe UI, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f9', margin: 0 },
    bloque: { backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', padding: '35px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)' },
    titulo: { textAlign: 'center', margin: '0 0 5px 0', color: '#1a1a1a', fontSize: '24px', fontWeight: '700' },
    subtitulo: { textAlign: 'center', margin: '0 0 25px 0', color: '#777', fontSize: '14px' },
    solapas: { display: 'flex', marginBottom: '25px', borderBottom: '2px solid #eef0f3' },
    solapaBoton: (activo) => ({ flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', fontWeight: '600', color: activo ? '#0066cc' : '#777', borderBottom: activo ? '3px solid #0066cc' : 'none' }),
    campo: { marginBottom: '18px' },
    label: { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#444' },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #ccd4dc', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' },
    select: { width: '100%', padding: '10px 12px', border: '1px solid #ccd4dc', borderRadius: '5px', fontSize: '14px', backgroundColor: '#fff', boxSizing: 'border-box' },
    btnEnviar: { width: '100%', padding: '12px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
    msgOk: { padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px', fontSize: '13px', marginBottom: '15px', borderLeft: '4px solid #28a745' },
    msgErr: { padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', fontSize: '13px', marginBottom: '15px', borderLeft: '4px solid #dc3545' }
  };

  return (
    <div style={estilos.pantalla}>
      <div style={estilos.bloque}>
        <h2 style={estilos.titulo}>ConstruSoftTicket</h2>
        <p style={estilos.subtitulo}>Sistema de Reportes Técnicos</p>

        <div style={estilos.solapas}>
          <div style={estilos.solapaBoton(isLogin)} onClick={() => cambiarModo(true)}>Iniciar Sesión</div>
          <div style={estilos.solapaBoton(!isLogin)} onClick={() => cambiarModo(false)}>Registrarse</div>
        </div>

        {mensajeExito && <div style={estilos.msgOk}>{mensajeExito}</div>}
        {mensajeError && <div style={estilos.msgErr}>{mensajeError}</div>}

        <form onSubmit={handleFormulario}>
          <div style={estilos.campo}>
            <label style={estilos.label}>Nombre de Usuario</label>
            <input type="text" style={estilos.input} placeholder="Ej: jesus_admin" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div style={estilos.campo}>
            <label style={estilos.label}>Contraseña</label>
            <input type="password" style={estilos.input} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {!isLogin && (
            <div style={estilos.campo}>
              <label style={estilos.label}>Rol de Usuario</label>
              <select style={estilos.select} value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="Docente">Docente</option>
                <option value="Administrador">Administrador</option>
                <option value="Soporte Tecnico">Soporte Técnico</option>
              </select>
            </div>
          )}

          <button type="submit" style={estilos.btnEnviar}>
            {isLogin ? 'Ingresar al Sistema' : 'Crear Cuenta Nueva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;