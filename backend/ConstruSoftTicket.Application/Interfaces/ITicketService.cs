using ConstruSoftTicket.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConstruSoftTicket.Application.Interfaces;

public interface ITicketService
{
    Task CrearTicketAsync(CreateTicketDto dto);
    Task<IEnumerable<TicketDto>> GetAllTicketsAsync();
}