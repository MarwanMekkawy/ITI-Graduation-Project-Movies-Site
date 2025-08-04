using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Interfaces
{
    public interface IMovieEpisodeRepository : IGenericRepository<MovieEpisode>
    {
        Task<IEnumerable<MovieEpisode>> GetEpisodesByMovieIdAsync(int movieId);
    }
}
