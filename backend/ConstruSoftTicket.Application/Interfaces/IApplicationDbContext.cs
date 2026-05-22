using Microsoft.EntityFrameworkCore;
using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Ticket> Tickets { get; }
    DbSet<Usuario> Usuarios { get; }
    int SaveChanges();
}