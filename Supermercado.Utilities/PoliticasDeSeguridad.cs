using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SuperMercado.Utilities;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace SuperMercado.Utilities
{
    public class MyAuthAttribute : Attribute, IAuthorizationFilter
    {

        public string Roles { get; set; }
        public ClaimsIdentity User { get; set; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            //check access 
            if (CheckPermissions(context))
            {
                //all good, add some code if you want. Or don't
            }
            else
            {
                //DENIED!
                //return "ChallengeResult" to redirect to login page (for example)
                context.Result = new LocalRedirectResult("/Identity/Account/login");
            }
        }

        private bool CheckPermissions(AuthorizationFilterContext context)
        {

            return true;
        }
    }
}
