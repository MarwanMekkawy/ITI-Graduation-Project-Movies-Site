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
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _repo;

        public MovieService(IMovieRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Movie>> GetAllAsync() => await _repo.GetAllAsync();
        public async Task<Movie?> GetByIdAsync(int id) => await _repo.GetByIdAsync(id);
        public async Task AddAsync(Movie movie)
        {
            await _repo.AddAsync(movie);
            await _repo.SaveAsync();
        }

        public async Task<IEnumerable<Movie>> GetTopRatedAsync(int count) => await _repo.GetTopRatedAsync(count);
    }

}
