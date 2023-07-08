using System.ComponentModel.DataAnnotations;

namespace VendingMachineAPI.Models
{
    public class VendingMachine
    {
        [Key]
        public int SerialNumber { get; set; }

        [Required]
        public string Locations { get; set; }

        [Required]
        public System.Data.Entity.Spatial.DbGeography latLong { get; set; }

        // Add other properties as needed
    }
}