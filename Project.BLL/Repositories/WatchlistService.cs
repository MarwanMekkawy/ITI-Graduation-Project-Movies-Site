using AutoMapper;
using Project.BLL.DTOs.WatchlistDTO;
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
        private readonly IWatchlistRepository _watchlistRepo;
        private readonly IMapper _mapper;

        public WatchlistService(IWatchlistRepository watchlistRepo, IMapper mapper)
        {
            _watchlistRepo = watchlistRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<WatchlistReadDto>> GetUserWatchlistAsync(int userId)
        {
            var all = await _watchlistRepo.GetAllAsync();
            var filtered = all.Where(w => w.UserId == userId);
            return _mapper.Map<IEnumerable<WatchlistReadDto>>(filtered);
        }

        public async Task AddToWatchlistAsync(WatchlistAddDto dto)
        {
            var entity = _mapper.Map<Watchlist>(dto);
            await _watchlistRepo.AddAsync(entity);
            await _watchlistRepo.SaveAsync();
        }

        public async Task RemoveFromWatchlistAsync(int userId, int movieId)
        {
            var all = await _watchlistRepo.GetAllAsync();
            var item = all.FirstOrDefault(w => w.UserId == userId && w.MovieId == movieId);
            if (item != null)
            {
                _watchlistRepo.Remove(item);
                await _watchlistRepo.SaveAsync();
            }
        }
    }
}
