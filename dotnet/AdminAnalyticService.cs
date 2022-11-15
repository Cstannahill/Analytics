namespace Services
{
    public class AdminAnalyticService : IAdminAnalyticsService
    {
        IDataProvider _data = null;

        public AdminAnalyticService(IDataProvider data)
        {
            _data = data;
        }

        public InternalUsersAnalytics GetUsersAnalytics()
        {
            InternalUsersAnalytics analytics = null;
            string procName = "dbo.AdminAnalytics_Users_Select";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                analytics = MapSingleUsersAnalytics(reader, ref startingIdx);
            });
            return analytics;
        }

        public InternalOrgsAnalytics GetOrgAnalytics()
        {
            InternalOrgsAnalytics analytics = null;
            string procName = "dbo.AdminAnalytics_Orgs_Select";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                analytics = MapSingleOrgsAnalytics(reader, ref startingIdx);
            });
            return analytics;
        }

        public InternalRevenueAnalytics GetRevenueAnalytics()
        {
            InternalRevenueAnalytics analytics = null;
            string procName = "dbo.AdminAnalytics_Revenue_Select";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                analytics = MapSingleRevenueAnalytics(reader, ref startingIdx);
            });
            return analytics;
        }

        public List<OrgRevenueAnalytics> GetOrgRevenues()
        {
            List<OrgRevenueAnalytics> list = null;
            OrgRevenueAnalytics analytics = null;
            string procName = "dbo.AdminAnalytics_RevenueByOrg_Select";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                analytics = MapSingleOrgRevenueAnalytics(reader, ref startingIdx);
                if (list == null)
                {
                    list = new List<OrgRevenueAnalytics>();
                }
                list.Add(analytics);
            });
            return list;
        }

        public InternalOrdersAnalytics GetOrdersAnalytics()
        {
            InternalOrdersAnalytics orders = null;
            string procName = "dbo.AdminAnalytics_Orders_Select";
            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIdx = 0;
                orders = MapSingleOrdersAnalytics(reader, ref startingIdx);
            });
            return orders;
        }
        public AnalyticsByMonth GetMonthlyAnalytics()
        {
            string procName = "dbo.AdminAnalytics_Monthly_Select";
            AnalyticsByMonth analytics = new AnalyticsByMonth();
            _data.ExecuteCmd(procName, inputParamMapper: null
             , singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 int startingIdx = 0;
                 analytics = MapSingleAnalyticsByMonth(reader, ref startingIdx);
             });
            return analytics;
        }

        private static AnalyticsByMonth MapSingleAnalyticsByMonth(IDataReader reader, ref int startingIdx)
        {   
            AnalyticsByMonth analytics =new AnalyticsByMonth();
           
            analytics.Users = reader.DeserializeObject<List<StatsOverTime>>(startingIdx++);
            analytics.Orgs = reader.DeserializeObject<List<StatsOverTime>>(startingIdx++);
            analytics.Revenues = reader.DeserializeObject<List<StatsOverTime>>(startingIdx++);
            analytics.Orders = reader.DeserializeObject<List<StatsOverTime>>(startingIdx++);
            analytics.Invites = reader.DeserializeObject<List<StatsOverTime>>(startingIdx++);
            return analytics;
        }
        private static InternalOrdersAnalytics MapSingleOrdersAnalytics(IDataReader reader, ref int startingIdx)
        {
            InternalOrdersAnalytics orders = new InternalOrdersAnalytics();

            orders.TotalOrders = reader.GetSafeInt32(startingIdx++);
            orders.PrevMonthOrders = reader.GetSafeInt32(startingIdx++);
            orders.CurrentMonthOrders = reader.GetSafeInt32(startingIdx++);
            orders.CancelledOrders = reader.GetSafeInt32(startingIdx++);
            orders.RefundedOrders = reader.GetSafeInt32(startingIdx++);
            return orders;
        }
        private static OrgRevenueAnalytics MapSingleOrgRevenueAnalytics(IDataReader reader, ref int startingIdx)
        {
            OrgRevenueAnalytics analytics = new OrgRevenueAnalytics();

            analytics.Id = reader.GetSafeInt32(startingIdx++);
            analytics.Name = reader.GetSafeString(startingIdx++);
            analytics.AnnualRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.MonthlyRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.WeeklyRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.TotalOrders = reader.GetSafeInt32(startingIdx++);
            analytics.Invites = reader.GetSafeInt32(startingIdx++);
            return analytics;
        }

        private static InternalUsersAnalytics MapSingleUsersAnalytics(IDataReader reader, ref int startingIdx)
        {
            InternalUsersAnalytics analytics = new InternalUsersAnalytics();

            analytics.TotalUsers = reader.GetSafeInt32(startingIdx++);
            analytics.ActiveUsers = reader.GetSafeInt32(startingIdx++);
            analytics.PrevTotalActiveUsers = reader.GetSafeInt32(startingIdx++);
            analytics.PrevMonthNewUsers = reader.GetSafeInt32(startingIdx++);
            analytics.CurrentMonthNewUsers = reader.GetSafeInt32(startingIdx++);
            analytics.PendingUsers = reader.GetSafeInt32(startingIdx++);
            return analytics;
        }

        private static InternalOrgsAnalytics MapSingleOrgsAnalytics(IDataReader reader, ref int startingIdx)
        {
            InternalOrgsAnalytics analytics = new InternalOrgsAnalytics();

            analytics.TotalOrgs = reader.GetSafeInt32(startingIdx++);
            analytics.ActiveOrgs = reader.GetSafeInt32(startingIdx++);
            analytics.PendingOrgs = reader.GetSafeInt32(startingIdx++);
            analytics.PrevActiveOrgs = reader.GetSafeInt32(startingIdx++);
            analytics.OrgsAddedPrevMonth = reader.GetSafeInt32(startingIdx++);
            analytics.TotalInvites = reader.GetSafeInt32(startingIdx++);
            analytics.PrevMonthInvites = reader.GetSafeInt32(startingIdx++);
            analytics.CurrentMonthInvites = reader.GetSafeInt32(startingIdx++);
            return analytics;
        }

        private static InternalRevenueAnalytics MapSingleRevenueAnalytics(IDataReader reader, ref int startingIdx)
        {
            InternalRevenueAnalytics analytics = new InternalRevenueAnalytics();

            analytics.WeeklyRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.MonthlyRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.AnnualRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.PrevWeeklyRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.PrevMonthlyRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.PrevAnnualRevenue = reader.GetSafeDecimal(startingIdx++);
            analytics.WeeklyRevChange = reader.GetSafeDecimal(startingIdx++);
            analytics.MonthlyRevChange = reader.GetSafeDecimal(startingIdx++);
            analytics.AnnualRevChange = reader.GetSafeDecimal(startingIdx++);
            return analytics;
        }
    }
}
