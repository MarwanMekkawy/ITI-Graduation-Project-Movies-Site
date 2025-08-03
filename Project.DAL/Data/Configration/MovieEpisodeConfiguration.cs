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
    public class MovieEpisodeConfiguration : IEntityTypeConfiguration<MovieEpisode>
    {
        public void Configure(EntityTypeBuilder<MovieEpisode> builder)
        {
            builder.HasKey(e => e.EpisodeId);

            builder.Property(e => e.Title)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(e => e.EpisodeUrl)
                   .HasMaxLength(300);

            builder.Property(e => e.EpisodeImage) 
                   .HasMaxLength(300);

            builder.HasOne(e => e.Movie)
                   .WithMany(m => m.MovieEpisodes)
                   .HasForeignKey(e => e.MovieId);
        }

    }
}
