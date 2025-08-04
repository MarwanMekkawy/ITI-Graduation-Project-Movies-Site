using Microsoft.AspNetCore.Mvc;
using Project.DAL.Models_Entities_;
using Project.DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;

//test controller

namespace ITI_Graduation_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private readonly IGenericRepository<Movie> _movieRepository;

        public MovieController(IGenericRepository<Movie> movieRepository)
        {
            _movieRepository = movieRepository;
        }

      
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetAll()
        {
            var movies = await _movieRepository.GetAllAsync();
            return Ok(movies);
        }

      
        [HttpPost]
        public async Task<ActionResult<Movie>> Create(Movie movie)
        {
            await _movieRepository.AddAsync(movie);
            return CreatedAtAction(nameof(GetAll), new { id = movie.MovieId }, movie);
        }
    }
}
