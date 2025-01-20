using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly ISessionService _sessionService;
        private readonly IGameService _gameService;

        public SessionController(ISessionService sessionService, IGameService gameService)
        {
            _sessionService = sessionService;
            _gameService = gameService;
        }

        // Retrieves all sessions
        [HttpGet]
        public async Task<IActionResult> GetSessions()
        {
            var sessions = await _sessionService.GetAllSessionsAsync();
            return Ok(sessions);
        }

        [HttpGet("active-sessions")]
        public IActionResult GetActiveSessions()
        {
            try
            {
                var activeSessions = _sessionService.GetActiveSessions();
                Console.WriteLine(_sessionService.GetHashCode());
                return Ok(activeSessions);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving active sessions: {ex.Message}");
            }
        }

        [HttpGet("active-session/{sessionId}")]
        public async Task<IActionResult> GetActiveSessionByIdAsync(int sessionId)
        {
            var session = await _sessionService.GetActiveSessionByIdAsync(sessionId);
            return Ok(session);
        }


        [HttpPost("start-session/{gameId}")]
        public async Task<IActionResult> StartSession([FromBody] StartSessionRequest request)
        {
            var session = await _sessionService.StartSessionAsync(request.GameId, request.Duration);
            Console.WriteLine(_sessionService.GetHashCode());

            return Ok(new { sessionId = session.SessionId});
        }

        // Generates a random number for the session
        [HttpGet("generate-random/{sessionId}")]
        public async Task<IActionResult> GenerateRandomNumber(int sessionId)
        {
            try
            {
                int randomNumber = await _sessionService.GenerateRandomUnusedNumber(sessionId);
                return Ok(randomNumber);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("submit")]
        public async Task<IActionResult> SubmitAnswer([FromBody] SubmitAnswerRequest request)
        {
            var result = await _sessionService.SubmitAnswerAsync(request.SessionId, request.RandomNumber, request.Answer);
            if (result == null)
            {
                return BadRequest("Invalid session or answer.");
            }

            return Ok(result);
        }

        [HttpPost("end")] 
        public async Task<IActionResult> EndSession([FromBody] EndSessionRequest request)
        {
            var session = await _sessionService.EndSessionAsync(request.SessionId);
            return Ok(session);
/*            return CreatedAtAction(nameof(GetGames), new { id = game.GameId }, game);
*/      }

        [HttpGet("cancel/{sessionId}")]
        public async Task<IActionResult> CancelSession(int sessionId)
        {
            var result = await _sessionService.CancelSession(sessionId);
            return Ok(result);
        }
    }
}
