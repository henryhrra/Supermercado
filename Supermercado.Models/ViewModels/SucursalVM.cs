using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.Models.ViewModels
{
    public class SucursalVM
    {
        public Sucursal Sucursal { get; set; }
        IEnumerable<SelectListItem> ListDepartamentos { get; set; }
  
        IEnumerable<SelectListItem> ListMunicipios { get; set; }
       
    }
}
