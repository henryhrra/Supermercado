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
using System.Security.Claims;
using SuperMercado.Utilities;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]

    public class CategoriasController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CategoriasController(UContainer_Work_Repository UContainer_Work, IWebHostEnvironment webHostEnvironment)
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
        #region
        [HttpGet]
        public IActionResult GetAll()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            object[] data =new object[]{ _UContainer_Work.Categoria.GetAll(), _UContainer_Work.SubCategoria.GetAll() };
            return Json(new { data = data });
        }
        [HttpGet]
        public IActionResult GetAllCategorias()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            return Json(new { data = _UContainer_Work.Categoria.GetListCategorias()});
        }


        [HttpGet]
        public IActionResult GetCategoriasSubcategorias()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            object[] data = new object[] { _UContainer_Work.SubCategoria.GetAll(), _UContainer_Work.Categoria.GetAll() };
            return Json(new { data = data });
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            return Json(new { data = _UContainer_Work.Categoria.Get(id) });
        }

        
        [HttpGet]
        public IActionResult GetS(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            return Json(new { data = _UContainer_Work.SubCategoria.Get(id) });
        }


        [HttpPost]
       // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Registrar(Categoria categoria)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;

            if (ModelState.IsValid)
            {
                var folder = Path.Combine(rutaPrincipal, @"imgs\categorias");
               
                if (archivo.Count > 0)
                {
                    int index = 0;

                    var imagen = index + Path.GetExtension(archivo[0].FileName);
                    var check = Path.Combine(folder, index.ToString() + Path.GetExtension(archivo[0].FileName));
                    while (System.IO.File.Exists(check))
                    {
                        index++;
                        check = Path.Combine(folder, index.ToString() + Path.GetExtension(archivo[0].FileName));
                    }

                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    categoria.Foto = @"\imgs\categorias\" + imagen;
                }
                else {
                    if (!categoria.Foto.StartsWith("http"))
                        categoria.Foto = @"\imgs\noIMG.jpg";
                }
                _UContainer_Work.Categoria.Add(categoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Categoria agregado Correctamente", id = categoria.idCategoria });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(new { success = false, message = errors });
        }



        [HttpPost]
        public async Task<IActionResult> Actualizar(Categoria categoria)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;
            var categoriaT = _UContainer_Work.Categoria.Get(categoria.idCategoria);
            if (ModelState.IsValid)
            {

                if (archivo.Count() > 0)
                {

                    var folder = Path.Combine(rutaPrincipal, @"imgs\categorias");
                    var imagen = Path.GetFileName(categoriaT.Foto);
                    var rutaImagen = Path.Combine(rutaPrincipal, categoriaT.Foto.TrimStart('\\'));
                    if (!rutaImagen.EndsWith("noIMG.jpg"))
                        if (System.IO.File.Exists(rutaImagen))
                    {
                        System.IO.File.Delete(rutaImagen);
                    }
                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    categoria.Foto = @"\imgs\categorias\" + imagen;
                }
                else {
                    if (!categoria.Foto.StartsWith("http"))
                        categoria.Foto = categoriaT.Foto;
                }
                _UContainer_Work.Categoria.Update(categoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Categoria Actualizada Correctamente", id = categoria.idCategoria });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(new { success = false, message = errors });
        }



        [HttpPost]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegistrarS(SubCategoria subcategoria)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;

            if (ModelState.IsValid)
            {

                var folder = Path.Combine(rutaPrincipal, @"imgs\categorias\subcategorias");

                if (archivo.Count > 0)
                {

                    int index = 0;

                    var check = Path.Combine(folder, index.ToString() + Path.GetExtension(archivo[0].FileName));
                    while (System.IO.File.Exists(check))
                    {
                        index++;
                        check = Path.Combine(folder, index.ToString() + Path.GetExtension(archivo[0].FileName));
                    }
                    var imagen = index + Path.GetExtension(archivo[0].FileName);


                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    subcategoria.Foto = @"\imgs\categorias\subcategorias\" + imagen;
                }
                else {
                    if (!subcategoria.Foto.StartsWith("http"))
                        subcategoria.Foto = @"\imgs\noIMG.jpg";
                }
                _UContainer_Work.SubCategoria.Add(subcategoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Categoria agregado Correctamente", id = subcategoria.idSubCategoria });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                          .Where(y => y.Count > 0)
                          .ToList();
            return Json(new { success = false, message = errors });
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarS(SubCategoria subcategoria)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;
            var subcategoriaT = _UContainer_Work.SubCategoria.Get(subcategoria.idSubCategoria);
            if (subcategoriaT == null)
                return Json(new { success = false, message = "Subcategoria no Actualizada" });
            if (ModelState.IsValid)
            {
                if (archivo.Count() > 0)
                {
                    var folder = Path.Combine(rutaPrincipal, @"imgs\categorias\subcategorias");
                    var imagen = Path.GetFileName(subcategoriaT.Foto);
                    var rutaImagen = Path.Combine(rutaPrincipal, subcategoriaT.Foto.TrimStart('\\'));
                    if (!rutaImagen.EndsWith("noIMG.jpg"))
                    if (System.IO.File.Exists(rutaImagen))
                    {
                        System.IO.File.Delete(rutaImagen);
                    }
                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    subcategoria.Foto = @"\imgs\categorias\subcategorias\" + imagen;
                }
                else
                {
                    if (!subcategoria.Foto.StartsWith("http"))
                        subcategoria.Foto = subcategoriaT.Foto;
                }
                _UContainer_Work.SubCategoria.Update(subcategoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Subcategoria Actualizada Correctamente", id = subcategoria.idSubCategoria });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                          .Where(y => y.Count > 0)
                          .ToList();
            return Json(new { success = false, message = errors });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string path = _webHostEnvironment.WebRootPath;
            Categoria categoria = _UContainer_Work.Categoria.Get(id);
            if (categoria == null)
            {
                return Json(new { success = false, message = "Error borrando categoria" });
            }
            var Imagen = Path.Combine(path, categoria.Foto.TrimStart('\\'));
            if (!Imagen.EndsWith("noIMG.jpg"))
                if (System.IO.File.Exists(Imagen))
            {
                System.IO.File.Delete(Imagen);
            }
            _UContainer_Work.Categoria.Remove(categoria);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Categoria borrada Correctamente" });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteS(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string path = _webHostEnvironment.WebRootPath;
            SubCategoria subcategoria = _UContainer_Work.SubCategoria.Get(id);
            if (subcategoria == null)
            {
                return Json(new { success = false, message = "Error borrando Subcategoria" });
            }
            var Imagen = Path.Combine(path, subcategoria.Foto.TrimStart('\\'));
            if (!Imagen.EndsWith("noIMG.jpg"))
            if (System.IO.File.Exists(Imagen))
            {
                System.IO.File.Delete(Imagen);
            }
            _UContainer_Work.SubCategoria.Remove(subcategoria);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Sbcategoria borrada Correctamente" });
        }
        #endregion
    }
}
