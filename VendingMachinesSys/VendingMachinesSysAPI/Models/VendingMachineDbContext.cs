using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using VendingMachineAPI.Models;

namespace VendingMachineAPI.Models
{
    public class VendingMachineDbContext : DbContext
    {
        public VendingMachineDbContext(DbContextOptions<VendingMachineDbContext> options)
        : base(options)
        {
        }

        public DbSet<VendingMachine> VendingMachines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}