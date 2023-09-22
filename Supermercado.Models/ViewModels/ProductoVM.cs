using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.Models.ViewModels
{
    public class ProductoVM
    {
        public Producto Producto { get; set; }
        IEnumerable<SelectListItem> ListCategorias { get; set; }
  
        IEnumerable<SelectListItem> ListProveedores { get; set; }
       
    }
}
