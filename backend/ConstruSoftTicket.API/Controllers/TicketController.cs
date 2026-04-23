using Microsoft.AspNetCore.Mvc;
using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Application.Interfaces;

namespace ConstruSoftTicket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpPost]
        public IActionResult Crear([FromBody] CreateTicketDto dto)
        {
            _ticketService.CreateTicket(dto);
            return Ok(new { mensaje = "Ticket registrado correctamente" });
        }
    }
}