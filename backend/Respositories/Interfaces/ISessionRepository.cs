using backend.Models;

namespace backend.Respositories.Interfaces
{
    public interface ISessionRepository
    {
        Task<IEnumerable<Session>> GetAllSessionsAsync();
        Task AddSessionAsync(Session session);
    }
}
