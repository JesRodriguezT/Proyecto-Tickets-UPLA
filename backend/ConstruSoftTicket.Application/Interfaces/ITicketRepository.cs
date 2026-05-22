using ConstruSoftTicket.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConstruSoftTicket.Application.Interfaces; // Asegúrate de que termine en .Interfaces

public interface ITicketRepository
{
    Task<Ticket> GetByIdAsync(int id);
    Task<IEnumerable<Ticket>> GetAllAsync();
    Task AddAsync(Ticket ticket);
    Task UpdateAsync(Ticket ticket);
    Task DeleteAsync(int id);
}