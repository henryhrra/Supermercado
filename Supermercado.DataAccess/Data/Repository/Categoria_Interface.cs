using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Categoria_Interface:Repository_Interface<Categoria>
    {
        IEnumerable<SelectListItem> GetListCategorias();
        void Update(Categoria categoria);
    }
}
