using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class EndSessionRequest
    {
        [Required]
        public int SessionId { get; set; }
    }
}
