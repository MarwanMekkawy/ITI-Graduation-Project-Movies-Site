using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Interfaces
{
    public interface IWatchlistService
    {
        Task<IEnumerable<Watchlist>> GetByUserIdAsync(int userId);
    }

}
