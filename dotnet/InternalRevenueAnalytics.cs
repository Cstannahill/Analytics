using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{ 
    public class InternalRevenueAnalytics
    {
        public decimal WeeklyRevenue { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public decimal AnnualRevenue { get; set; }
        public decimal PrevWeeklyRevenue { get; set; }
        public decimal PrevMonthlyRevenue { get; set; }
        public decimal PrevAnnualRevenue { get; set; }
        public decimal WeeklyRevChange { get; set; }
        public decimal MonthlyRevChange { get; set; }
        public decimal AnnualRevChange { get; set; }
    }
}
