using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class OrgRevenueAnalytics
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal AnnualRevenue { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public decimal WeeklyRevenue { get; set; }
        public int TotalOrders { get; set; }
        public int Invites { get; set; }
    }
}
