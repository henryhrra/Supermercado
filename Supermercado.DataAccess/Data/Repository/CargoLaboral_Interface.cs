using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface CargoLaboral_Interface : Repository_Interface<CargoLaboral>
    {
        IEnumerable<SelectListItem> GetListCargoLaborales();
        void Update(CargoLaboral cargoLaboral);
    }
}
