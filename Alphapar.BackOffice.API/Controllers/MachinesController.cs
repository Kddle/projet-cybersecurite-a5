using Alphapar.BackOffice.API.Logic;
using Alphapar.BackOffice.DAL.Models;
using Alphapar.BackOffice.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Alphapar.BackOffice.API.Controllers
{
    [EnableCors(origins: "https://192.168.0.130", headers: "*", methods: "*")]
    [Authorize]
    public class MachinesController : ApiController
    {
        private readonly MachineService machineService;

        public MachinesController()
        {
            machineService = new MachineService();
        }
        // GET api/<controller>
        public HttpResponseMessage Get(string id)
        {
            try
            {
                LoggerUtils.WriteLog("MachinesController : GET BY ID - request received");
                var machine = machineService.Get(id);

                if (machine != null)
                    return Request.CreateResponse(HttpStatusCode.OK, machine);

                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Machine not found for provided id.");
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : MachinesController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public HttpResponseMessage GetAll()
        {
            try
            {
                LoggerUtils.WriteLog("MachinesController : GET ALL - request received");
                var machines = machineService.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, machines);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : MachinesController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public void Post([FromBody]MachineModel machine)
        {
            try
            {
                LoggerUtils.WriteLog("MachinesController : POST - request received");
                machineService.Insert(machine);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : MachinesController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }

        public void Delete(string id)
        {
            try
            {
                LoggerUtils.WriteLog("MachinesController : DELETE - request received");
                machineService.Delete(id);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : MachinesController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }

        public void Put([FromBody]MachineModel machine)
        {
            try
            {
                LoggerUtils.WriteLog("MachinesController : PUT - request received");
                machineService.Update(machine);
            }
            catch (Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : MachinesController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);
            }
        }
    }
}