using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class ProveedoresController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProveedoresController(UContainer_Work_Repository UContainer_Work, IWebHostEnvironment webHostEnvironment)
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
            return Json(new { data = _UContainer_Work.Proveedor.GetAll() });
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            return Json(new { data = _UContainer_Work.Proveedor.Get(id) });
        }

        [HttpPost]
        public async Task<IActionResult> Registrar(Proveedor proveedor)
        {
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;

            if (ModelState.IsValid)
            {
                if (archivo.Count > 0)
                {
                    var folder = Path.Combine(rutaPrincipal, @"imgs\proveedores");
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
                    proveedor.Foto = @"\imgs\proveedores\" + imagen;
                }
                else
                {
                    if (!proveedor.Foto.StartsWith("http"))
                    proveedor.Foto = @"\imgs\noFoto.jpg";
                }
                proveedor.Fecha_de_Registro = DateTime.Now.ToString();
                _UContainer_Work.Proveedor.Add(proveedor);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Proveedor agregado Correctamente\nId:" + proveedor.idProveedor });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                          .Where(y => y.Count > 0)
                          .ToList();
            return Json(new { success = false, message = errors });
        }

        [HttpPost]
        public async Task<IActionResult> Actualizar(Proveedor proveedor)
        {
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;
            var proveedorT = _UContainer_Work.Proveedor.Get(proveedor.idProveedor);
            if (ModelState.IsValid)
            {
                if (archivo.Count() > 0)
                {
                    var folder = Path.Combine(rutaPrincipal, @"imgs\proveedores");
                    var imagen = Path.GetFileName(proveedorT.Foto);
                    var rutaImagen = Path.Combine(rutaPrincipal, proveedorT.Foto.TrimStart('\\'));
                    if (!rutaImagen.EndsWith("noFoto.jpg"))
                        if (System.IO.File.Exists(rutaImagen))
                        {
                            System.IO.File.Delete(rutaImagen);
                        }
                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    proveedor.Foto = @"\imgs\proveedores\" + imagen;
                }
                else
                {
                    if (!proveedor.Foto.StartsWith("http"))
                        proveedor.Foto = proveedorT.Foto;
                    proveedor.Fecha_de_Registro = proveedorT.Fecha_de_Registro;
                }
                _UContainer_Work.Proveedor.Update(proveedor);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Proveedor Actualizado Correctamente", id = proveedor.idProveedor });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                          .Where(y => y.Count > 0)
                          .ToList();
            return Json(new { success = false, message = errors });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            string path = _webHostEnvironment.WebRootPath;
            Proveedor proveedor = _UContainer_Work.Proveedor.Get(id);
            if (proveedor == null)
            {
                return Json(new { success = false, message = "Error borrando proveedor" });
            }
            var Imagen = Path.Combine(path, proveedor.Foto.TrimStart('\\'));
            if (!Imagen.EndsWith("noFoto.jpg"))
                if (System.IO.File.Exists(Imagen))
                {
                    System.IO.File.Delete(Imagen);
                }
            _UContainer_Work.Proveedor.Remove(proveedor);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Proveedor borrado Correctamente" });
        }

        #endregion
    }
}