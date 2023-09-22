using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    
    public interface SubCategoria_Interface:Repository_Interface<SubCategoria>
    {
        IEnumerable<SelectListItem> GetListSubCategorias();
        void Update(SubCategoria subcategoria);
    }
    
}
