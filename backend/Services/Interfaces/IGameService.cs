using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IGameService
    {
        Task<IEnumerable<Game>> GetAllGamesAsync();
        Task<Game> CreateGameAsync(GameCreateRequest request);
        Task<Game> GetGameByIdAsync(int gameId);
        Task<List<RuleDto>> GetGameRulesAsync(int gameId);
        Task<(int RangeStart, int RangeEnd)> GetGameRangeByIdAsync(int gameId);

    }
}
