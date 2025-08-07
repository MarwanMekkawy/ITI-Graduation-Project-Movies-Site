using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Models_Entities_
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public byte[]? UserImage { get; set; }

        public ICollection<UserRating> UserRatings { get; set; }
        public ICollection<Watchlist> Watchlists { get; set; }
    }

}
