using AutoMapper;
using Project.BLL.DTOs.MovieDTO;
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
    public class MovieGenreService : IMovieGenreService
    {
        private readonly IGenericRepository<MovieGenre> _movieGenreRepo;
        private readonly IGenreRepository _genreRepo;
        private readonly IMapper _mapper;

        public MovieGenreService(IGenericRepository<MovieGenre> movieGenreRepo, IGenreRepository genreRepo, IMapper mapper)
        {
            _movieGenreRepo = movieGenreRepo;
            _genreRepo = genreRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GenreReadDto>> GetGenresByMovieIdAsync(int movieId)
        {
            var movieGenres = await _movieGenreRepo.GetAllAsync();
            var genreIds = movieGenres
                .Where(mg => mg.MovieId == movieId)
                .Select(mg => mg.GenreId)
                .Distinct();

            var allGenres = await _genreRepo.GetAllAsync();
            var genres = allGenres.Where(g => genreIds.Contains(g.GenreId));
            return _mapper.Map<IEnumerable<GenreReadDto>>(genres);
        }

        public async Task AddGenreToMovieAsync(int movieId, int genreId)
        {
            var entry = new MovieGenre { MovieId = movieId, GenreId = genreId };
            await _movieGenreRepo.AddAsync(entry);
            await _movieGenreRepo.SaveAsync();
        }

        public async Task RemoveGenreFromMovieAsync(int movieId, int genreId)
        {
            var all = await _movieGenreRepo.GetAllAsync();
            var toDelete = all.FirstOrDefault(mg => mg.MovieId == movieId && mg.GenreId == genreId);
            if (toDelete != null)
            {
                _movieGenreRepo.Remove(toDelete);
                await _movieGenreRepo.SaveAsync();
            }
        }
    }
}
