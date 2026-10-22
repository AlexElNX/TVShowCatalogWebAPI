using TVShowCatalog.DAL.Interfaces;
using TVShowCatalog.DAL.Models;
using TVShowCatalog.Interfaces;


namespace TVShowCatalog.Services
{
    public class TvShowService : ITvShowService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TvShowService(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<TvShow>> GetAllAsync()
        {
            return await _unitOfWork.TvShows.GetAllAsync();
        }

        public async Task<TvShow?> GetByIdAsync(int id)
        {
            return await _unitOfWork.TvShows.GetByIdAsync(id);
        }

        public async Task CreateAsync(TvShow tvShow, IFormFile? posterFile)
        {
            if (posterFile != null && posterFile.Length > 0)
            {
                tvShow.Poster = await SavePosterAsync(posterFile);
            }

            await _unitOfWork.TvShows.CreateAsync(tvShow);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(TvShow tvShow, IFormFile? posterFile)
        {
            var existingShow = await _unitOfWork.TvShows.GetByIdAsync(tvShow.Id);
            if(existingShow == null) return false;

            existingShow.Title = tvShow.Title;
            existingShow.Showrunner = tvShow.Showrunner;
            existingShow.Genre = tvShow.Genre;
            existingShow.Premiere = tvShow.Premiere;
            existingShow.Description = tvShow.Description;


            if (posterFile != null && posterFile.Length > 0)
            {
                existingShow.Poster = await SavePosterAsync(posterFile);
            }
    
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tvShow = await _unitOfWork.TvShows.GetByIdAsync(id);
            if (tvShow == null) return false;

            if (!string.IsNullOrEmpty(tvShow.Poster))
            {
                string imagePath = Path.Combine(_webHostEnvironment.WebRootPath, tvShow.Poster.TrimStart('/'));
                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                }
            }

            await _unitOfWork.TvShows.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }


        private async Task<string> SavePosterAsync(IFormFile posterFile)
        {
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
            Directory.CreateDirectory(uploadsFolder);

            string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(posterFile.FileName);
            string filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await posterFile.CopyToAsync(stream);
            }

            return "/images/" + fileName;
        }
    }
}