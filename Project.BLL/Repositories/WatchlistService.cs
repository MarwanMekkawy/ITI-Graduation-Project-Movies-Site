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
    public class WatchlistService : IWatchlistService
    {
        private readonly IWatchlistRepository _repo;

        public WatchlistService(IWatchlistRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Watchlist>> GetByUserIdAsync(int userId)
        {
            var all = await _repo.GetAllAsync();
            return all.Where(w => w.UserId == userId);
        }
    }

}
