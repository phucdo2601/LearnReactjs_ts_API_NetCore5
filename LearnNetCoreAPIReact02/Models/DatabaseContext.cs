using Microsoft.EntityFrameworkCore;

namespace LearnNetCoreAPIReact02.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            this.Database.EnsureCreated();  
        }

        public DbSet<Contact> Contacts { get; set; }    

    }
}
