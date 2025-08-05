using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Interfaces
{
    public interface IMovieRepository : IGenericRepository<Movie>
    {
        Task<IEnumerable<Movie>> SearchByTitleAsync(string title);
        Task<IEnumerable<Movie>> GetTopRatedAsync(int count);
        Task<Movie?> GetByIdWithGenresAsync(int id);
        Task<IEnumerable<Movie>> GetTopRatedWithGenresAsync(int count);
        Task<IEnumerable<Movie>> GetTopRatedMoviesWithGenresAsync(int count);
        Task<IEnumerable<Movie>> GetTopRatedSeriesWithGenresAsync(int count);
        Task<IEnumerable<Movie>> GetAllWithGenresAsync();
        Task<IEnumerable<Movie>> GetAllMoviesWithGenresAsync();
        Task<IEnumerable<Movie>> GetAllWithSeriesGenresAsync();
    }

}
