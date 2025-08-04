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
        private readonly IUserRatingRepository _ratingRepo;

        public UserRatingService(IUserRatingRepository ratingRepo)
        {
            _ratingRepo = ratingRepo;
        }

        public async Task AddRatingAsync(int userId, int movieId, double rating)
        {
            var entry = new UserRating { UserId = userId, MovieId = movieId, Rating = (int)rating };
            await _ratingRepo.AddAsync(entry);
            await _ratingRepo.SaveAsync();
        }

        public async Task<double?> GetUserRatingForMovieAsync(int userId, int movieId)
        {
            var all = await _ratingRepo.GetAllAsync();
            return all.FirstOrDefault(r => r.UserId == userId && r.MovieId == movieId)?.Rating;
        }

        public async Task<double> GetAverageRatingForMovieAsync(int movieId)
        {
            var all = await _ratingRepo.GetAllAsync();
            var ratings = all.Where(r => r.MovieId == movieId).Select(r => r.Rating).ToList();
            return ratings.Count == 0 ? 0 : ratings.Average();
        }
    }
}