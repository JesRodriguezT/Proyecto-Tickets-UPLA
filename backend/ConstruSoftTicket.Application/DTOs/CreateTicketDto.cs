using System.ComponentModel.DataAnnotations; 

namespace ConstruSoftTicket.Application.DTOs;

public class CreateTicketDto
{
    [Required(ErrorMessage = "El título es obligatorio.")]
    [MinLength(5, ErrorMessage = "El título debe tener al menos 5 caracteres.")]
    [MaxLength(100, ErrorMessage = "El título no puede superar los 100 caracteres.")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "La descripción es obligatoria.")]
    [MinLength(10, ErrorMessage = "La descripción debe tener al menos 10 caracteres.")]
    [MaxLength(500, ErrorMessage = "La descripción no puede superar los 500 caracteres.")]
    public string Descripcion { get; set; } = string.Empty;
}