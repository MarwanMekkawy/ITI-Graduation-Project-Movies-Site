using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Interfaces
{
    public interface IUserRatingService
    {
        Task AddRatingAsync(int userId, int movieId, double rating);
        Task<double?> GetUserRatingForMovieAsync(int userId, int movieId);
        Task<double> GetAverageRatingForMovieAsync(int movieId);
    }

}
