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
    public class WatchlistConfiguration : IEntityTypeConfiguration<Watchlist>
    {
        public void Configure(EntityTypeBuilder<Watchlist> builder)
        {
            builder.HasKey(w => new { w.UserId, w.MovieId });

            builder.Property(w => w.AddedAt)
                   .HasDefaultValueSql("GETDATE()");

            builder.HasOne(w => w.User)
                   .WithMany(u => u.Watchlists)
                   .HasForeignKey(w => w.UserId);

            builder.HasOne(w => w.Movie)
                   .WithMany(m => m.Watchlists)
                   .HasForeignKey(w => w.MovieId);
        }
    }

}
