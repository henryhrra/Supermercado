using SuperMercado.AccesoDatos.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SuperMercado.DataAccess.Data
{
    public class Cliente_Repository : Repository<Cliente>, Cliente_Interface
    {
        private readonly ApplicationDbContext _db;
        public Cliente_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListClientes()
        {
            return _db.Cliente.Select(i => new SelectListItem()
            {
                Text = i.idUsuario.ToString(),
                Value = i.idCliente.ToString()
            });
        }
        public void Update(Cliente cliente)
        {
            var objDesdeDb = _db.Cliente.FirstOrDefault(a => a.idCliente == cliente.idCliente);
            _db.SaveChanges();
        }
    }
}
