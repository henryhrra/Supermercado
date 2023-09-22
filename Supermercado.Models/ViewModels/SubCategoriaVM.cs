using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.Models.ViewModels
{
    public class SubCategoriaVM
    {
       public SubCategoria SubCategoria { get; set; }
        IEnumerable<SelectListItem> ListCategorias { get; set; }
    }
}
