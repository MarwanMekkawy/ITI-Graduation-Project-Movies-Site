using Project.BLL.Interfaces;
using Project.DAL.Interfaces;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Repositories
{
    public class UserRatingService : IUserRatingService
    {
        private readonly IUserRatingRepository _repo;

        public UserRatingService(IUserRatingRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<UserRating>> GetAllAsync() => await _repo.GetAllAsync();

        public async Task<UserRating?> GetByIdAsync(int userId, int movieId)
        {
            var all = await _repo.GetAllAsync();
            return all.FirstOrDefault(r => r.UserId == userId && r.MovieId == movieId);
        }
    }

}
