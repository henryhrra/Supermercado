using Microsoft.AspNetCore.Mvc;
using SuperMercado.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace SuperMercado.Areas.admin.Controllers
{
    public class adminController : Controller
    {



        [Area("admin")]


        public IActionResult Index(string id)
        {
            var claimsIdentity = (ClaimsIdentity)this.User.Identity;
            var usuarioActual = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            ViewData["TitleActive"] = id;
                return View();
           
                
        }

        [Route("/NotFound")]
        public IActionResult PageNotFound()
        {
            return View();
        }


    }
}
