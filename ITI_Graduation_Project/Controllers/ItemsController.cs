using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.BLL.DTOs.MovieDTO;
using Project.BLL.Interfaces;
using Project.BLL.Repositories;

namespace ITI_Graduation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IMovieService _service;

        public ItemsController(IMovieService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieReadDto>>> GetAll()
        {
            return Ok(await _service.GetAllItemsAsync());
        }

        [HttpGet("series")]
        public async Task<ActionResult<IEnumerable<SeriesReadDto>>> GetSeries()
        {
            return Ok(await _service.GetAllSeriesAsync());
        }

        [HttpGet("movies")]
        public async Task<ActionResult<IEnumerable<MovieReadDto>>> GetMovies()
        {
            return Ok(await _service.GetAllMoviesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieReadDto>> GetById(int id)
        {
            var movie = await _service.GetMovieByIdAsync(id);
            if (movie == null) return NotFound();
            return Ok(movie);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string title)
        {
            var results = await _service.SearchByTitleAsync(title);
            return Ok(results);
        }

        [HttpGet("top/{count}")]
        public async Task<ActionResult<IEnumerable<MovieReadDto>>> GetTopRated(int count)
        {
            return Ok(await _service.GetTopRatedMoviesAsync(count));
        }
        [HttpGet("Latest/{count}")]
        public async Task<ActionResult<IEnumerable<MovieReadDto>>> GetLatest(int count)
        {
            return Ok(await _service.GetLatestMoviesAsync(count));
        }

        
    }
}
