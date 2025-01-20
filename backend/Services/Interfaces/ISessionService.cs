using Azure.Core;
using backend.Models;
using System.Collections.Concurrent;

namespace backend.Services.Interfaces
{
    public interface ISessionService
    {
        Task<IEnumerable<Session>> GetAllSessionsAsync();
        Task<Session> GetActiveSessionByIdAsync(int sessionId);
        Task<Session> StartSessionAsync(int gameId, int duration);
        Task<int> GenerateRandomUnusedNumber(int sessionId);
        Task<Session> SubmitAnswerAsync(int sessionId, int randomNumber, string userAnswer);
        Task<Session> EndSessionAsync(int sessionId);
        Task<bool> CancelSession(int sessionId);
        Dictionary<int, Session> GetActiveSessions();
    }
}
