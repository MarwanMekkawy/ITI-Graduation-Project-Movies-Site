using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.DTOs.MovieDTO
{
    public class GenreReadDto
    {
        public int GenreId { get; set; }
        public string Name { get; set; }
        public List<MovieReadDto> movies { get; set; }
    }
}
