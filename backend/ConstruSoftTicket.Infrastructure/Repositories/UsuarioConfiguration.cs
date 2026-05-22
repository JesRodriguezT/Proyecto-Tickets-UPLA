using ConstruSoftTicket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConstruSoftTicket.Infrastructure.Data.Configurations;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("usuarios"); // Fuerza a EF a buscar la tabla 'usuarios' en minúsculas
        builder.HasKey(e => e.Id);   

        builder.Property(e => e.Username)
              .HasColumnName("username") // Mapea a la columna física 'username'
              .IsRequired();

        builder.Property(e => e.PasswordHash)
              .HasColumnName("passwordhash") // Mapea a la columna física 'passwordhash'
              .IsRequired();

        builder.Property(e => e.Rol)
              .HasColumnName("rol") // Mapea a la columna física 'rol'
              .IsRequired();
    }
}