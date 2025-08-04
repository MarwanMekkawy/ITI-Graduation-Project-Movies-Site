using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project.BLL.Interfaces;
using Project.BLL.Repositories;
using Project.DAL.Data;
using Project.DAL.Interfaces;
using Project.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.Extentions
{
    public static class ServiceCollectionExtensions  //service cleaning
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // DbContext
            services.AddDbContext<ProjectDbContext>(options =>
                options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            //Register the generic repository
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            // Repositories
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<IGenreRepository, GenreRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRatingRepository, UserRatingRepository>();
            services.AddScoped<IWatchlistRepository, WatchlistRepository>();
            services.AddScoped<IMovieEpisodeRepository, MovieEpisodeRepository>();


            // Services
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IGenreService, GenreService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRatingService, UserRatingService>();
            services.AddScoped<IWatchlistService, WatchlistService>();
            services.AddScoped<IMovieEpisodeService, MovieEpisodeService>();


            return services;
        }

    }
}
