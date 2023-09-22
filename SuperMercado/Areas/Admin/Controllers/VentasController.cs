using Microsoft.AspNetCore.Mvc;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using System;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using SuperMercado.Utilities;
using System.Security.Claims;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class VentasController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        public VentasController(UContainer_Work_Repository UContainer_Work)
        {
            _UContainer_Work = UContainer_Work;

        }


        public IActionResult Aprobar(int id) {

            Venta venta = _UContainer_Work.Venta.Get(id);
            if (venta == null) {
            return Json(new { success = false, message = "Error, La venta no se encontró" });
            
            }
            venta.Aprobada = true;
            _UContainer_Work.Venta.UpdateAdmin(venta);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "La compra fue aprobada" });
        }


        public IActionResult denegar(int id)
        {

            Venta venta = _UContainer_Work.Venta.Get(id);
            if (venta == null)
            {
                return Json(new { success = false, message = "Error, La venta no se encontró" });

            }
            venta.Aprobada = false;
            _UContainer_Work.Venta.UpdateAdmin(venta);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "La compra fue Rechazada" });
        }

        private float getDescuento(Producto producto) {

            Producto Producto = producto;
            float fDes = 0;
            var descuentos = _UContainer_Work.Ofertas.GetAll();
            if (Producto == null)
            {

                return 0;
            }
            foreach (var descuento in descuentos)
            {
                var listSubCategorias = new List<int>();
                if (Producto.descuento != null)
                    continue;
                if (descuento.activo)
                {
                    DateTime inicioDeOferta = descuento.fecha_De_inicio;
                    DateTime hoy = DateTime.Now;
                    if (inicioDeOferta <= hoy)
                    {
                        dynamic filtro = Newtonsoft.Json.JsonConvert.DeserializeObject(descuento.Filtro);
                        switch (filtro.where.ToString())
                        {
                            case "Categoria":
                                switch (filtro.By.ToString())
                                {
                                    case "id":
                                        listSubCategorias = new List<int>();
                                        int intID = int.Parse(filtro.id.ToString());
                                        var filtrado = (from s in _UContainer_Work.SubCategoria.GetAll()
                                                        select s).Where(s => s.idCategoria == intID);
                                        foreach (var i in filtrado)
                                        {
                                            listSubCategorias.Add(i.idSubCategoria);
                                        }

                                        if (listSubCategorias.Contains(Producto.idSubCategoria))
                                        {
                                            Producto.descuento = (descuento.porcentaje / 100f).ToString();
                                            fDes = float.Parse(Producto.descuento);
                                        }
                                        break;
                                }
                                break;
                            case "Categoria y precio":
                                listSubCategorias = new List<int>();
                                int intID2 = int.Parse(filtro.id.ToString());
                                var filtrado2 = (from s in _UContainer_Work.SubCategoria.GetAll()
                                                 select s).Where(s => s.idCategoria == intID2);
                                foreach (var i in filtrado2)
                                {
                                    listSubCategorias.Add(i.idSubCategoria);
                                }
                                if (listSubCategorias.Contains(Producto.idSubCategoria))
                                {
                                    if (Producto.Precio_de_Venta >= (int)filtro.precio)
                                    {
                                        Producto.descuento = (descuento.porcentaje / 100f).ToString();
                                        fDes = float.Parse(Producto.descuento);
                                    }
                                }
                                break;
                        }
                    }
                }
            };

            return fDes;
        }
        public IActionResult Index(string id)
        {
            ViewData["TitleActive"] = id;
            return View();
        }
        public IActionResult getAll()
        {
          
            List<object> Ventas = new List<object>();
            var ventas = _UContainer_Work.Venta.GetAll();
            foreach (var v in ventas)
            {
                List<object> VentasContenedor = new List<object>();
                var Dventas = (from s in _UContainer_Work.DetallesVenta.GetAll()
                               select s).Where(s => s.idVenta == v.idVenta);
                int index = 0;
                foreach (var venta in Dventas)
                {
                    Producto producto = _UContainer_Work.Producto.Get(venta.idProducto);
                    venta.Producto = producto;
                    index++;
                }

                if (index > 0)
                {
                    VentasContenedor.Add(Dventas);
                    Ventas.Add(VentasContenedor);
                }

            }

            return Json(new { Ventas });
        }


        #region

        [HttpGet]
        public IActionResult Get(int id)
        {
            List<object> Ventas = new List<object>();
            Venta venta = _UContainer_Work.Venta.Get(id);
            var Dventas = (from s in _UContainer_Work.DetallesVenta.GetAll()
                           select s).Where(s => s.idVenta == venta.idVenta);
            Ventas.Add(Dventas);
            return Json(new { Ventas });
        }


        [HttpPost]
        public IActionResult Registrar(string? productos)
        {
            var productosId = productos.Split(',');


            if (User.IsInRole(CNT.Admin)) {
                return Json(new { success = false, message = "Iniciar Sesión desde una cuenta no administrativa para poder realizar compras desde lado cliente, las compras de avastecimiento se realizan desde el área de administración" });
            }
            if (!User.IsInRole(CNT.User))
            {
                return Json(new { success = false, message = "Por favor Inicie sesión para completar su pedido." });
            }
            if (productosId.Length == 0 || productosId == null) {
                return Json(new { success = false, message = "Ocurrió un error inesperado." });
            }
            var claim = (ClaimsIdentity)this.User.Identity;
            var user = claim.FindFirst(ClaimTypes.NameIdentifier);
            Venta Venta = new Venta()
            {
                Fecha_venta = DateTime.Now,
                Aprobada = null,
                idCliente = user.Value,
            };
            _UContainer_Work.Venta.Add(Venta);
                _UContainer_Work.Save();



                foreach (var data in productosId)
                {
                    var ProductoData = data.Split('|');
                    Producto producto = _UContainer_Work.Producto.Get(int.Parse(ProductoData[0]));
                    var descuento = getDescuento(producto);
                int variable1 = int.Parse(ProductoData[1]);
                float fff = float.Parse(producto.Precio_de_Venta.ToString());
                    DetallesVenta detalles = new DetallesVenta()
                    {
                        cantidad = variable1,
                        descuento = descuento,
                        idVenta = Venta.idVenta,
                        precio_por_unidad = fff,
                        idProducto = producto.idProducto
                    };
                    _UContainer_Work.DetallesVenta.Add(detalles);
                    _UContainer_Work.Save();
                }
                return Json(new { success = true, message = "Gracias Por su compra!\nSu pedido su esta procesando para ver los detalles abra su lista de pedidos" });

         
            /*
            for (int i = 0; i < productosId.Length; i++) {
                var ProductoData = productosId[i].Split('|');
                Producto producto = _UContainer_Work.Producto.Get(int.Parse(ProductoData[0]));
                var descuento = getDescuento(producto);
                DetallesVenta detalles = new DetallesVenta()
                {
                    cantidad = int.Parse(ProductoData[1]),
                    descuento = descuento,
                    idVenta = Venta.idVenta,
                    precio_por_unidad = producto.Precio_de_Venta
                };
                _UContainer_Work.DetallesVenta.Add(detalles);
                _UContainer_Work.Save();
            }
            */
            
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
