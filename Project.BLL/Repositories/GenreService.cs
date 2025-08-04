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
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepo;
        private readonly IGenericRepository<MovieGenre> _movieGenreRepo;
        private readonly IGenericRepository<Movie> _movieRepo;
        private readonly IMapper _mapper;

        public GenreService(
            IGenreRepository genreRepo,
            IGenericRepository<MovieGenre> movieGenreRepo,
            IGenericRepository<Movie> movieRepo,
            IMapper mapper)
        {
            _genreRepo = genreRepo;
            _movieGenreRepo = movieGenreRepo;
            _movieRepo = movieRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GenreReadDto>> GetAllAsync()
        {
            var genres = await _genreRepo.GetAllAsync();
            var movies = await _movieRepo.GetAllAsync();
            var movieGenres = await _movieGenreRepo.GetAllAsync();

            var result = genres.Select(genre =>
            {
                var movieIds = movieGenres.Where(mg => mg.GenreId == genre.GenreId).Select(mg => mg.MovieId).ToList();
                var relatedMovies = movies.Where(m => movieIds.Contains(m.MovieId)).ToList();
                var dto = _mapper.Map<GenreReadDto>(genre);
                dto.movies = _mapper.Map<List<MovieReadDto>>(relatedMovies);
                return dto;
            });

            return result;
        }

        public async Task<GenreReadDto?> GetByIdAsync(int id)
        {
            var genre = await _genreRepo.GetByIdAsync(id);
            if (genre == null) return null;

            var movieGenres = await _movieGenreRepo.GetAllAsync();
            var movies = await _movieRepo.GetAllAsync();

            var movieIds = movieGenres.Where(mg => mg.GenreId == id).Select(mg => mg.MovieId).ToList();
            var relatedMovies = movies.Where(m => movieIds.Contains(m.MovieId)).ToList();

            var dto = _mapper.Map<GenreReadDto>(genre);
            dto.movies = _mapper.Map<List<MovieReadDto>>(relatedMovies);

            return dto;
        }
    }

}
