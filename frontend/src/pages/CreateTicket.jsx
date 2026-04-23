import { useState } from 'react';

export default function CreateTicket() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Datos del ticket:", { titulo, descripcion });
        alert("Formulario enviado (revisa la consola)");
    };

    return (
        <div>
            <h2>Crear Nuevo Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input 
                        type="text" 
                        value={titulo} 
                        onChange={(event) => setTitulo(event.target.value)} 
                    />
                </div>

                <div>
                    <label>Descripción</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(event) => setDescripcion(event.target.value)} 
                    />
                </div>

                <button type="submit">Registrar ticket</button>
            </form>
        </div>
    );
}