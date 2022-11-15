using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class AdminAnalytics
    {
        public InternalUsersAnalytics UsersAnalytics { get; set; }
        public InternalOrgsAnalytics OrgsAnalytics { get; set; }
        public InternalRevenueAnalytics RevenueAnalytics { get; set; }
        public InternalOrdersAnalytics OrdersAnalytics { get; set; }
    }
}
