using TVShowCatalog.DAL.Models;
using TVShowCatalog.DAL.Interfaces;
using TVShowCatalog.Repositories;
using TVShowCatalog.Interfaces;

namespace TVShowCatalog.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TvShowContext _context;
        public IRepository<TvShow> TvShows { get; private set; }

        public UnitOfWork(TvShowContext context)
        {
            _context = context;
            TvShows = new TvShowRepository(_context);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}