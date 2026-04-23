using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Application.Services;
using ConstruSoftTicket.Infrastructure.Persistence; // Necesario para ApplicationDbContext
using Microsoft.EntityFrameworkCore;                // Necesario para UseNpgsql

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURACIÓN DE SERVICIOS
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. INYECCIÓN DE DEPENDENCIAS (Tu lógica de negocio)
builder.Services.AddScoped<ITicketService, TicketService>();

// 3. CONFIGURACIÓN DE LA BASE DE DATOS (Lo que faltaba implementar)
// Esto lee la conexión desde appsettings.json
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// 4. CONFIGURACIÓN DEL PIPELINE (Middleware)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();