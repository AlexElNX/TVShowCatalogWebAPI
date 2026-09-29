using Microsoft.AspNetCore.Mvc;
using TVShowCatalog.Models;
using TVShowCatalog.Interfaces;

namespace TVShowCatalog.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TvShowController : ControllerBase
    {
        private readonly ITvShowService _tvShowService;

        public TvShowController(ITvShowService tvShowService)
        {
            _tvShowService = tvShowService;
        }

        // GET: api/tvshow
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var shows = await _tvShowService.GetAllAsync();
            return Ok(shows); // 200 OK
        }


        // GET: api/tvshow/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tvShow = await _tvShowService.GetByIdAsync(id);

            if (tvShow == null) return NotFound(); // 404 Not Found

            return Ok(tvShow); // 200 OK
        }


        // POST: api/tvshow
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] TvShow tvShow, IFormFile? posterFile)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState); // 400 Bad Request

            await _tvShowService.CreateAsync(tvShow, posterFile);
            return CreatedAtAction(nameof(GetById), new {id = tvShow.Id}, tvShow); // 201 Created
        }

        // PUT: api/tvshow/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] TvShow tvShow, IFormFile? posterFile)
        {
            if (id != tvShow.Id) return BadRequest("ID mismatch");

            if (!ModelState.IsValid) return BadRequest(ModelState); // 400 Bad Request

            bool success = await _tvShowService.UpdateAsync(tvShow, posterFile);
            if (!success) return NotFound();


            return NoContent(); // 204 No Content
        }

        // DELETE: api/tvshow/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            bool deleted = await _tvShowService.DeleteAsync(id);
            if (!deleted) return NotFound();

            return NoContent(); // 204 No Content
        }
    }
}
