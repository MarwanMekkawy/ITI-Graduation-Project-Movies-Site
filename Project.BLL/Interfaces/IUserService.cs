using Project.BLL.DTOs.UserDTO;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserReadDto>> GetAllUsersAsync();
        Task<UserReadDto?> GetUserByIdAsync(int id);
        Task AddUserAsync(UserCreateDto dto);
        Task UpdateUserAsync(int id, UserUpdateDto dto);
        Task DeleteUserAsync(int id);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> UsernameExistsAsync(string username);
    }

}
