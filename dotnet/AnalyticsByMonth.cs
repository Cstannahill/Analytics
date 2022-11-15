
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class AnalyticsByMonth
    {
        public List<StatsOverTime> Users { get; set; }
        public List<StatsOverTime> Orgs { get; set; }
        public List<StatsOverTime> Revenues { get; set; }
        public List<StatsOverTime> Orders { get; set; }
        public List<StatsOverTime> Invites { get; set; }
    }
}
