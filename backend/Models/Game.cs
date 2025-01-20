namespace backend.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Rules { get; set; }
        public int RangeStart {  get; set; }
        public int RangeEnd { get; set; }
    }
}
