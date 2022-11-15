
namespace Web.Api.Controllers
{
    [Route("api/adminanalytics")]
    [ApiController]
    public class AdminAnalyticsApiController : BaseApiController
    {
        private IAdminAnalyticsService _service = null;
        public AdminAnalyticsApiController(IAdminAnalyticsService service, ILogger<AdminAnalyticsApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<ItemResponse<AdminAnalytics>> GetAllAnalytics()
        {
            int code = 200;
            BaseResponse response = null;
            AdminAnalytics analytics = new AdminAnalytics();
            try
            {
                analytics.UsersAnalytics = _service.GetUsersAnalytics();
                analytics.OrgsAnalytics = _service.GetOrgAnalytics();
                analytics.OrgsAnalytics.Revenues = _service.GetOrgRevenues();
                analytics.RevenueAnalytics = _service.GetRevenueAnalytics();
                analytics.OrdersAnalytics = _service.GetOrdersAnalytics();
                if (analytics == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<AdminAnalytics> { Item = analytics };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("orgs")]
        public ActionResult<ItemResponse<InternalOrgsAnalytics>> GetOrgAnalytics()
        {
            int code = 200;
            BaseResponse response = null;
            InternalOrgsAnalytics analytics = null;
            try
            {
                analytics = _service.GetOrgAnalytics();
                analytics.Revenues = _service.GetOrgRevenues();
                if (analytics == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<InternalOrgsAnalytics> { Item = analytics };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("revenues")]
        public ActionResult<ItemResponse<InternalRevenueAnalytics>> GetRevenueAnalytics()
        {
            int code = 200;
            BaseResponse response = null;
            InternalRevenueAnalytics analytics = null;
            try
            {
                analytics = _service.GetRevenueAnalytics();
                if (analytics == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<InternalRevenueAnalytics> { Item = analytics };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("users")]
        public ActionResult<ItemResponse<InternalUsersAnalytics>> GetUsersAnalytics()
        {
            int code = 200;
            BaseResponse response = null;
            InternalUsersAnalytics analytics = null;
            try
            {
                analytics = _service.GetUsersAnalytics();
                if (analytics == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<InternalUsersAnalytics> { Item = analytics };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("orders")]
        public ActionResult<ItemResponse<InternalOrdersAnalytics>> GetOrders()
        {
            int code = 200;
            BaseResponse response = null;
            InternalOrdersAnalytics analytics = null;
            try
            {
                analytics = _service.GetOrdersAnalytics();
                if (analytics == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<InternalOrdersAnalytics> { Item = analytics };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("monthly")]
        public ActionResult<ItemResponse<AnalyticsByMonth>> GetMonthly()
        {
            int code = 200;
            BaseResponse response = null;
            AnalyticsByMonth analytics = null;
            try
            {
                analytics = _service.GetMonthlyAnalytics();
                if (analytics == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<AnalyticsByMonth> { Item = analytics };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
    }
}
