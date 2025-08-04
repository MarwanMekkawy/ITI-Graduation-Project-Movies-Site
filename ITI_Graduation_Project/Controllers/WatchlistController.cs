using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.BLL.DTOs.WatchlistDTO;
using Project.BLL.Interfaces;

namespace ITI_Graduation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchlistController : ControllerBase
    {
        private readonly IWatchlistService _service;

        public WatchlistController(IWatchlistService service)
        {
            _service = service;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<WatchlistReadDto>>> GetUserWatchlist(int userId)
        {
            return Ok(await _service.GetUserWatchlistAsync(userId));
        }

        [HttpPost]
        public async Task<IActionResult> AddToWatchlist(WatchlistAddDto dto)
        {
            await _service.AddToWatchlistAsync(dto);
            return NoContent();
        }

        [HttpDelete("{userId}/{movieId}")]
        public async Task<IActionResult> RemoveFromWatchlist(int userId, int movieId)
        {
            await _service.RemoveFromWatchlistAsync(userId, movieId);
            return NoContent();
        }
    }
}
