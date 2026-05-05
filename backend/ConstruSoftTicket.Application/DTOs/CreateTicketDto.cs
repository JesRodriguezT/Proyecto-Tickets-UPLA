namespace ConstruSoftTicket.Application.DTOs;

public class CreateTicketDto
{
    public string Titulo { get; set; } = string.Empty; // Debe ser Titulo, no Title
    public string Descripcion { get; set; } = string.Empty; // Debe ser Descripcion
}