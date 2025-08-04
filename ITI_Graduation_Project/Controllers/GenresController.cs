using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.BLL.DTOs.MovieDTO;
using Project.BLL.Interfaces;
using Project.DAL.Models_Entities_;

namespace ITI_Graduation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class GenresController : ControllerBase
    {
        private readonly IGenreService _service;

        public GenresController(IGenreService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreReadDto>>> GetAll()
        {
            var genres = await _service.GetAllAsync();
            return Ok(genres);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreReadDto>> GetById(int id)
        {
            var genre = await _service.GetByIdAsync(id);
            if (genre == null) return NotFound();
            return Ok(genre);
        }
    }
}

