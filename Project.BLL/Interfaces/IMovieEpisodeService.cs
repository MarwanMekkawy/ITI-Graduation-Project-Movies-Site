using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.BLL.DTOs.MovieDTO;

namespace Project.BLL.Interfaces
{
    public interface IMovieEpisodeService
    {
        Task<IEnumerable<EpisodeReadDto>> GetEpisodesByMovieIdAsync(int movieId);
        Task<EpisodeReadDto?> GetEpisodeByIdAsync(int episodeId);
    }
}