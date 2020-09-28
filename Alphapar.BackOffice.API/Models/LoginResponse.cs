using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace Alphapar.BackOffice.API.Models
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public HttpResponseMessage ResponseMessage { get; set; }

        public LoginResponse()
        {
            this.Token = "";
            this.ResponseMessage = new HttpResponseMessage() { StatusCode = System.Net.HttpStatusCode.Unauthorized };
        }
    }
}