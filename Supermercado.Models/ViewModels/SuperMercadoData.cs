using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.Models.ViewModels
{
    public class SuperMercadoData
    {
        public IEnumerable<SelectListItem> producto { get; set; }
        public IEnumerable<SelectListItem> categoria { get; set; }
        public IEnumerable<SelectListItem> subCategoria { get; set; }

    }
}
