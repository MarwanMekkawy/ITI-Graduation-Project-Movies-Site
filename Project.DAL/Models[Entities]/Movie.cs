using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Models_Entities_
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; }
        public string Language { get; set; } = null!;
        public string PosterUrl { get; set; } = null!;
        public decimal IMDbRating { get; set; }

        public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
        public ICollection<Watchlist> Watchlists { get; set; } = new List<Watchlist>();
        public ICollection<UserRating> UserRatings { get; set; } = new List<UserRating>();
    }

}
