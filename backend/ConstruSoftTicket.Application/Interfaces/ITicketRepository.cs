using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Application.Interfaces; // Asegúrate de que termine en .Interfaces

public interface ITicketRepository
{
    void Add(Ticket ticket);
}