using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class GameCreateRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        [MinLength(1)]
        public List<RuleDto> Rules { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "RangeStart must be a positive number.")]
        public int RangeStart { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "RangeEnd must be greater than 0.")]
        public int RangeEnd { get; set; }
    }
}
