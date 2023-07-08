using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VendingMachinesSysAPI.Models;

namespace VendingMachinesSysAPI.Models
{
    public class VendingMachineDbContext : IdentityDbContext
    {
        public VendingMachineDbContext(DbContextOptions<VendingMachineDbContext> options)
            : base(options)
        {
        }

        public DbSet<VendingMachine> VendingMachines { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add any additional configuration here as needed
        }
    }
}