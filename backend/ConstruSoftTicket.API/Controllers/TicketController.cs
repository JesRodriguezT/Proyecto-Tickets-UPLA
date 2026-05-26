using Microsoft.AspNetCore.Mvc;
using System;

namespace ConstruSoftTicket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        // NOTA: Si usas un servicio inyectado o tu DbContext directo, puedes mantener tu constructor aquí.

        [HttpPost]
        public IActionResult Crear([FromBody] CreateTicketDto dto)
        {
            // 1. VALIDACIÓN DE ROBUSTEZ: Verifica que el JSON cumpla con la estructura
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Los datos enviados no son válidos para el registro.",
                    errors = ModelState
                });
            }

            try
            {
                // 2. NORMALIZACIÓN EN BACKEND: Control preventivo contra campos vacíos o con puros espacios
                if (string.IsNullOrWhiteSpace(dto.Titulo) || string.IsNullOrWhiteSpace(dto.Descripcion))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "El título y la descripción son obligatorios y no pueden contener solo espacios."
                    });
                }

                // Limpieza de espacios en los extremos como doble control
                dto.Titulo = dto.Titulo.Trim();
                dto.Descripcion = dto.Descripcion.Trim();

                // =========================================================================
                // AQUÍ VA TU LÓGICA DE PERSISTENCIA (Opcional si usas repositorio/servicio)
                // Ejemplo: _ticketService.CrearTicket(dto);
                // =========================================================================

                // 3. RESPUESTA HTTP CONSISTENTE: Devuelve el objeto estructurado que React espera leer
                return Ok(new
                {
                    success = true,
                    message = "Ticket registrado correctamente."
                });
            }
            catch (Exception ex)
            {
                // 4. MANEJO ESTRUCTURADO DE ERRORES: Captura caídas del servidor o de PostgreSQL
                return StatusCode(500, new
                {
                    success = false,
                    message = "Ocurrió un error interno en el servidor al intentar registrar el ticket.",
                    detail = ex.Message
                });
            }
        }
    }

    // DTO (Data Transfer Object) para mapear correctamente la petición entrante desde React
    public class CreateTicketDto
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
    }
}