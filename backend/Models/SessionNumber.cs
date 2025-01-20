namespace backend.Models
{
    public class SessionNumber
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public int RandomNumber { get; set; }
        public bool IsCorrect { get; set; }
    }
}
