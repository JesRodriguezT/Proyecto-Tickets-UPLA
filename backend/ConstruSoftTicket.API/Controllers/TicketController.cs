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
    // Esta es la validación integral que pide el manual
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState); // Si el título es muy corto, aquí rebota
    }

    _ticketService.CrearTicket(dto);
    return Ok(new { mensaje = "Ticket registrado correctamente." });
}

    
}