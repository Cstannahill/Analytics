using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class InternalOrgsAnalytics
    {
        public int TotalOrgs { get; set; }
        public int ActiveOrgs { get; set; }
        public int PendingOrgs { get; set; }
        public int PrevActiveOrgs { get; set; }
        public int OrgsAddedPrevMonth { get; set; }
        public int TotalInvites { get; set; }
        public int PrevMonthInvites { get; set; }
        public int CurrentMonthInvites { get; set; }
        public List<OrgRevenueAnalytics> Revenues { get; set; }
    }
}
