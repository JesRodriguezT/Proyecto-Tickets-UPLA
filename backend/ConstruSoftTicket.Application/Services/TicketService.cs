using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Application.Interfaces; // <-- ESTA LÍNEA QUITA EL ROJO DE ITicketRepository
using ConstruSoftTicket.Domain.Entities;         // <-- ESTA LÍNEA QUITA EL ROJO DE Ticket
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConstruSoftTicket.Application.Services;

public class TicketService : ITicketService
{
    private readonly ITicketRepository _ticketRepository;

    public TicketService(ITicketRepository ticketRepository)
    {
        _ticketRepository = ticketRepository;
    }

    public async Task<IEnumerable<Ticket>> GetAllTicketsAsync()
    {
        return await _ticketRepository.GetAllAsync();
    }

    public async Task CreateTicketAsync(CreateTicketDto dto)
    {
        var ticket = new Ticket 
        { 
            Title = dto.Title, 
            Description = dto.Description,
            Status = "Open",
            CreatedAt = DateTime.UtcNow
        };
        
        await _ticketRepository.AddAsync(ticket);
    }
}