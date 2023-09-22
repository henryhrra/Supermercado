using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Compra_Interface : Repository_Interface<Compra>
    {
        IEnumerable<SelectListItem> GetListCompras();
        void Update(Compra compra);
    }
}
