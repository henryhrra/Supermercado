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
    public class Compra_Repository : Repository<Compra>, Compra_Interface
    {
        private readonly ApplicationDbContext _db;
        public Compra_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListCompras()
        {
            return _db.Compra.Select(i => new SelectListItem()
            {
                Text = i.Fecha_compra.ToString(),
                Value = i.idCompra.ToString()
            });
        }
        public void Update(Compra compra)
        {
            var objDesdeDb = _db.Compra.FirstOrDefault(a => a.idCompra == compra.idCompra);
            objDesdeDb.Fecha_compra = compra.Fecha_compra;
            objDesdeDb.Fecha_registro = compra.Fecha_registro;
            objDesdeDb.Descripcion = compra.Descripcion;
            objDesdeDb.Cantidad = compra.Cantidad;
            objDesdeDb.Precio_Compra = compra.Precio_Compra;
            objDesdeDb.idProducto = compra.idProducto;
            _db.SaveChanges();
        }
    }
}
