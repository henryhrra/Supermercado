using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Empleado_Interface:Repository_Interface<Empleado>
    {
        IEnumerable<SelectListItem> GetListEmpleados();
        void Update(Empleado empleado);
    }
}
