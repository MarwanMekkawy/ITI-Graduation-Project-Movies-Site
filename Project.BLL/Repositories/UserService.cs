using AutoMapper;
using Project.BLL.DTOs.UserDTO;
using Project.BLL.Interfaces;
using Project.DAL.Interfaces;
using Project.DAL.Models_Entities_;
namespace Project.BLL.Repositories
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserReadDto>> GetAllUsersAsync()
        {
            var users = await _userRepo.GetAllAsync();
            return _mapper.Map<IEnumerable<UserReadDto>>(users);
        }

        public async Task<UserReadDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            return user == null ? null : _mapper.Map<UserReadDto>(user);
        }

        public async Task AddUserAsync(UserCreateDto dto)
        {
            // dto.Password here is expected to already be the hashed password (hashed in controller)
            var user = _mapper.Map<User>(dto);
            await _userRepo.AddAsync(user);
            await _userRepo.SaveAsync();
        }

        public async Task UpdateUserAsync(int id, UserUpdateDto dto)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null) return;
            _mapper.Map(dto, user);
            await _userRepo.SaveAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user != null)
            {
                _userRepo.Remove(user);
                await _userRepo.SaveAsync();
            }
        }

        // new method to retrieve the actual User entity for login validation
        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            // Generic repo doesn't have a GetByUsername, so fetch all and find one (or add a repo method)
            var users = await _userRepo.GetAllAsync();
            foreach (var u in users)
            {
                if (u.Username == username) return u;
            }
            return null;
        }
        public async Task<bool> EmailExistsAsync(string email) =>
        await _userRepo.EmailExistsAsync(email);

        public async Task<bool> UsernameExistsAsync(string username) =>
            await _userRepo.UsernameExistsAsync(username);
    }
}

