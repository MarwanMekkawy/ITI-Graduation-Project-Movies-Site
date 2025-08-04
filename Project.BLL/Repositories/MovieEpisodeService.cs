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
    public class MovieEpisodeService : IMovieEpisodeService
    {
        private readonly IMovieEpisodeRepository _episodeRepo;
        private readonly IMapper _mapper;

        public MovieEpisodeService(IMovieEpisodeRepository episodeRepo, IMapper mapper)
        {
            _episodeRepo = episodeRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EpisodeReadDto>> GetEpisodesByMovieIdAsync(int movieId)
        {
            var episodes = await _episodeRepo.GetEpisodesByMovieIdAsync(movieId);
            return _mapper.Map<IEnumerable<EpisodeReadDto>>(episodes);
        }

        public async Task<EpisodeReadDto?> GetEpisodeByIdAsync(int episodeId)
        {
            var episode = await _episodeRepo.GetByIdAsync(episodeId);
            return episode == null ? null : _mapper.Map<EpisodeReadDto>(episode);
        }
    }
}
