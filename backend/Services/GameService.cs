using backend.DTOs;
using backend.Mappers;
using backend.Models;
using backend.Respositories;
using backend.Respositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;

        public GameService(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        public async Task<IEnumerable<Game>> GetAllGamesAsync()
        {
            return await _gameRepository.GetAllGamesAsync();
        }

        public async Task<Game> CreateGameAsync(GameCreateRequest request)
        {
            var game = request.ToGameFromCreateDTO();
            await _gameRepository.AddGameAsync(game);
            return game;
        }
        public async Task<Game> GetGameByIdAsync(int gameId)
        {
            return await _gameRepository.GetGameByIdAsync(gameId);
        }

        public async Task<List<RuleDto>> GetGameRulesAsync(int gameId)
        {
            return await _gameRepository.GetGameRulesAsync(gameId);
        }

        public async Task<(int RangeStart, int RangeEnd)> GetGameRangeByIdAsync(int gameId)
        {
            return await _gameRepository.GetGameRangeByIdAsync((int)gameId);
        }
    }
}
