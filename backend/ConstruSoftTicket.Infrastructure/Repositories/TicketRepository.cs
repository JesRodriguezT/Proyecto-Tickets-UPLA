using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Domain.Entities;
using ConstruSoftTicket.Infrastructure.Data; // Asegúrate que diga .Data

namespace ConstruSoftTicket.Infrastructure.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly AppDbContext context; // Debe decir AppDbContext

    public TicketRepository(AppDbContext context)
    {
        this.context = context;
    }

    public void Add(Ticket ticket) // Asegúrate que el método se llame Add
    {
        context.Tickets.Add(ticket);
        context.SaveChanges();
    }
}