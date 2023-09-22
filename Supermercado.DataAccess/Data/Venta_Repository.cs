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
    public class Venta_Repository : Repository<Venta>, Venta_Interface
    {
        private readonly ApplicationDbContext _db;
        public Venta_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListVentas()
        {
            return _db.Venta.Select(i => new SelectListItem()
            {
                Text = i.Fecha_venta.ToString(),
                Value = i.idVenta.ToString()
            });
        }

        public void UpdateCustomer(Venta venta) {
            var objDesdeDb = _db.Venta.FirstOrDefault(a => a.idVenta == venta.idVenta);
            //objDesdeDb.Cantidad = venta.Cantidad;
            _db.SaveChanges();
        }
        public void UpdateAdmin(Venta venta)
        {
            var objDesdeDb = _db.Venta.FirstOrDefault(a => a.idVenta == venta.idVenta);
            //objDesdeDb.Descripcion = venta.Descripcion;
            objDesdeDb.Aprobada = venta.Aprobada;
            _db.SaveChanges();
        }
    }
}
