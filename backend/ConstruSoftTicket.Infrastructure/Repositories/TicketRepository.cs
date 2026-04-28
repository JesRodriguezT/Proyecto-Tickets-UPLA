using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Domain.Entities;
using ConstruSoftTicket.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ConstruSoftTicket.Infrastructure.Repositories;

public class TicketRepository : ITicketRepository
{
    private readonly ApplicationDbContext _context;

    public TicketRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Ticket>> GetAllAsync() 
    {
        return await _context.Tickets.ToListAsync();
    }

    public async Task<Ticket> GetByIdAsync(int id) 
    {
        return await _context.Tickets.FindAsync(id);
    }

    public async Task AddAsync(Ticket ticket)
    {
        await _context.Tickets.AddAsync(ticket);
        await _context.SaveChangesAsync();
    }
}