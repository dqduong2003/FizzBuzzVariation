using backend.DTOs;
using backend.Models;

namespace backend.Respositories.Interfaces
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> GetAllGamesAsync();
        Task AddGameAsync(Game game);
        Task<Game> GetGameByIdAsync(int gameId);
        Task<List<RuleDto>> GetGameRulesAsync(int gameId);
        Task<(int RangeStart, int RangeEnd)> GetGameRangeByIdAsync(int gameId);
    }
}
