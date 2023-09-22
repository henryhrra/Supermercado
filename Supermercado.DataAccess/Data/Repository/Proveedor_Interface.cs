using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Proveedor_Interface : Repository_Interface<Proveedor>
    {
        IEnumerable<SelectListItem> GetListProveedores();
        void Update(Proveedor proveedor);
    }
}
