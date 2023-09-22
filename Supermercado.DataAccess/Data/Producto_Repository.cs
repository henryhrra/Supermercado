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
    public class Producto_Repository : Repository<Producto>, Producto_Interface
    {
        private readonly ApplicationDbContext _db;
        public Producto_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListProductos()
        {
            return _db.Producto.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idProducto.ToString()
            });
        }
        public void Update(Producto producto)
        {
            var objDesdeDb = _db.Producto.FirstOrDefault(a => a.idProducto == producto.idProducto);
            objDesdeDb.Nombre = producto.Nombre;
            objDesdeDb.Precio_de_Compra = producto.Precio_de_Compra;
            objDesdeDb.Precio_de_Venta = producto.Precio_de_Venta;
            objDesdeDb.Existencias = producto.Existencias;
            objDesdeDb.Existencias_Minimas = producto.Existencias_Minimas;
            objDesdeDb.Descripcion = producto.Descripcion;
            objDesdeDb.idSubCategoria = producto.idSubCategoria;
            objDesdeDb.idSucursal = producto.idSucursal;
            objDesdeDb.idProveedor = producto.idProveedor;
            objDesdeDb.Foto = producto.Foto;
            _db.SaveChanges();
        }
        public void UpdateStocks(Producto producto) {
            var objDesdeDb = _db.Producto.FirstOrDefault(a => a.idProducto == producto.idProducto);
            objDesdeDb.Existencias = producto.Existencias;
            objDesdeDb.Existencias_Minimas = producto.Existencias_Minimas;
            _db.SaveChanges();
        }
        public void UpdatePrice(Producto producto)
        {
            var objDesdeDb = _db.Producto.FirstOrDefault(a => a.idProducto == producto.idProducto);
            objDesdeDb.Precio_de_Compra = producto.Precio_de_Compra;
            objDesdeDb.Precio_de_Venta = producto.Precio_de_Venta;
            _db.SaveChanges();
        }

    }
}
