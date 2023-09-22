using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Pais_Interface:Repository_Interface<Pais>
    {
        IEnumerable<SelectListItem> GetListPaises();
        void Update(Pais pais);
    }
}
