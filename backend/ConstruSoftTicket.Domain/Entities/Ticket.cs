using System;

namespace ConstruSoftTicket.Domain.Entities;

/// <summary>
/// Representa una entidad de dominio "rica". Encapsula datos y comportamiento.
/// </summary>
public class Ticket
{
    public int Id { get; private set; }
    public string Titulo { get; private set; }
    public string Descripcion { get; private set; }
    public DateTime FechaCreacion { get; private set; }
    public string Estado { get; private set; }

    // Constructor privado para que Entity Framework pueda crear la entidad desde la base de datos.
    private Ticket() { }

    // Constructor público que garantiza que un Ticket siempre se cree en un estado válido.
    public Ticket(string titulo, string descripcion)
    {
        // Las reglas de negocio (invariantes) se protegen aquí, en el corazón del dominio.
        if (string.IsNullOrWhiteSpace(titulo) || titulo.Length < 5)
            throw new ArgumentException("El título del ticket es inválido o demasiado corto.", nameof(titulo));

        if (string.IsNullOrWhiteSpace(descripcion) || descripcion.Length < 10)
            throw new ArgumentException("La descripción del ticket es inválida o demasiado corta.", nameof(descripcion));

        Titulo = titulo;
        Descripcion = descripcion;
        FechaCreacion = DateTime.UtcNow;
        Estado = "Abierto"; // El estado inicial siempre es "Abierto" por regla de negocio.
    }

    // Método que encapsula la lógica para cambiar el estado.
    public void Cerrar()
    {
        if (Estado == "Cerrado") return; // Es idempotente, si ya está cerrado, no hace nada.
        
        Estado = "Cerrado";
    }
}