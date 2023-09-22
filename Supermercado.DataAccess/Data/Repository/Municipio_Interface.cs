using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Municipio_Interface : Repository_Interface<Municipio>
    {
        IEnumerable<SelectListItem> GetListMunicipios();
        void Update(Municipio municipio);
    }
}
