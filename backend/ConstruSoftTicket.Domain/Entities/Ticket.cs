namespace ConstruSoftTicket.Domain.Entities;

public class Ticket
{
    public Guid Id { get; set; } // Cambia int por Guid
    public string Titulo { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; }
    public string Estado { get; set; } = "Abierto";
}