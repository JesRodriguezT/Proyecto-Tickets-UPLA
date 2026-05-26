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

// 1. Configuración de CORS (Permisos para React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Conexión a la Base de Datos PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Inyección de Dependencias
builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<AppDbContext>());
builder.Services.AddScoped<IAuthService, AuthService>();

// 4. Configuración de Controladores y SWAGGER (Aquí se genera el JSON)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API de ConstruSoftTicket", Version = "v1" });
});

var app = builder.Build();

// 5. Activación de Swagger SIEMPRE (Sin importar el entorno)
app.UseSwagger();
app.UseSwaggerUI(c => 
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ConstruSoftTicket API V1");
});

// 6. Activación de Políticas de Seguridad y Rutas
app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();

// 7. Verificación de la Base de Datos al iniciar
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.EnsureCreated();
        Console.WriteLine("--> Base de datos verificada y lista.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"--> Alerta de conexión BD: {ex.Message}");
    }
}

app.Run();