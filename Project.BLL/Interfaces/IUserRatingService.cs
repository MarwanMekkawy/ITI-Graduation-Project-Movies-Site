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
        Task<IEnumerable<UserRating>> GetAllAsync();
        Task<UserRating?> GetByIdAsync(int userId, int movieId);
    }

}
