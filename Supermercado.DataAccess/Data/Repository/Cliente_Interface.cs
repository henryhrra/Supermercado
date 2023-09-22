using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.AccesoDatos.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface Cliente_Interface:Repository_Interface<Cliente>
    {
        IEnumerable<SelectListItem> GetListClientes();
        void Update(Cliente cliente);
    }
}
