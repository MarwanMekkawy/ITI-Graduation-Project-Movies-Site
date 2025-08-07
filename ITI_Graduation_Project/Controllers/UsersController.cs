using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project.BLL.DTOs.UserDTO;
using Project.BLL.Interfaces;
using Project.BLL.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Collections.Generic;
using Project.DAL.Models_Entities_;
using System.Security.Cryptography;

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

        [HttpPost("signup")]
        public async Task<IActionResult> Create(UserCreateDto dto)
        {
            //check for dublication
            var errors = new List<string>();

            if (await _service.UsernameExistsAsync(dto.Username))
                errors.Add("Username already exists");

            if (await _service.EmailExistsAsync(dto.Email))
                errors.Add("Email already exists");

            if (errors.Any()) return BadRequest(new { errors });

            // 1) Hash password here (SHA256 as your project used)
            dto.Password = HashPassword(dto.Password);

            // 2) Save user (UserService expects dto.Password to already be hashed)
            await _service.AddUserAsync(dto);

            // 3) Create token (kept exactly like your current code)
            var userdata = new List<Claim>
        {
            new Claim(ClaimTypes.Name, dto.Username),
            new Claim(ClaimTypes.Email, dto.Email)
        };

            var key = Encoding.ASCII.GetBytes("jhnaksdhndjbajhasdjhaskhdasjdhasjdhkasjdhjkhasdjh");
            var securitykey = new SymmetricSecurityKey(key);
            var PwHash = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var tokenobj = new JwtSecurityToken(
                claims: userdata,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: PwHash
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenobj);
            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            // 1) get user entity (contains PasswordHash)
            var user = await _service.GetUserByUsernameAsync(dto.Username);
            if (user == null) return Unauthorized("Invalid username or password");

            // 2) hash incoming password with same method
            var hashed = HashPassword(dto.Password);

            // 3) compare the hashes
            if (user.PasswordHash != hashed) return Unauthorized("Invalid username or password");

            // 4) create token (kept exactly like your current code)
            var userdata = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("creationDate", user.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"))
        };

            var key = Encoding.ASCII.GetBytes("jhnaksdhndjbajhasdjhaskhdasjdhasjdhkasjdhjkhasdjh");
            var securitykey = new SymmetricSecurityKey(key);
            var PwHash = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var tokenobj = new JwtSecurityToken(
                claims: userdata,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: PwHash
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenobj);
            return Ok(new { token });
        }

        // helper: SHA256 hashing (same as your previous code)
        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
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
