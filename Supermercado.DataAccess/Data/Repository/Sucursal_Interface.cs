using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Sucursal_Interface:Repository_Interface<Sucursal>
    {
        IEnumerable<SelectListItem> GetListSucursales();
        void Update(Sucursal sucursal);
    }
}
