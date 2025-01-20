namespace backend.Models
{
    public class Session
    {
        public int SessionId { get; set; }
        public int GameId { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public int CorrectAnswers { get; set; }
        public int IncorrectAnswers { get; set; }
    }
}
