using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.DTOs.MovieDTO
{
    public class EpisodeReadDto
    {
        public int EpisodeId { get; set; }
        public string Title { get; set; }
        public string EpisodeUrl { get; set; }
        public string EpisodeImage { get; set; }
    }
}
