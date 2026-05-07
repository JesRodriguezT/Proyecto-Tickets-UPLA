import { useState } from "react";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { createTicket } from "../services/ticketService";

export default function CreateTicket() {
  // Estado para capturar los datos del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: ""
  });

  // Estados para la retroalimentación al usuario
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validación básica: que no sean solo espacios en blanco
  const isFormValid = () => {
    return (
      formData.titulo.trim().length > 0 &&
      formData.descripcion.trim().length > 0
    );
  };

  // Manejador del envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificación antes de enviar a la API
    if (!isFormValid()) {
      setMessageType("error");
      setMessage("Debe completar el título y la descripción del ticket.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      setMessageType("");

      // Llamada al servicio centralizado[cite: 1]
      const result = await createTicket({
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim()
      });

      setMessageType("success");
      setMessage(result.mensaje || "Ticket registrado correctamente.");
      
      // Limpiar formulario tras éxito[cite: 1]
      setFormData({ titulo: "", descripcion: "" });

    } catch (error) {
      setMessageType("error");
      setMessage("No se pudo registrar el ticket. Revise la conexión con la API.");
      console.error("Error al registrar ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Registro de Ticket</h1>
      <p>
        Complete la información básica de la incidencia técnica. Los datos
        ingresados deben ser claros para facilitar su atención posterior.[cite: 1]
      </p>

      <form onSubmit={handleSubmit}>
        {/* Uso del componente reutilizable InputField[cite: 1] */}
        <InputField
          label="Título del ticket"
          name="titulo"
          value={formData.titulo}
          placeholder="Ejemplo: PC no enciende"
          required={true}
          onChange={handleChange}
        />

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="descripcion">Descripción de la incidencia</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            placeholder="Describa brevemente el problema encontrado"
            required
            rows="5"
            onChange={handleChange}
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrar ticket"}
        </button>
      </form>

      {/* Uso del componente reutilizable FormMessage[cite: 1] */}
      <FormMessage type={messageType} message={message} />
    </main>
  );
}