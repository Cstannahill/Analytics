using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class InternalOrdersAnalytics
    {
        public int TotalOrders { get; set; }
        public int PrevMonthOrders { get; set; }
        public int CurrentMonthOrders { get; set; }
        public int CancelledOrders { get; set; }
        public int RefundedOrders { get; set; }
    }
}
