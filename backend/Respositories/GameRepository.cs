using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Respositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace backend.Respositories
{
    public class GameRepository : IGameRepository
    {
        private readonly ApplicationDbContext _context;
        public GameRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Game>> GetAllGamesAsync()
        {
            return await _context.Games.ToListAsync();
        }

        public async Task AddGameAsync(Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
        }

        public async Task<Game> GetGameByIdAsync(int gameId)
        {
            Game game = await _context.Games.FindAsync(gameId);
            if (game == null)
            {
                return null;
            }
            return game;
        }

        public async Task<List<RuleDto>> GetGameRulesAsync(int gameId)
        {
            Game game = await GetGameByIdAsync(gameId);

            // Convert string back to list of rules
            try
            {
                List<RuleDto> rules = JsonSerializer.Deserialize<List<RuleDto>>(game.Rules);
                return rules;
            }
            catch (JsonException ex)
            {
                throw new InvalidOperationException("Failed to deserialize game rules.", ex);
            }
        }

        public async Task<(int RangeStart, int RangeEnd)> GetGameRangeByIdAsync(int gameId)
        {
            Game game = await GetGameByIdAsync(gameId);
            return (game.RangeStart, game.RangeEnd);
        }
    }
}
