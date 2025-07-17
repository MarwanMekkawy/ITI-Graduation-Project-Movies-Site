using Project.DAL.Data;
using Project.DAL.Interfaces;
using Project.DAL.Models_Entities_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DAL.Repositories
{
    public class UserRatingRepository : GenericRepository<UserRating>, IUserRatingRepository
    {
        public UserRatingRepository(ProjectDbContext context) : base(context) { }
    }

}
