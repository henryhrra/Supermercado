using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using SuperMercado.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMercado.Controllers
{
    [Area("Cliente")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UContainer_Work_Repository _UContainer_Work;


        public HomeController(ILogger<HomeController> logger, UContainer_Work_Repository UContainer_Work)
        {
            _logger = logger;
            _UContainer_Work = UContainer_Work;
        }

        public IActionResult Index()
        {
            SuperMercadoData superMercado = new SuperMercadoData()
            {
                producto = _UContainer_Work.Producto.GetListProductos(),
                categoria = _UContainer_Work.Categoria.GetListCategorias(),
                subCategoria = _UContainer_Work.SubCategoria.GetListSubCategorias()
        };

           
            return View(superMercado);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
