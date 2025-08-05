using AutoMapper;
using Project.BLL.DTOs.MovieDTO;
using Project.BLL.DTOs.UserDTO;
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
        private readonly IMovieRepository _movieRepo;
        private readonly IMapper _mapper;

        public MovieService(IMovieRepository movieRepo, IMapper mapper)
        {
            _movieRepo = movieRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MovieReadDto>> GetAllItemsAsync()
        {
            var items = await _movieRepo.GetAllWithGenresAsync(); 
            return _mapper.Map<IEnumerable<MovieReadDto>>(items); 
        }

        public async Task<MovieReadDto?> GetMovieByIdAsync(int id)
        {
            var movie = await _movieRepo.GetByIdWithGenresAsync(id); 
            return movie == null ? null : _mapper.Map<MovieReadDto>(movie);
        }

        public async Task<IEnumerable<SeriesReadDto>> GetAllSeriesAsync()
        {
            var items = await _movieRepo.GetAllWithGenresAsync(); 
            var series = items.Where(m => m.IsMovie == false);
            return _mapper.Map<IEnumerable<SeriesReadDto>>(series);
        }

        public async Task<IEnumerable<MovieReadDto>> GetAllMoviesAsync()
        {
            var items = await _movieRepo.GetAllWithGenresAsync();
            var movies = items.Where(m => m.IsMovie == true);
            return _mapper.Map<IEnumerable<MovieReadDto>>(movies);
        }

        public async Task<IEnumerable<MovieReadDto>> SearchByTitleAsync(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                return Enumerable.Empty<MovieReadDto>();

            var movies = await _movieRepo.SearchByTitleAsync(title);
            return _mapper.Map<IEnumerable<MovieReadDto>>(movies);
        }

        ////////////////////////////////////////////////////allitems
        public async Task<IEnumerable<MovieReadDto>> GetTopRatedItemsAsync(int count)
        {
            var top = await _movieRepo.GetTopRatedWithGenresAsync(count);
            return _mapper.Map<IEnumerable<MovieReadDto>>(top);
        }

        public async Task<IEnumerable<MovieReadDto>> GetLatestItemsAsync(int count)
        {
            var latestMovies = await _movieRepo.GetAllWithGenresAsync();
            var sorted = latestMovies
                .OrderByDescending(m => m.ReleaseDate)
                .Take(count);
            return _mapper.Map<IEnumerable<MovieReadDto>>(sorted);
        }
        /////////////////////////////////////////////////////movies
        public async Task<IEnumerable<MovieReadDto>> GetTopRatedMoviesAsync(int count)
        {
            var top = await _movieRepo.GetTopRatedMoviesWithGenresAsync(count);
            return _mapper.Map<IEnumerable<MovieReadDto>>(top);
        }

        public async Task<IEnumerable<MovieReadDto>> GetLatestMoviesAsync(int count)
        {
            var latestMovies = await _movieRepo.GetAllMoviesWithGenresAsync();
            var sorted = latestMovies
                .OrderByDescending(m => m.ReleaseDate)
                .Take(count);
            return _mapper.Map<IEnumerable<MovieReadDto>>(sorted);
        }
        ///////////////////////////////////////////////////// series
        public async Task<IEnumerable<SeriesReadDto>> GetTopRatedSeriesAsync(int count)
        {
            var top = await _movieRepo.GetTopRatedSeriesWithGenresAsync(count);
            return _mapper.Map<IEnumerable<SeriesReadDto>>(top);
        }

        public async Task<IEnumerable<SeriesReadDto>> GetLatestSeriesAsync(int count)
        {
            var latestMovies = await _movieRepo.GetAllWithSeriesGenresAsync();
            var sorted = latestMovies
                .OrderByDescending(m => m.ReleaseDate)
                .Take(count);
            return _mapper.Map<IEnumerable<SeriesReadDto>>(sorted);
        }
    }
}
