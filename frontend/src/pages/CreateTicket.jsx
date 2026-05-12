import { useState } from "react";
import InputField from "../components/InputField";
import FormMessage from "../components/FormMessage";
import { createTicket } from "../services/ticketService";

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: ""
  });

  // NUEVO: Estado para capturar errores específicos de cada campo
  const [errors, setErrors] = useState({});
  
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiamos el error del campo cuando el usuario vuelve a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // NUEVO: Validación Integral (Frontend) coincidente con el Backend
  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    } else if (formData.titulo.trim().length < 5) {
      newErrors.titulo = "El título debe tener al menos 5 caracteres.";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, devuelve true
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ahora usamos la validación detallada
    if (!validateForm()) {
      setMessageType("error");
      setMessage("Por favor, corrija los errores en el formulario.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      setMessageType("");

      const result = await createTicket({
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim()
      });

      setMessageType("success");
      setMessage(result.mensaje || "Ticket registrado correctamente.");
      setFormData({ titulo: "", descripcion: "" });
      setErrors({}); // Limpiar errores tras éxito

    } catch (error) {
      setMessageType("error");
      setMessage("No se pudo registrar el ticket. Verifique los requisitos mínimos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
      <h1>Registro de Ticket v2.0</h1>
      <p>Aplique los controles de validación para garantizar la integridad de los datos.</p>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Título del ticket"
          name="titulo"
          value={formData.titulo}
          placeholder="Mínimo 5 caracteres"
          onChange={handleChange}
          error={errors.titulo} // Pasamos el error al componente
        />

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="descripcion" style={{ fontWeight: "bold", display: "block" }}>
            Descripción de la incidencia
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            placeholder="Mínimo 10 caracteres"
            rows="5"
            onChange={handleChange}
            style={{ 
              width: "100%", 
              display: "block",
              border: errors.descripcion ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px"
            }}
          />
          {errors.descripcion && (
            <span style={{ color: "red", fontSize: "12px" }}>{errors.descripcion}</span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "10px" }}>
          {isSubmitting ? "Procesando..." : "Registrar ticket"}
        </button>
      </form>

      <FormMessage type={messageType} message={message} />
    </main>
  );
}