using System.ComponentModel.DataAnnotations;

namespace VendingMachineAPI.Models
{
    public class VendingMachine
    {
        [Key]
        public int SerialNumber { get; set; }

        [Required]
        public string? Products { get; set; }

        [Required]
        public string? Locations { get; set; }

        // Add other properties as needed
    }
}