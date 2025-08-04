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
    }
}

