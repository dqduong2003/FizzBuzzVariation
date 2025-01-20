using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class RuleDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "Divisor must be greater than 0.")]
        public int Divisor { get; set; }

        [Required]
        [MaxLength(20)]
        public string Replacement { get; set; }
    }
}
