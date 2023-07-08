using System.ComponentModel.DataAnnotations;

namespace VendingMachinesSysAPI.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        public string NameOf { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public int VendingMachineSerialNumber { get; set; }
        //public VendingMachine VendingMachine { get; set; }

    }
}
