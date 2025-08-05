using Project.BLL.DTOs.MovieDTO;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Interfaces
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieReadDto>> GetAllItemsAsync();
        Task<MovieReadDto?> GetMovieByIdAsync(int id);
        Task<IEnumerable<SeriesReadDto>> GetAllSeriesAsync();
        Task<IEnumerable<MovieReadDto>> GetAllMoviesAsync();
        Task<IEnumerable<MovieReadDto>> SearchByTitleAsync(string title);
        Task<IEnumerable<MovieReadDto>> GetTopRatedItemsAsync(int count);
        Task<IEnumerable<MovieReadDto>> GetLatestItemsAsync(int count);
        Task<IEnumerable<MovieReadDto>> GetTopRatedMoviesAsync(int count);
        Task<IEnumerable<MovieReadDto>> GetLatestMoviesAsync(int count);
        Task<IEnumerable<SeriesReadDto>> GetTopRatedSeriesAsync(int count);
        Task<IEnumerable<SeriesReadDto>> GetLatestSeriesAsync(int count);
    }

}
