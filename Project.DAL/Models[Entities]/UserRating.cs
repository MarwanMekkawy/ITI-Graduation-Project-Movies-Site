using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Models_Entities_
{
    public class UserRating
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;

        public int Rating { get; set; }  // 1–10
        public DateTime RatedAt { get; set; }
    }

}
