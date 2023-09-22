using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Producto_Interface : Repository_Interface<Producto>
    {
        IEnumerable<SelectListItem> GetListProductos();
        void Update(Producto producto);
        void UpdateStocks(Producto producto);
        void UpdatePrice(Producto producto);
    }
}
