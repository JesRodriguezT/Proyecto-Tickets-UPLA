using ConstruSoftTicket.Application.DTOs;
using ConstruSoftTicket.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ConstruSoftTicket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    // Usamos el estándar de C# con guion bajo (_) para variables privadas
    private readonly ITicketService _ticketService;

    public TicketController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpPost]
    public async Task<IActionResult> Crear([FromBody] CreateTicketDto dto)
    {
        // Ahora sí coincide con la variable declarada arriba
        await _ticketService.CreateTicketAsync(dto);
        
        return Ok(new { mensaje = "Ticket registrado correctamente." });
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var tickets = await _ticketService.GetAllTicketsAsync();
        return Ok(tickets);
    }
}