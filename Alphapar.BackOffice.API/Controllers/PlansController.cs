using Alphapar.BackOffice.API.Logic;
using Alphapar.BackOffice.DAL.Models;
using Alphapar.BackOffice.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Alphapar.BackOffice.API.Controllers
{
    [EnableCors(origins: "https://localhost", headers: "*", methods: "*")]
    [Authorize]
    public class PlansController : ApiController
    {
        private readonly PlanService planService;

        public PlansController()
        {
            planService = new PlanService();
        }

        public HttpResponseMessage Get(string id)
        {
            try
            {
                LoggerUtils.WriteLog("PlansController : GET BY ID - request received");
                var plan = planService.Get(id);

                return Request.CreateResponse(HttpStatusCode.OK, plan);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : PlansController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public HttpResponseMessage GetAll()
        {
            try
            {
                LoggerUtils.WriteLog("PlansController : GET ALL - request received");
                var plans = planService.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, plans);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : PlansController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public void Post([FromBody]PlanModel plan)
        {
            try
            {
                LoggerUtils.WriteLog("PlansController : POST - request received");
                plan.LastUpdated = DateTime.Now;
                planService.Insert(plan);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : PlansController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }

        public void Delete(string id)
        {
            try
            {
                LoggerUtils.WriteLog("PlansController : DELETE - request received");
                planService.Delete(id);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : PlansController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }

        public void Put([FromBody]PlanModel plan)
        {
            try
            {
                LoggerUtils.WriteLog("PlansController : PUT - request received");
                plan.LastUpdated = DateTime.Now;
                planService.Update(plan);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : PlansController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }
    }
}