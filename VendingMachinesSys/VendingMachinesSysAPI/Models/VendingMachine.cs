using System.ComponentModel.DataAnnotations;

namespace VendingMachinesSysAPI.Models
{
    public class VendingMachine
    {
        [Key]
        public int SerialNumber { get; set; }

        [Required]
        public string Locations { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

    }
}