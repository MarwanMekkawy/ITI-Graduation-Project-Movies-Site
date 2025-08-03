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
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PosterUrl { get; set; }
        public string MovieImage { get; set; } 
        public decimal IMDbRating { get; set; }

        public ICollection<MovieGenre> MovieGenres { get; set; }
        public ICollection<UserRating> UserRatings { get; set; }
        public ICollection<Watchlist> Watchlists { get; set; }
        public ICollection<MovieEpisode> MovieEpisodes { get; set; } 
    }


}
