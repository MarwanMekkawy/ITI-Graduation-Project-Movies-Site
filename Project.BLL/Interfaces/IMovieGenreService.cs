using Project.BLL.DTOs.MovieDTO;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Interfaces
{
    public interface IMovieGenreService
    {
        Task<IEnumerable<GenreReadDto>> GetGenresByMovieIdAsync(int movieId);
        Task AddGenreToMovieAsync(int movieId, int genreId);
        Task RemoveGenreFromMovieAsync(int movieId, int genreId);
    }
}
