using ConstruSoftTicket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConstruSoftTicket.Infrastructure.Data.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.ToTable("Tickets"); 
        builder.HasKey(e => e.Id);
        
        // Usamos el constructor privado para que EF sepa cómo materializar la entidad.
        builder.Property(e => e.Titulo).IsRequired();
        builder.Property(e => e.Descripcion).IsRequired(); 
        builder.Property(e => e.FechaCreacion);
        builder.Property(e => e.Estado);
    }
}