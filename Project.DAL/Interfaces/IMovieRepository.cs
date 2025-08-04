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
        Task<IEnumerable<Movie>> GetTopRatedAsync(int count);
        Task<IEnumerable<Movie>> GetAllWithGenresAsync();
        Task<Movie?> GetByIdWithGenresAsync(int id);
        Task<IEnumerable<Movie>> GetTopRatedWithGenresAsync(int count);
        Task<IEnumerable<Movie>> SearchByTitleAsync(string title);
    }

}
