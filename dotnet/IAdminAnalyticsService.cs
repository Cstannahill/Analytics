namespace Services.Interfaces
{
    public interface IAdminAnalyticsService
    {
        public InternalUsersAnalytics GetUsersAnalytics();
        public InternalOrgsAnalytics GetOrgAnalytics();
        public InternalRevenueAnalytics GetRevenueAnalytics();
        public List<OrgRevenueAnalytics> GetOrgRevenues();
        public InternalOrdersAnalytics GetOrdersAnalytics();
        public AnalyticsByMonth GetMonthlyAnalytics();
    }
}
