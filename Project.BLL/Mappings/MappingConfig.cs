using AutoMapper;
using Project.BLL.DTOs.MovieDTO;
using Project.BLL.DTOs.UserDTO;
using Project.BLL.DTOs.WatchlistDTO;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Security.Cryptography;




namespace Project.BLL.Mappings
{
        public class MappingConfig : Profile
        {
            public MappingConfig()
            {
                // Movie to MovieReadDto
                CreateMap<Movie, MovieReadDto>().ReverseMap();

                // Movie (Series) to SeriesReadDto
                CreateMap<Movie, SeriesReadDto>()
                    .ForMember(dest => dest.Episodes, opt => opt.MapFrom(src => src.MovieEpisodes)).ReverseMap();
            
                CreateMap<Movie, MovieReadDto>()
                    .ForMember(dest => dest.Genres,opt => opt.MapFrom(src =>src.MovieGenres.Select(mg => mg.Genre)));

                CreateMap<Genre, GenreReadDto>();
            

                // MovieEpisode to EpisodeReadDto
                CreateMap<MovieEpisode, EpisodeReadDto>().ReverseMap();

                // Genre to GenreReadDto
                CreateMap<Genre, GenreReadDto>().ReverseMap();

                // User mappings
                CreateMap<User, UserReadDto>().ReverseMap();
                                
                CreateMap<UserCreateDto, User>()
                   .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => HashPassword(src.Password)));

                CreateMap<UserUpdateDto, User>()
                   .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src =>
                    string.IsNullOrEmpty(src.Password) ? null : HashPassword(src.Password)));

            // Watchlist mappings
            CreateMap<WatchlistAddDto, Watchlist>().ReverseMap();
            CreateMap<Watchlist, WatchlistReadDto>().ReverseMap();
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
    }
