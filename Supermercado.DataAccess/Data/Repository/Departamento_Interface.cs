using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Departamento_Interface : Repository_Interface<Departamento>
    {
        IEnumerable<SelectListItem> GetListDepartamentos();
        void Update(Departamento departamento);
    }
}
