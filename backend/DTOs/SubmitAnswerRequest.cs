using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class SubmitAnswerRequest
    {
        [Required]
        public int SessionId { get; set; }
        [Required]
        public int RandomNumber { get; set; }
        public string Answer {  get; set; }
    }
}
