const API_URL = "http://localhost:5000/api/ticket"; // Verifica que sea tu puerto del backend

export async function createTicket(ticketData, token) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Cabecera de autorización con el Token JWT
        },
        body: JSON.stringify(ticketData)
    });

    // Si la respuesta es 401 (No autorizado), el token es inválido o ha expirado.
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No se pudo registrar el ticket.");
    }
    return await response.json();
}