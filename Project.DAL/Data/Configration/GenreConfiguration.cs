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
    public class GenreConfiguration : IEntityTypeConfiguration<Genre>
    {
        public void Configure(EntityTypeBuilder<Genre> builder)
        {
            builder.HasKey(g => g.GenreId);

            builder.Property(g => g.Name)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.HasMany(g => g.MovieGenres)
                   .WithOne(mg => mg.Genre)
                   .HasForeignKey(mg => mg.GenreId);
        }
    }

}
