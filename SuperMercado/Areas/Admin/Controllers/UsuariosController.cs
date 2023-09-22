using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SuperMercado.DataAccess.Data;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using Microsoft.AspNetCore.Hosting;
using SuperMercado.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using SuperMercado.Utilities;
using System.Security.Claims;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class UsuariosController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UsuariosController(UContainer_Work_Repository UContainer_Work, IWebHostEnvironment webHostEnvironment)
        {
            _UContainer_Work = UContainer_Work;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index(string id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            ViewData["TitleActive"] = id;
            return View();
        }



        [HttpPost]
        public IActionResult Desbloquear(string id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (id == null)
            {
                return NotFound();
            }

            _UContainer_Work.Usuario.UnblockUser(id);
            return Json(new { success = true, message = "Usuario Desbloqueado" });
        }


        #region
     



        [HttpPost]
        public async Task<IActionResult> Bloquear(string id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (id == null)
            {
                return NotFound();
            }

            _UContainer_Work.Usuario.BlockUser(id);
            return Json(new { success = true, message = "Usuario Bloqueado" });
        }
        [HttpGet]

        public IActionResult GetAll()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");

            var claimsIdentity = (ClaimsIdentity)this.User.Identity;
            var usuarioActual = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            return Json(new { data = _UContainer_Work.Usuario.GetAll(u => u.Id != usuarioActual.Value) });
        }
        [HttpGet]
        public IActionResult GetTotal()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
          
            return Json(new { data = _UContainer_Work.Usuario.GetAll().ToList().Count() });
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            return Json(new { data = _UContainer_Work.Usuario.Get(id) });
        }


        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {

            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string path = _webHostEnvironment.WebRootPath;


            ApplicationUser Usuario = _UContainer_Work.Usuario.GetFirstOrDefault(u => u.Id == id);
            if (Usuario == null)
            {
                return Json(new { success = false, message = "Error borrando Usuario" });
            }
            var Imagen = Path.Combine(path, Usuario.Foto.TrimStart('\\'));
            if (!Imagen.EndsWith("noIMG.jpg"))
            if (System.IO.File.Exists(Imagen))
            {
                System.IO.File.Delete(Imagen);
            }
            _UContainer_Work.Usuario.Remove(Usuario);
            try
            {
                _UContainer_Work.Save();
            }
            catch (Exception e) {
                return Json(new { success = false, message = e });
            }
            return Json(new { success = true, message = "Usuario borrado Correctamente" });
        }
        #endregion
    }
}
