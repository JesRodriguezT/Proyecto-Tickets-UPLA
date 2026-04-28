using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Application.Interfaces
{
    public interface ITicketService
    {
        /// <summary>
        /// Obtiene la lista de todos los tickets registrados.
        /// </summary>
        Task<IEnumerable<Ticket>> GetAllTicketsAsync();

        /// <summary>
        /// Crea un nuevo ticket a partir de los datos recibidos del frontend (DTO).
        /// </summary>
        /// <param name="dto">Objeto con el título y descripción del ticket.</param>
        Task CreateTicketAsync(CreateTicketDto dto);
    }
}