using Microsoft.EntityFrameworkCore;
using Project.DAL.Data;
using Project.DAL.Interfaces;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Repositories
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRepository
    {
        public MovieRepository(ProjectDbContext context) : base(context) { }

        public async Task<IEnumerable<Movie>> GetTopRatedAsync(int count)
        {
            return await _context.Movies
                .OrderByDescending(m => m.IMDbRating)
                .Take(count)
                .ToListAsync();
        }
    }

}
