using backend.DTOs;
using backend.Models;
using backend.Respositories;
using backend.Respositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Concurrent;
using System.Data;

namespace backend.Services
{
    public class SessionService : ISessionService
    {
        private readonly IServiceProvider _serviceProvider;
        private (int RangeStart, int RangeEnd) _numberRange;
        private readonly ConcurrentDictionary<int, List<int>> _usedNumbers = new();
        private Dictionary<int, Session> _activeSessions = new();

        public SessionService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        // Dynamically resolve ISessionRepository
        private ISessionRepository GetSessionRepository()
        {
            return _serviceProvider.GetRequiredService<ISessionRepository>();
        }

        // Dynamically resolve IGameService
        private IGameService GetGameService()
        {
            return _serviceProvider.GetRequiredService<IGameService>();
        }

        public async Task<IEnumerable<Session>> GetAllSessionsAsync()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var repository = scope.ServiceProvider.GetRequiredService<ISessionRepository>();
                return await repository.GetAllSessionsAsync();
            }
        }

        public async Task<Session> StartSessionAsync(int gameId, int duration)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

                // Validate the game
                var game = await gameService.GetGameByIdAsync(gameId);
                if (game == null)
                {
                    throw new Exception($"Game with ID {gameId} not found.");
                }

                var session = new Session
                {
                    SessionId = GenerateSessionId(),
                    GameId = gameId,
                    StartTime = DateTime.UtcNow,
                    Duration = duration,
                    CorrectAnswers = 0,
                    IncorrectAnswers = 0
                };

                _numberRange = await gameService.GetGameRangeByIdAsync(gameId);
                _usedNumbers[session.SessionId] = new List<int>();
                _activeSessions[session.SessionId] = session;

                Console.WriteLine($"Session started with ID {session.SessionId}. Total active sessions: {_activeSessions.Count}");

                return session;
            }
        }

        public Dictionary<int, Session> GetActiveSessions()
        {
            Console.WriteLine($"Total active sessions: {_activeSessions.Count}");
            return _activeSessions;
        }

        public async Task<Session> GetActiveSessionByIdAsync(int sessionId)
        {
            if (!_activeSessions.TryGetValue(sessionId, out var session))
            {
                throw new Exception("Session not found.");
            }
            return _activeSessions[sessionId];
        }


        private int GenerateSessionId()
        {
            return new Random().Next(1000, 9999); // Replace with a more robust method if necessary
        }

        public async Task<int> GenerateRandomUnusedNumber(int sessionId)
        {
            if (!_activeSessions.TryGetValue(sessionId, out var session))
            {
                throw new Exception("Session not found.");
            }

            if (!IsSessionActive(session))
            {
                await EndSessionAsync(sessionId);
                throw new Exception("Session has expired.");
            }

            int randomNumber;
            do
            {
                randomNumber = new Random().Next(_numberRange.RangeStart, _numberRange.RangeEnd);
            } while (_usedNumbers[sessionId].Contains(randomNumber));

            _usedNumbers[sessionId].Add(randomNumber);
            return randomNumber;
        }

        // Validate the user's submission
        public async Task<Session> SubmitAnswerAsync(int sessionId, int randomNumber, string userAnswer)
        {
            if (!_activeSessions.TryGetValue(sessionId, out var session))
            {
                throw new Exception("Session not found.");
            }

            if (!IsSessionActive(session))
            {
                await EndSessionAsync(sessionId);
                throw new Exception("Session has expired.");
            }

            using (var scope = _serviceProvider.CreateScope())
            {
                var gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

                // Retrieve game rules and validate
                var rules = await gameService.GetGameRulesAsync(session.GameId);
                var correctAnswer = GenerateFizzBuzzResult(randomNumber, rules);

                if (userAnswer == correctAnswer)
                {
                    session.CorrectAnswers++;
                    return session;
                }
                else
                {
                    session.IncorrectAnswers++;
                    return session;
                }
            }
        }

        private string GenerateFizzBuzzResult(int number, List<RuleDto> rules)
        {
            var result = "";
            foreach (var rule in rules)
            {
                if (number % rule.Divisor == 0)
                {
                    result += rule.Replacement;
                }
            }
            Console.WriteLine(result);
            return result;
        }

        // Close the session
        public async Task<Session> EndSessionAsync(int sessionId)
        {
            if (!_activeSessions.TryGetValue(sessionId, out var session))
            {
                throw new Exception("Session not found.");
            }

            // Finalize the session
            session.Duration = (int)(DateTime.UtcNow - session.StartTime).TotalSeconds;

            using (var scope = _serviceProvider.CreateScope())
            {
                var repository = scope.ServiceProvider.GetRequiredService<ISessionRepository>();

                // Store session in database and clean up memory
                await repository.AddSessionAsync(session); // Store session in database

                _activeSessions.Remove(sessionId);
                _usedNumbers.TryRemove(sessionId, out _);

                return session;
            }
        }

        // Cancel active session
        public async Task<bool> CancelSession(int sessionId)
        {
            if (!_activeSessions.TryGetValue(sessionId, out var session))
            {
                return false;
                throw new Exception("Session not found.");
            }

            _activeSessions.Remove(sessionId);
            _usedNumbers.TryRemove(sessionId, out _);

            return true;
        }

        // Check the remaining duration
        private bool IsSessionActive(Session session)
        {
            return DateTime.UtcNow < session.StartTime.AddSeconds(session.Duration);
        }
    }
}
