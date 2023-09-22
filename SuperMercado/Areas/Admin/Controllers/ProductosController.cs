using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using SuperMercado.Utilities;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class ProductosController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductosController(UContainer_Work_Repository UContainer_Work, IWebHostEnvironment webHostEnvironment)
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

        [HttpGet]
        public IActionResult Get(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            Producto producto = _UContainer_Work.Producto.Get(id);
            Sucursal sucursal = _UContainer_Work.Sucursal.Get(producto.idSucursal);
            Proveedor proveedor = _UContainer_Work.Proveedor.Get(producto.idProveedor);
            SubCategoria subCategoria = _UContainer_Work.SubCategoria.Get(producto.idSubCategoria);
            Categoria categoria = _UContainer_Work.Categoria.Get(subCategoria.idCategoria);
            object[] data = new object[] { producto,
                sucursal, categoria, subCategoria, proveedor };
            return Json(new { data = data });
        }

        #region

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            object[] data = new object[] { _UContainer_Work.Producto.GetAll(), _UContainer_Work.Sucursal.GetAll(), _UContainer_Work.Categoria.GetAll(), _UContainer_Work.SubCategoria.GetAll(), _UContainer_Work.Proveedor.GetAll() };
            return Json(new { data = data });
        }
        [HttpGet]
        public IActionResult GetTotalProductos()
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            var total = (from s in _UContainer_Work.Producto.GetAll()
                         select s).Where(s => s.Existencias > 0);
            return Json(new { data = total.ToList().Count() });
        }


        [HttpPost]
        public async Task<IActionResult> Registrar(Producto producto)
        {


            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;

            if (ModelState.IsValid)
            {
                if (archivo.Count > 0)
                {
                    var folder = Path.Combine(rutaPrincipal, @"imgs\productos");
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
                    producto.Foto = @"\imgs\productos\" + imagen;
                }
                else
                {
                    if (!producto.Foto.StartsWith("http"))
                        producto.Foto = @"\imgs\noIMG.jpg";
                }
                producto.Fecha_registro = DateTime.Now.ToString();
                _UContainer_Work.Producto.Add(producto);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Producto agregado Correctamente\nId:" + producto.idProducto });
            }
            string errors = JsonConvert.SerializeObject(ModelState.Values
    .SelectMany(state => state.Errors)
    .Select(error => error.ErrorMessage));
           
            return Json(new { success = false, message = errors });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string path = _webHostEnvironment.WebRootPath;
            Producto producto = _UContainer_Work.Producto.Get(id);
            if (producto == null)
            {
                return Json(new { success = false, message = "Error borrando Producto" });
            }
            var Imagen = Path.Combine(path, producto.Foto.TrimStart('\\'));
            if (!Imagen.EndsWith("noIMG.jpg"))
                if (System.IO.File.Exists(Imagen))
                {
                    System.IO.File.Delete(Imagen);
                }
            _UContainer_Work.Producto.Remove(producto);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Producto borrado Correctamente" });
        }

        [HttpPost]
        public async Task<IActionResult> Actualizar(Producto producto)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            string rutaPrincipal = _webHostEnvironment.WebRootPath;
            var archivo = HttpContext.Request.Form.Files;
            var productoT = _UContainer_Work.Producto.Get(producto.idProducto);
            if (ModelState.IsValid)
            {
                if (archivo.Count() > 0)
                {
                    var folder = Path.Combine(rutaPrincipal, @"imgs\productos");
    
                    var imagen = Path.GetFileName(productoT.Foto);
                    var rutaImagen = Path.Combine(rutaPrincipal, productoT.Foto.TrimStart('\\'));
                    if (!rutaImagen.EndsWith("noIMG.jpg"))
                        if (System.IO.File.Exists(rutaImagen))
                        {
                            System.IO.File.Delete(rutaImagen);
                        }
                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    producto.Foto = @"\imgs\productos\" + imagen;
                }
                else
                {
                    producto.Foto = productoT.Foto;
                    producto.Fecha_registro = productoT.Fecha_registro;
                    producto.Existencias = productoT.Existencias;
                    producto.Existencias_Minimas = productoT.Existencias_Minimas;
                }
                _UContainer_Work.Producto.Update(producto);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Producto Actualizado Correctamente", id = producto.idProducto });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();
            return Json(new { success = false, message = errors });
        }

        #endregion
    }
}