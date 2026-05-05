using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ConstruSoftTicket.API.Controllers;

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
        // Cambiado a CrearTicket (sin await porque es void)
        _ticketService.CrearTicket(dto); 
        
        return Ok(new { mensaje = "Ticket registrado correctamente." });
    }

    // El método Listar se comenta o elimina temporalmente 
    // porque tu interfaz ITicketService aún no tiene definido "Listar"
    /*
    [HttpGet]
    public IActionResult Listar()
    {
        // var tickets = _ticketService.ListarTickets(); 
        // return Ok(tickets);
        return Ok();
    }
    */
}