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

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class ClientesController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ClientesController(UContainer_Work_Repository UContainer_Work, IWebHostEnvironment webHostEnvironment)
        {
            _UContainer_Work = UContainer_Work;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index(string id)
        {
            ViewData["TitleActive"] = id;
            return View();
        }
        #region
        [HttpGet]
        public IActionResult GetAll()
        {
            object[] data =new object[]{ _UContainer_Work.Categoria.GetAll(), _UContainer_Work.SubCategoria.GetAll() };
            return Json(new { data = data });
        }
        [HttpGet]
        public IActionResult GetAllCategorias()
        {
            return Json(new { data = _UContainer_Work.Categoria.GetListCategorias()});
        }
        [HttpGet]
        public IActionResult Get(int id)
        {
            return Json(new { data = _UContainer_Work.Categoria.Get(id) });
        }



        [HttpPost]
       // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Registrar(Categoria categoria)
        {
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;

            if (ModelState.IsValid)
            {
               
                var folder = Path.Combine(rutaPrincipal, @"imgs\categorias");
                var imagen = categoria.Nombre + "-" + DateTime.Now.ToString("dd-MM-yyyy-hh-mm-ss") + Path.GetExtension(archivo[0].FileName);
                using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                {
                    archivo[0].CopyTo(fileStreams);
                }
                categoria.Foto = @"\imgs\categorias\" + imagen;
                _UContainer_Work.Categoria.Add(categoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Categoria agregado Correctamente", id = categoria.idCategoria });
            }
            return Json(new { success = false, message = "Categoria no agregado Correctamente" });
        }



        [HttpPost]
        public async Task<IActionResult> Actualizar(Categoria categoria)
        {
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;
            var categoriaT = _UContainer_Work.Categoria.Get(categoria.idCategoria);
            if (ModelState.IsValid)
            {

                if (archivo.Count() > 0)
                {

                    var folder = Path.Combine(rutaPrincipal, @"imgs\categorias");
                    var imagen = categoria.Nombre+"-"+ DateTime.Now.ToString("dd-MM-yyyy-hh-mm-ss") +Path.GetExtension(archivo[0].FileName);
                    var rutaImagen = Path.Combine(rutaPrincipal, categoriaT.Foto.TrimStart('\\'));
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
                    categoria.Foto = categoriaT.Foto;
                }
                _UContainer_Work.Categoria.Update(categoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Categoria Actualizada Correctamente", id = categoria.idCategoria });
            }
            return Json(new { success = false, message = "Categoria no agregado Correctamente" });
        }



        [HttpPost]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegistrarS(SubCategoria subcategoria)
        {
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;

            if (ModelState.IsValid)
            {

                var folder = Path.Combine(rutaPrincipal, @"imgs\categorias\subcategorias");
                var imagen = subcategoria.idCategoria.ToString()+"-" + subcategoria.Nombre + "-" + DateTime.Now.ToString("dd-MM-yyyy-hh-mm-ss") + Path.GetExtension(archivo[0].FileName);
                using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                {
                    archivo[0].CopyTo(fileStreams);
                }
                subcategoria.Foto = @"\imgs\categorias\subcategorias\" + imagen;
                _UContainer_Work.SubCategoria.Add(subcategoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Categoria agregado Correctamente", id = subcategoria.idSubCategoria });
            }
            return Json(new { success = false, message = "Categoria no agregado Correctamente" });
        }

        [HttpPost]
        public async Task<IActionResult> ActualizarSub(SubCategoria subcategoria)
        {
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;
            var subcategoriaT = _UContainer_Work.SubCategoria.Get(subcategoria.idSubCategoria);
            if (ModelState.IsValid)
            {

                if (archivo.Count() > 0)
                {

                    var folder = Path.Combine(rutaPrincipal, @"imgs\categorias\subcategorias");
                    var imagen = subcategoria.idCategoria.ToString()+"-"+ subcategoria.Nombre + "-" + DateTime.Now.ToString("dd-MM-yyyy-hh-mm-ss") + Path.GetExtension(archivo[0].FileName);
                    var rutaImagen = Path.Combine(rutaPrincipal, subcategoriaT.Foto.TrimStart('\\'));
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
                    subcategoria.Foto = subcategoriaT.Foto;
                }
                _UContainer_Work.SubCategoria.Update(subcategoria);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Subcategoria Actualizada Correctamente", id = subcategoria.idSubCategoria });
            }
            return Json(new { success = false, message = "Subcategoria no agregada Correctamente" });
        }


        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            string path = _webHostEnvironment.WebRootPath;
            Categoria categoria = _UContainer_Work.Categoria.Get(id);
            if (categoria == null)
            {
                return Json(new { success = false, message = "Error borrando categoria" });
            }
            var Imagen = Path.Combine(path, categoria.Foto.TrimStart('\\'));
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
            string path = _webHostEnvironment.WebRootPath;
            SubCategoria subcategoria = _UContainer_Work.SubCategoria.Get(id);
            if (subcategoria == null)
            {
                return Json(new { success = false, message = "Error borrando Subcategoria" });
            }
            var Imagen = Path.Combine(path, subcategoria.Foto.TrimStart('\\'));
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
