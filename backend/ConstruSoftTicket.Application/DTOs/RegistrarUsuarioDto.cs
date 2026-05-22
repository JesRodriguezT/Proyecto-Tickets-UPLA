using System.ComponentModel.DataAnnotations;

namespace ConstruSoftTicket.Application.DTOs;

public class RegistrarUsuarioDto
{
    [Required(ErrorMessage = "El nombre de usuario es obligatorio.")]
    public string Username { get; set; }

    [Required(ErrorMessage = "La contraseña es obligatoria.")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
    public string Password { get; set; }

    [Required]
    public string Rol { get; set; }
}