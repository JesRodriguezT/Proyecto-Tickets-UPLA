using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Application.Services;

public class TicketService : ITicketService
{
    private readonly ITicketRepository _repository;

    public TicketService(ITicketRepository repository)
    {
        _repository = repository;
    }

    public void CrearTicket(CreateTicketDto dto)
    {
        // Creamos la entidad del dominio a partir del DTO
        var ticket = new Ticket
        {
            Id = Guid.NewGuid(), // Genera un identificador único
            Titulo = dto.Titulo, // Coincide con la propiedad del DTO
            Descripcion = dto.Descripcion, // Coincide con la propiedad del DTO
            FechaCreacion = DateTime.UtcNow,
            Estado = "Abierto" // Estado inicial por defecto
        };

        // Guardamos en el repositorio (Capa de Infraestructura)
        _repository.Add(ticket);
    }
}