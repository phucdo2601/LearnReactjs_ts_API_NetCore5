using Microsoft.EntityFrameworkCore;

namespace NetCoreA5ApiUploadFileB01.Models
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
            
        }


        public DbSet<EmployeeModel> Employee { get; set; }

    }
}
