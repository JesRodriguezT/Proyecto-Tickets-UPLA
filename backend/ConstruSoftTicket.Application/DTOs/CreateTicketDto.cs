using System.ComponentModel.DataAnnotations;

namespace ConstruSoftTicket.Application.DTOs;

public class CreateTicketDto
{
    [Required(ErrorMessage = "El título es obligatorio.")]
    [StringLength(100, MinimumLength = 5, ErrorMessage = "El título debe tener entre 5 y 100 caracteres.")]
    public string Titulo { get; set; }

    [Required(ErrorMessage = "La descripción es obligatoria.")]
    [StringLength(1000, MinimumLength = 10, ErrorMessage = "La descripción debe tener entre 10 y 1000 caracteres.")]
    public string Descripcion { get; set; }
}