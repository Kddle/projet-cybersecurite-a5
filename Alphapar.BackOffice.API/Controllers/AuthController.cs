using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;


using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using Alphapar.BackOffice.API.Models;
using System.Net.Http;
using System.Security.Claims;
using System.DirectoryServices.AccountManagement;
using System.Configuration;
using System.Web.Http.Cors;
using Alphapar.BackOffice.API.Logic;

namespace Alphapar.BackOffice.API.Controllers
{
    [EnableCors(origins: "https://localhost", headers: "*", methods: "*")]
    public class AuthController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Authenticate([FromBody] LoginRequest login)
        {
            var loginResponse = new LoginResponse();
            LoginRequest loginRequest = new LoginRequest();
            loginRequest.Username = login.Username;
            loginRequest.Password = login.Password;

            IHttpActionResult response;
            HttpResponseMessage responseMsg = new HttpResponseMessage();
            bool isUsernamePasswordValid = false;

            try
            {
                if (login != null)
                {
                    // For production
                    using (PrincipalContext pc = new PrincipalContext(ContextType.Domain, ConfigurationManager.AppSettings["ADDomainName"]))
                    {
                        isUsernamePasswordValid = pc.ValidateCredentials(loginRequest.Username, loginRequest.Password);
                    }

                    //isUsernamePasswordValid = loginRequest.Password == "admin" ? true : false;
                }

                if (isUsernamePasswordValid)
                {
                    string token = CreateToken(loginRequest.Username);
                    LoggerUtils.WriteLog("New connection to BackOffice : " + loginRequest.Username);

                    return Ok<string>(token);
                }
                else
                {
                    loginResponse.ResponseMessage.StatusCode = System.Net.HttpStatusCode.Unauthorized;
                    response = ResponseMessage(loginResponse.ResponseMessage);

                    LoggerUtils.WriteLog("Connection failed to BackOffice : " + loginRequest.Username);
                    return response;
                }
            }
            catch(Exception ex)
            {
                LoggerUtils.WriteLog("ERROR : AuthController : " + ex.Message + "\r" + "InnerException : " + ex.InnerException);

                loginResponse.ResponseMessage.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                response = ResponseMessage(loginResponse.ResponseMessage);
                return response;
            }
            
        }

        private string CreateToken(string username)
        {
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expires = DateTime.UtcNow.AddHours(1);

            var tokenHandler = new JwtSecurityTokenHandler();

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            });

            const string sec = "this is my custom Secret key for authentication";
            var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(issuer: "http://localhost:52435", audience: "http://localhost:52435", subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);

            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }
    }
}