using Microsoft.AspNetCore.Mvc;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using System;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class ComprasController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        public ComprasController(UContainer_Work_Repository UContainer_Work)
        {
            _UContainer_Work = UContainer_Work;
   
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
            object[] data = new object[] { _UContainer_Work.Compra.GetAll(), _UContainer_Work.Producto.GetAll(), _UContainer_Work.Proveedor.GetAll()};
            return Json(new { data = data });
        }
        [HttpGet]
        public IActionResult Get(int id)
        {
            Compra compra = _UContainer_Work.Compra.Get(id);
            Producto producto = _UContainer_Work.Producto.Get(compra.idProducto);
            object[] data = new object[] { compra,producto};
            return Json(new { data = data });
        }
        public IActionResult GetAllProveedores()
        {
            return Json(new { data = _UContainer_Work.Proveedor.GetAll() });
        }
        public IActionResult GetAllProductosPP(int id)
        {
            return Json(new { data = _UContainer_Work.Producto.GetAll(producto => producto.idProveedor == id) });
        }


        [HttpPost]
        public async Task<IActionResult> Registrar(Compra compra)
        {
            if (ModelState.IsValid)
            {
                Producto producto = _UContainer_Work.Producto.Get(compra.idProducto);
               
                if (producto == null) {
                    return Json(new { success = false, message = "Compra no agregada Hay un error con el producto" });
                }
                if (compra.Cantidad > 0) {
                    producto.Existencias += compra.Cantidad;
                    producto.Existencias_Minimas =(int)(producto.Existencias * 0.15);
                    _UContainer_Work.Producto.UpdateStocks(producto);
                }
                producto.Precio_de_Compra = compra.Precio_Compra;
                _UContainer_Work.Producto.UpdatePrice(producto);
                _UContainer_Work.Compra.Add(compra);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Compra agregada Correctamente\nId:"+compra.idCompra });
            }
            string errors = JsonConvert.SerializeObject(ModelState.Values
    .SelectMany(state => state.Errors)
    .Select(error => error.ErrorMessage));

            return Json(new { success = false, message = errors });
        }
        [HttpPost]
        public async Task<IActionResult> Actualizar(Compra compra)
        {
            var compraT = _UContainer_Work.Compra.Get(compra.idCompra);
            if(compraT==null)
                return Json(new { success = false, message = "Compra no Actualizada Correctamente" });
            if (ModelState.IsValid)
            {

                if ((DateTime.Now - (DateTime)compraT.Fecha_registro).Days > 1) {
                    return Json(new { success = false, message = "Compra no Actualizada Porque la fecha de actualización límite se alcanzó" });
                }
                if (compra.Cantidad > -1) {
                    Producto producto = _UContainer_Work.Producto.Get(compra.idProducto);
                    if (producto.Existencias < compraT.Cantidad) {
                        return Json(new { success = false, message = "Compra no Actualizada Porque las Existencias son insuficientes" });
                    }
                    producto.Existencias = producto.Existencias - compraT.Cantidad;
                    producto.Existencias = producto.Existencias + compra.Cantidad;
                    _UContainer_Work.Producto.UpdateStocks(producto);
                }
                 compra.Fecha_compra = compraT.Fecha_compra;
                 compra.Fecha_registro = compraT.Fecha_registro;
                _UContainer_Work.Compra.Update(compra);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Compra Actualizada Correctamente"});
            }
            return Json(new { success = false, message = "Compra no Actualizada Correctamente" });
        }
        

        #endregion
    }
}
