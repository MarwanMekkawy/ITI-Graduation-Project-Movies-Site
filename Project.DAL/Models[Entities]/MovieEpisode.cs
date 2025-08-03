using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Models_Entities_
{
    public class MovieEpisode
    {
        public int EpisodeId { get; set; }
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string EpisodeUrl { get; set; }
        public string EpisodeImage { get; set; } 

        public Movie Movie { get; set; }
    }

}
