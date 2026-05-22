using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System;
using ConstruSoftTicket.Infrastructure.Data;
using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Application.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURACIÓN DE CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Conexión a la Base de Datos en PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Inyección de Dependencias
builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<AppDbContext>());
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ConstruSoftTicket API", Version = "v1" });
});

var app = builder.Build();

// 4. CONFIGURACIÓN DE ENTORNO (Aquí estaba el error corregido usando 'app')
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ConstruSoftTicket API V1");
    });
}

// Activación de políticas
app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();

// 5. Verificación automática de la tabla al iniciar
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.EnsureCreated();
        Console.WriteLine("--> Base de datos verificada: Tabla 'Usuarios' lista en pgAdmin.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"--> Alerta de conexión: {ex.Message}");
    }
}

app.Run();