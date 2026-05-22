using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Application.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

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
    [Authorize] 
    public async Task<IActionResult> Crear([FromBody] CreateTicketDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _ticketService.CrearTicketAsync(dto);
        return Ok(new { mensaje = "Ticket registrado correctamente." });
    }

    [HttpGet]
    [Authorize] 
    public async Task<IActionResult> GetAll()
    {
        var tickets = await _ticketService.GetAllTicketsAsync();
        return Ok(tickets);
    }
}
