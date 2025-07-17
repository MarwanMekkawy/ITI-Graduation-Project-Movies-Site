using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Models_Entities_
{
    public class Genre
    {
        public int GenreId { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
    }

}
