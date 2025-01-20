using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { 
        }

        public DbSet<Game> Games {  get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<SessionNumber> SessionNumbers { get; set; }
    }
}
