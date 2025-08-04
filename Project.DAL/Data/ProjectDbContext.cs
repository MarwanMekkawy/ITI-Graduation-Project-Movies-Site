using Microsoft.EntityFrameworkCore;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Data
{
    public class ProjectDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        
        public DbSet<MovieGenre> MovieGenres { get; set; }          
        public DbSet<Watchlist> Watchlists { get; set; }           
        public DbSet<UserRating> UserRatings { get; set; }
        public DbSet<MovieEpisode> MovieEpisodes { get; set; }

        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options)
        {
        }
        protected ProjectDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
