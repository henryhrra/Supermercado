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
    public class DetallesVenta_Repository : Repository<DetallesVenta>, DetallesVenta_Interface
    {
        private readonly ApplicationDbContext _db;
        public DetallesVenta_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListDetallesVentas()
        {
            return _db.DetallesVenta.Select(i => new SelectListItem()
            {
                Text = i.idProducto.ToString(),
                Value = i.idDetallesVenta.ToString()
            });
        }
        public void Update(DetallesVenta detallesVenta)
        {
            var objDesdeDb = _db.DetallesVenta.FirstOrDefault(a => a.idDetallesVenta == detallesVenta.idDetallesVenta);
            objDesdeDb.idProducto = detallesVenta.idProducto;
            objDesdeDb.idVenta = detallesVenta.idVenta;
            objDesdeDb.cantidad = detallesVenta.cantidad;
            objDesdeDb.descuento = detallesVenta.descuento;
            objDesdeDb.precio_por_unidad = detallesVenta.precio_por_unidad;
            _db.SaveChanges();
        }
    }
}
