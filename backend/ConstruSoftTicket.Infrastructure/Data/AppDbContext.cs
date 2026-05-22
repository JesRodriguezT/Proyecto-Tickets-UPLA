using Microsoft.EntityFrameworkCore;
using ConstruSoftTicket.Domain.Entities;
using ConstruSoftTicket.Application.Interfaces;

namespace ConstruSoftTicket.Infrastructure.Data;

public class AppDbContext : DbContext, IApplicationDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Mapeo exacto según las mayúsculas de tu pgAdmin
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("Usuarios"); // 'U' mayúscula
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Id)
                  .HasColumnName("Id"); // 'I' mayúscula
                  
            entity.Property(e => e.Username)
                  .HasColumnName("Username"); // 'U' mayúscula
            
            entity.Property(e => e.PasswordHash)
                  .HasColumnName("PasswordHash"); // 'P' y 'H' mayúsculas, sin guion bajo
            
            entity.Property(e => e.Rol)
                  .HasColumnName("Rol"); // 'R' mayúscula
        });
    }

    public override int SaveChanges()
    {
        return base.SaveChanges();
    }
}