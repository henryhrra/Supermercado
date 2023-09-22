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
    public class Sucursal_Repository : Repository<Sucursal>, Sucursal_Interface
    {
        private readonly ApplicationDbContext _db;
        public Sucursal_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListSucursales()
        {
            return _db.Sucursal.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idSucursal.ToString()
            });
        }
        public void Update(Sucursal sucursal)
        {
            var objDesdeDb = _db.Sucursal.FirstOrDefault(a => a.idSucursal == sucursal.idSucursal);
            objDesdeDb.Nombre = sucursal.Nombre;
            objDesdeDb.Ciudad = sucursal.Ciudad;
            objDesdeDb.Direccion = sucursal.Direccion;
            objDesdeDb.Telefono = sucursal.Telefono;
            objDesdeDb.idMunicipio = sucursal.idMunicipio;
            _db.SaveChanges();
        }
    }
}
