using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachinesSysAPI.Models;

namespace VendingMachinesSysAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly VendingMachineDbContext _dbContext;

        public ProductsController(VendingMachineDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetVendingMachines()
        {
            var products = await _dbContext.Products
                //.Include(vm => vm.Products) // Include related products
                .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetVendingMachine(int id)
        {
            var product = await _dbContext.Products
                //.Include(vm => vm.Products) // Include related products
                .FirstOrDefaultAsync(vm => vm.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        private bool VendingMachineExists(int id)
        {
            return _dbContext.Products.Any(e => e.ProductId == id);
        }
    }
}
