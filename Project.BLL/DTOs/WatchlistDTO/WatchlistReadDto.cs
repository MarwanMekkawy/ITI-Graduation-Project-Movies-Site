using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.BLL.DTOs.WatchlistDTO
{
    public class WatchlistReadDto
    {
            public int UserId { get; set; }
            public int MovieId { get; set; }
            public DateTime AddedAt { get; set; }
    }
}
