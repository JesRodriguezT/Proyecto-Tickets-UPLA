using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ConstruSoftTicket.Infrastructure.Data;

public static class DatabaseInitializer
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
        try
        {
            // La capa de infraestructura sí tiene permiso para usar código SQL específico.
            // Se asegura de que la tabla 'usuarios' exista.
            context.Database.ExecuteSqlRaw(@"
                CREATE TABLE IF NOT EXISTS usuarios (
                    id SERIAL PRIMARY KEY,
                    username TEXT NOT NULL,
                    passwordhash TEXT NOT NULL,
                    rol TEXT NOT NULL
                );

                -- CORRECCIÓN: Añadimos la creación de la tabla 'Tickets' que faltaba.
                CREATE TABLE IF NOT EXISTS ""Tickets"" (
                    ""Id"" SERIAL PRIMARY KEY,
                    ""Titulo"" TEXT NOT NULL,
                    ""Descripcion"" TEXT NOT NULL,
                    ""FechaCreacion"" TIMESTAMP WITH TIME ZONE NOT NULL,
                    ""Estado"" TEXT NOT NULL
                );
            ");
            Console.WriteLine("--> Base de datos verificada: Tablas 'usuarios' y 'Tickets' listas.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"--> Error al verificar la base de datos: {ex.Message}");
        }
    }
}