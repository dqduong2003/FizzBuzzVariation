using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class StartSessionRequest
    {
        [Required]
        public int GameId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be greater than 0.")]
        public int Duration { get; set; }
    }
}
