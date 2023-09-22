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
    public class Proveedor_Repository : Repository<Proveedor>, Proveedor_Interface
    {
        private readonly ApplicationDbContext _db;
        public Proveedor_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListProveedores()
        {
            return _db.Proveedor.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idProveedor.ToString()
            });
        }
        public void Update(Proveedor proveedor)
        {
            var objDesdeDb = _db.Proveedor.FirstOrDefault(a => a.idProveedor == proveedor.idProveedor);
            objDesdeDb.Nombre = proveedor.Nombre;
            objDesdeDb.Giro = proveedor.Giro;
            //objDesdeDb.Fecha_de_Registro = proveedor.Fecha_de_Registro;
            objDesdeDb.Correo = proveedor.Correo;
            objDesdeDb.pagina_Web = proveedor.pagina_Web;
            objDesdeDb.telefono = proveedor.telefono;
            objDesdeDb.Foto = proveedor.Foto;
            objDesdeDb.Direccion = proveedor.Direccion;
            objDesdeDb.NombreContacto = proveedor.NombreContacto;
            objDesdeDb.telefonoContacto = proveedor.telefonoContacto;
            _db.SaveChanges();
        }
    }
}
