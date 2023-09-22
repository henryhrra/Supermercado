using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Venta_Interface : Repository_Interface<Venta>
    {
        IEnumerable<SelectListItem> GetListVentas();
        void UpdateCustomer(Venta venta);
        void UpdateAdmin(Venta venta);
    }
}
