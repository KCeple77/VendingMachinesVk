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
    public class VendingMachinesController : ControllerBase
    {
        private readonly VendingMachineDbContext _dbContext;

        public VendingMachinesController(VendingMachineDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendingMachine>>> GetVendingMachines()
        {
            var vendingMachines = await _dbContext.VendingMachines.ToListAsync();

            if (vendingMachines == null || vendingMachines.Count == 0)
            {
                return NotFound();
            }

            return Ok(vendingMachines);
        }

        [HttpGet]
        [Route("Dict")]
        public async Task<ActionResult<IEnumerable<VendingMachine>>> GetVendingMachinesDict()
        {
            var vendingMachines = await _dbContext.VendingMachines.ToDictionaryAsync(entry => entry.SerialNumber);

            if (vendingMachines == null || vendingMachines.Count == 0)
            {
                return NotFound();
            }

            return Ok(vendingMachines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VendingMachine>> GetVendingMachine(int id)
        {
            var vendingMachine = await _dbContext.VendingMachines.FindAsync(id);

            if (vendingMachine == null)
            {
                return NotFound();
            }

            return vendingMachine;
        }

        //[HttpPost]
        //public async Task<ActionResult<VendingMachine>> CreateVendingMachine(VendingMachine vendingMachine)
        //{
        //    _dbContext.VendingMachines.Add(vendingMachine);
        //    await _dbContext.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetVendingMachine), new { id = vendingMachine.SerialNumber }, vendingMachine);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateVendingMachine(int id, VendingMachine vendingMachine)
        //{
        //    if (id != vendingMachine.SerialNumber)
        //    {
        //        return BadRequest();
        //    }

        //    var existingVendingMachine = await _dbContext.VendingMachines.FindAsync(id);

        //    if (existingVendingMachine == null)
        //    {
        //        return NotFound();
        //    }

        //    existingVendingMachine.Locations = vendingMachine.Locations;
        //    existingVendingMachine.Latitude = vendingMachine.Latitude;
        //    existingVendingMachine.Longitude = vendingMachine.Longitude;

        //    _dbContext.Entry(existingVendingMachine).State = EntityState.Modified;

        //    try
        //    {
        //        await _dbContext.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!VendingMachineExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteVendingMachine(int id)
        //{
        //    var vendingMachine = await _dbContext.VendingMachines.FindAsync(id);

        //    if (vendingMachine == null)
        //    {
        //        return NotFound();
        //    }

        //    _dbContext.VendingMachines.Remove(vendingMachine);
        //    await _dbContext.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool VendingMachineExists(int id)
        {
            return _dbContext.VendingMachines.Any(e => e.SerialNumber == id);
        }
    }
}
