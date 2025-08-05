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
        public async Task<Movie?> GetByIdWithGenresAsync(int id)
        {
            return await _context.Movies
                .Include(m => m.MovieGenres)
                    .ThenInclude(mg => mg.Genre)
                .FirstOrDefaultAsync(m => m.MovieId == id);
        }

        public async Task<IEnumerable<Movie>> GetAllWithGenresAsync()          
        {
            return await _context.Movies
                .Include(m => m.MovieGenres)
                    .ThenInclude(mg => mg.Genre)
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetTopRatedWithGenresAsync(int count) 
        {
            return await _context.Movies
                .Include(m => m.MovieGenres)
                    .ThenInclude(mg => mg.Genre)
                .OrderByDescending(m => m.IMDbRating)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetAllMoviesWithGenresAsync()           
        {
            return await _context.Movies
                .Where(m=>m.IsMovie==true)
                .Include(m => m.MovieGenres)
                    .ThenInclude(mg => mg.Genre)
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetTopRatedMoviesWithGenresAsync(int count) 
        {
            return await _context.Movies
                .Where(m => m.IsMovie == true)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .OrderByDescending(m => m.IMDbRating)
                .Take(count)
                .ToListAsync();
        }
        public async Task<IEnumerable<Movie>> GetAllWithSeriesGenresAsync()          
        {
            return await _context.Movies
                .Where(m => m.IsMovie == false)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetTopRatedSeriesWithGenresAsync(int count) 
        {
            return await _context.Movies
                .Where(m => m.IsMovie == false)
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .OrderByDescending(m => m.IMDbRating)
                .Take(count)
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> SearchByTitleAsync(string title)
        {
            return await _context.Movies
                .Where(m => m.Title.ToLower().Contains(title.ToLower()))
                .Include(m => m.MovieGenres)
                    .ThenInclude(mg => mg.Genre)
                .OrderBy(m => m.Title)
                .Take(10)                                   // top 10 suggestions
                .ToListAsync();
        }
    }

}
