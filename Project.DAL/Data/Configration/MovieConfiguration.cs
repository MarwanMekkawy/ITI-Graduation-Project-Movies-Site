using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Data.Configration
{
    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder.HasKey(m => m.MovieId);

            builder.Property(m => m.Title)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(m => m.Description)
                   .HasMaxLength(1000);

            builder.Property(m => m.ReleaseDate)
                   .IsRequired();

            builder.Property(m => m.PosterUrl)
                   .HasMaxLength(300);

            builder.Property(m => m.MovieImage)
                   .HasMaxLength(300); 

            builder.Property(m => m.IMDbRating)
                   .HasColumnType("decimal(3,1)");

            builder.HasMany(m => m.MovieGenres)
                   .WithOne(mg => mg.Movie)
                   .HasForeignKey(mg => mg.MovieId);

            builder.HasMany(m => m.UserRatings)
                   .WithOne(ur => ur.Movie)
                   .HasForeignKey(ur => ur.MovieId);

            builder.HasMany(m => m.Watchlists)
                   .WithOne(w => w.Movie)
                   .HasForeignKey(w => w.MovieId);

            builder.HasMany(m => m.MovieEpisodes)
                   .WithOne(e => e.Movie)
                   .HasForeignKey(e => e.MovieId);

            builder.Property(m => m.IsMovie)
                   .IsRequired()
                   .HasDefaultValue(true);

        }
    }

}
