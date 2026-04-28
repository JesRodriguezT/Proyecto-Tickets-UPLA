using ConstruSoftTicket.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConstruSoftTicket.Application.Interfaces
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllAsync();
        Task<Ticket> GetByIdAsync(int id);
        Task AddAsync(Ticket ticket);
    }
}