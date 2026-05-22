const API_URL = "http://localhost:5000/api/Auth"; 

// 1. Servicio para Iniciar Sesión (Login)
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Credenciales incorrectas.");
  }

  return data;
};

// 2. Servicio para Registrar un Usuario Nuevo
export const registrar = async (username, password, rol) => {
  const response = await fetch(`${API_URL}/registrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, rol }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "Error al registrar el usuario.");
  }

  return data;
};