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

        //SHA256 hashing
        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        ///Login/////////////////////////////////////////////////////////////////////////
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            //get user entity
            var user = await _service.GetUserByUsernameAsync(dto.Username);
            //check if user exist
            if (user == null) return Unauthorized(new { message = "Invalid username or password" });
            //hash incoming password 
            var hashed = HashPassword(dto.Password);
            //compare hashes
            if (user.PasswordHash != hashed) return Unauthorized(new { message = "Invalid username or password" }لهف);

            //create token
            var userdata = new List<Claim>
            {
            new Claim("Id", user.UserId.ToString()),
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

            //handles token to string
            var token = new JwtSecurityTokenHandler().WriteToken(tokenobj);
            return Ok(new { token });
        }

        ///Register/////////////////////////////////////////////////////////////////////////
        [HttpPost("signup")]
        public async Task<IActionResult> Create(UserCreateDto dto)
        {
            //error checks
            var errors = new List<string>();

            if (await _service.UsernameExistsAsync(dto.Username))
                errors.Add("Username already exists");
            if (await _service.EmailExistsAsync(dto.Email))
                errors.Add("Email already exists");
            if (errors.Any()) return BadRequest(new { errors });

            //Hash password here (SHA256)
            dto.Password = HashPassword(dto.Password);
            //Save user 
            await _service.AddUserAsync(dto);
            //Create token
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
      
        ///Update/////////////////////////////////////////////////////////////////////////
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserUpdateDto dto)
        {           
            var existingUser = await _service.GetUserByIdAsync(id);
            //error checks
            var errors = new List<string>();
            if (existingUser == null)
                errors.Add("User Not Found.");

            if (await _service.UsernameExistsAsync(dto.Username) && existingUser.Username != dto.Username)
                errors.Add("Username already exists");

            if (await _service.EmailExistsAsync(dto.Email) && existingUser.Email != dto.Email)
                errors.Add("Email already exists");

            if (errors.Any()) return BadRequest(new { errors });

            //pw hash
            if (!string.IsNullOrEmpty(dto.Password))
            {
                dto.Password = HashPassword(dto.Password);
            }
            //updating
            await _service.UpdateUserAsync(id, dto);
             //claims
            var userdata = new List<Claim>
            {
            new Claim("Id", existingUser.UserId.ToString()),
            new Claim(ClaimTypes.Name, dto.Username),
            new Claim(ClaimTypes.Email, dto.Email),
            new Claim("creationDate", existingUser.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"))

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

        ///Delete/////////////////////////////////////////////////////////////////////////
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
