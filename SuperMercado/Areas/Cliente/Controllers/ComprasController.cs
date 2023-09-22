using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using SuperMercado.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SuperMercado.Areas.cliente.Controllers
{
    [Area("cliente")]
    public class ComprasController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ComprasController(UContainer_Work_Repository UContainer_Work, IWebHostEnvironment webHostEnvironment)
        {
            _UContainer_Work = UContainer_Work;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index(string id)
        {
            
            ViewData["TitleActive"] = id;
            return View();
        }
        public IActionResult Detalles(int id)
        {


            var descuentos = _UContainer_Work.Ofertas.GetAll();
            Producto Producto = _UContainer_Work.Producto.Get(id);
            if (Producto == null) {
                ViewBag.Producto =  Json(new { error = true, id= id });
                return View("PageNotFound");
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
                                    }
                                }
                                break;
                        }
                    }
                }
            };




            ViewBag.Producto = true;
            ViewData["TitleActive"] = id;
            return View(Producto);
        }
        [HttpGet]
        public IActionResult Get(int id)
        {
            
            var descuentos = _UContainer_Work.Ofertas.GetAll();
            Producto Producto = _UContainer_Work.Producto.Get(id);

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
                                    }
                                }
                                break;
                        }
                    }
                }
            };




            object data = Producto;
            return Json(new { data });
        }

        #region
        [HttpGet]
        public IActionResult GetAll()
        {
            var claim = (ClaimsIdentity)this.User.Identity;
            var user = claim.FindFirst(ClaimTypes.NameIdentifier);
            List<object> Ventas = new List<object>();
            var ventas = _UContainer_Work.Venta.GetAll();
            foreach (var v in ventas)
            {
                List<object> VentasContenedor = new List<object>();
                var Dventas = (from s in _UContainer_Work.DetallesVenta.GetAll()
                               select s).Where(s => s.idVenta == v.idVenta &&  v.idCliente == user.Value);
                int index = 0;
                foreach (var venta in Dventas)
                {
                    Producto producto = _UContainer_Work.Producto.Get(venta.idProducto);
                    venta.Producto = producto;
                    index++;
                }

                if (index > 0) {
                    VentasContenedor.Add(Dventas);
                    Ventas.Add(VentasContenedor);
                }
                
            }


            return Json(new { Ventas });
        }

        #endregion
    }
}