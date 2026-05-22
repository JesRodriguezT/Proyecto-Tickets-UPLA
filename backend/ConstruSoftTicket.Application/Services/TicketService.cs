using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConstruSoftTicket.Application.Services;

public class TicketService : ITicketService
{
    private readonly ITicketRepository _repository;

    public TicketService(ITicketRepository repository)
    {
        _repository = repository;
    }

    // Operaciones I/O de base de datos siempre deben usar async/await
    public async Task CrearTicketAsync(CreateTicketDto dto)
    {
        // La lógica de creación y validación ahora está encapsulada en la propia entidad de dominio.
        var ticket = new Ticket(dto.Titulo, dto.Descripcion);

        // Guardamos en el repositorio (Capa de Infraestructura)
        await _repository.AddAsync(ticket); 
    }

    public async Task<IEnumerable<TicketDto>> GetAllTicketsAsync()
    {
        var tickets = await _repository.GetAllAsync();

        // Mapeamos la entidad de dominio a un DTO para no exponer la entidad fuera de la capa de aplicación/dominio.
        return tickets.Select(ticket => new TicketDto
        {
            Id = ticket.Id,
            Titulo = ticket.Titulo,
            Descripcion = ticket.Descripcion,
            FechaCreacion = ticket.FechaCreacion,
            Estado = ticket.Estado
        });
    }
}