using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface DetallesVenta_Interface : Repository_Interface<DetallesVenta>
    {
        IEnumerable<SelectListItem> GetListDetallesVentas();
        void Update(DetallesVenta detallesVenta);
    }
}
