using ConstruSoftTicket.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConstruSoftTicket.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets => Set<Ticket>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuramos el mapeo exacto para evitar errores de nombres en PostgreSQL
        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.ToTable("Tickets"); // Nombre de la tabla
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Titulo)
                  .IsRequired();

            entity.Property(e => e.Descripcion)
                  .IsRequired(); // Esto asegura que busque 'Descripcion' exactamente

            entity.Property(e => e.FechaCreacion);
            entity.Property(e => e.Estado);
        });
    }
}