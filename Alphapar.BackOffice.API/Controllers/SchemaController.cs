using Alphapar.BackOffice.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Alphapar.BackOffice.API.Controllers
{
    [EnableCors(origins: "https://localhost", headers: "*", methods: "*")]
    [Authorize]
    public class SchemaController : ApiController
    {
        // GET: Schema
        [System.Web.Http.Route("api/Schema/{route}")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult Get(string route)
        {
            IHttpActionResult response;
            HttpResponseMessage responseMsg = new HttpResponseMessage();

            List<string> properties = new List<string>();

            switch (route)
            {
                case "Customers":
                    foreach (PropertyInfo info in typeof(CustomerModel).GetProperties())
                    {
                        if (info.PropertyType == typeof(string) && info.Name != "ID")
                        {
                            properties.Add(info.Name);
                        }
                    }
                    break;
                case "Plans":
                    foreach (PropertyInfo info in typeof(PlanModel).GetProperties())
                    {
                        if (info.PropertyType == typeof(string) && info.Name != "ID" && info.Name != "LastUpdated")
                        {
                            properties.Add(info.Name);
                        }
                    }
                    break;
                case "Machines":
                    foreach (PropertyInfo info in typeof(MachineModel).GetProperties())
                    {
                        if (info.PropertyType == typeof(string) && info.Name != "ID")
                        {
                            properties.Add(info.Name);
                        }
                    }
                    break;
                default:
                    response = ResponseMessage(new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.NotFound });
                    return response;
            }

            return Ok<string[]>(properties.ToArray());
        }
    }
}