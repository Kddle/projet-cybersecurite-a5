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
    public class CustomersController : ApiController
    {
        private readonly CustomerService customerService;

        public CustomersController()
        {
            customerService = new CustomerService();
        }

        public HttpResponseMessage Get(string id)
        {
            try
            {
                LoggerUtils.WriteLog("CustomersController : GET BY ID - request received");

                var customer = customerService.Get(id);

                if (customer != null)
                    return Request.CreateResponse(HttpStatusCode.OK, customer);


                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Customer not found for provided id.");
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : CustomersController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public HttpResponseMessage GetAll()
        {
            try
            {
                LoggerUtils.WriteLog("CustomersController : GET ALL - request received");

                var customers = customerService.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, customers);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : CustomersController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public void Post([FromBody]CustomerModel customer)
        {
            try
            {
                LoggerUtils.WriteLog("CustomersController : POST request received");
                customerService.Insert(customer);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : CustomersController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }

        public void Delete(string id)
        {
            try
            {
                LoggerUtils.WriteLog("CustomersController : DELETE request received");
                customerService.Delete(id);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : CustomersController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }

        public void Put([FromBody]CustomerModel customer)
        {
            try
            {
                LoggerUtils.WriteLog("CustomersController : PUT request received");
                customerService.Update(customer);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : CustomersController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }
    }
}