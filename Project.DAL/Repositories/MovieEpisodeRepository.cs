using Microsoft.EntityFrameworkCore;
using Project.DAL.Data;
using Project.DAL.Interfaces;
using Project.DAL.Models_Entities_;
using Project.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class MovieEpisodeRepository : GenericRepository<MovieEpisode>, IMovieEpisodeRepository
{
    public MovieEpisodeRepository(ProjectDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<MovieEpisode>> GetEpisodesByMovieIdAsync(int movieId)
    {
        return await _context.MovieEpisodes
                             .Where(e => e.MovieId == movieId)
                             .ToListAsync();
    }
}
