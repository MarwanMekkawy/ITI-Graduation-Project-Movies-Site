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
    public class UserRatingConfiguration : IEntityTypeConfiguration<UserRating>
    {
        public void Configure(EntityTypeBuilder<UserRating> builder)
        {
            builder.HasKey(ur => new { ur.UserId, ur.MovieId });

            builder.Property(ur => ur.Rating)
                   .IsRequired()
                   .HasColumnType("decimal(2,1)");

            builder.Property(ur => ur.RatedAt)
                   .HasDefaultValueSql("GETDATE()");

            builder.HasOne(ur => ur.User)
                   .WithMany(u => u.UserRatings)
                   .HasForeignKey(ur => ur.UserId);

            builder.HasOne(ur => ur.Movie)
                   .WithMany(m => m.UserRatings)
                   .HasForeignKey(ur => ur.MovieId);
        }
    }

}
