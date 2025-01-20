using backend.Data;
using backend.DTOs;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGameService _gameService;
        public GamesController(IGameService gameService)
        {
            _gameService = gameService;
        }

        // Retrieves all games
        [HttpGet]
        public async Task<IActionResult> GetGames()
        {
            var games = await _gameService.GetAllGamesAsync();
            return Ok(games);
        }

        //Retrieves specific game by id
        [HttpGet("{gameId}")]
        public async Task<IActionResult> GetGameById(int gameId)
        {
            var game = await _gameService.GetGameByIdAsync(gameId);
            return Ok(game);
        }

        // Creates a new game
        [HttpPost]
        public async Task<IActionResult> CreateGame([FromBody] GameCreateRequest request)
        {
            var game = await _gameService.CreateGameAsync(request);
            return CreatedAtAction(nameof(GetGames), new { id = game.GameId }, game);
        }

        // Retrieves the rules for a specific game
        [HttpGet("rules/{gameId}")]
        public async Task<IActionResult> GetGameRules(int gameId)
        {
            List<RuleDto> rules = await _gameService.GetGameRulesAsync(gameId);
            if (rules == null)
            {
                return NotFound($"Game with ID {gameId} not found.");
            }
            return Ok(rules);
        }
    }
}
