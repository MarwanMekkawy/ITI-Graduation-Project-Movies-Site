using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.BLL.DTOs.UserDTO;
using Project.BLL.Interfaces;

namespace ITI_Graduation_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll()
        {
            var users = await _service.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDto>> GetById(int id)
        {
            var user = await _service.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserCreateDto dto)
        {
            await _service.AddUserAsync(dto);
            return StatusCode(201); 
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserUpdateDto dto)
        {
            var existingUser = await _service.GetUserByIdAsync(id);
            if (existingUser == null) return NotFound();

            await _service.UpdateUserAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingUser = await _service.GetUserByIdAsync(id);
            if (existingUser == null) return NotFound();

            await _service.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
