using TVShowCatalog.DAL.Models;
using TVShowCatalog.Interfaces;

namespace TVShowCatalog.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TvShow> TvShows { get; }
        Task<int> SaveChangesAsync();
    }
}