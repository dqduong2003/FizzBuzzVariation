using backend.Data;
using backend.Models;
using backend.Respositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Respositories
{
    public class SessionRepository : ISessionRepository
    {
        private readonly ApplicationDbContext _context;

        public SessionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Session>> GetAllSessionsAsync()
        {
            return await _context.Sessions.ToListAsync();
        }

        public async Task AddSessionAsync(Session session)
        {
            _context.Sessions.Add(new Session
                {
                    GameId = session.GameId,
                    StartTime = session.StartTime,
                    Duration = session.Duration,
                    CorrectAnswers = session.CorrectAnswers,
                    IncorrectAnswers = session.IncorrectAnswers
                });
            await _context.SaveChangesAsync();
        }
    }
}
