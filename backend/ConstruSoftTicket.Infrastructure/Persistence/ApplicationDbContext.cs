using Microsoft.EntityFrameworkCore;
using ConstruSoftTicket.Domain.Entities;

namespace ConstruSoftTicket.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    public DbSet<Ticket> Tickets { get; set; }
}