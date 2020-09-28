using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.IO;
using System.Web.Http;
using System.Net.Http.Headers;

namespace Alphapar.BackOffice.API.Controllers
{
    public class HomeController : ApiController
    {
        // GET: Home
        [HttpGet]
        [ActionName("Index")]
        public HttpResponseMessage Index()
        {
            var path = "C:/Users/Administrateur.WIN-5025AKM8LCG/Documents/Chez vic/Alphapar.BackOffice.API/build/index.html";
            var response = new HttpResponseMessage();
            response.Content = new StringContent(File.ReadAllText(path));
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            return response;
        }
    }
}