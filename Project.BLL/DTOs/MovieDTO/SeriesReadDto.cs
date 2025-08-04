using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.DTOs.MovieDTO
{
    public class SeriesReadDto
    {
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PosterUrl { get; set; }
        public string MovieImage { get; set; }
        public decimal IMDbRating { get; set; }
        public List<EpisodeReadDto> Episodes { get; set; }
        public List<GenreReadDto> Genres { get; set; }

    }
}
