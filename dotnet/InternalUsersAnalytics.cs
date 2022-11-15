using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{ 
    public class InternalUsersAnalytics
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int PrevTotalActiveUsers { get; set; }
        public int PrevMonthNewUsers { get; set; }
        public int CurrentMonthNewUsers { get; set; }
        public int PendingUsers { get; set; }
    }
}
