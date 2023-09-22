using SuperMercado.DataAccess.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data
{
    public class UContainer_Work : UContainer_Work_Repository
    {
        private readonly ApplicationDbContext _db;
        public UContainer_Work(ApplicationDbContext db)
        {
            _db = db;
            Categoria = new Categoria_Repository(_db);
            Pais = new Pais_Repository(_db);
            Departamento = new Departamento_Repository(_db);
            Municipio = new Municipio_Repository(_db);
            Sucursal = new Sucursal_Repository(_db);
            Cliente = new Cliente_Repository(_db);
            Empleado = new Empleado_Repository(_db);
            CargoLaboral = new CargoLaboral_Repository(_db);
            Producto = new Producto_Repository(_db);
            Proveedor = new Proveedor_Repository(_db);
            SubCategoria = new SubCategoria_Repository(_db);
            Compra = new Compra_Repository(_db);
            Venta = new Venta_Repository(_db);
            Usuario = new Usuario_Repository(_db);
            Slider = new Slider_Repository(_db);
            Ofertas = new Ofertas_Repository(_db);
            DetallesVenta = new DetallesVenta_Repository(_db);
        }
        public Categoria_Repository Categoria { get; private set; }
        public Pais_Repository Pais { get; private set; } 
        public Departamento_Repository Departamento { get; private set; } 
        public Municipio_Repository Municipio { get; private set; } 
        public Sucursal_Repository Sucursal { get; private set; } 
        public Cliente_Repository Cliente { get; private set; } 
        public Empleado_Repository Empleado { get; private set; } 
        public CargoLaboral_Repository CargoLaboral { get; private set; } 
        public Producto_Repository Producto { get; private set; } 
        public Proveedor_Repository Proveedor { get; private set; } 
        public SubCategoria_Repository SubCategoria { get; private set; } 
        public Compra_Repository Compra { get; private set; } 
        public Venta_Repository Venta { get; private set; } 
        public Usuario_Repository Usuario { get; private set; } 
        public Slider_Repository Slider { get; private set; } 
        public Ofertas_Repository Ofertas { get; private set; } 
        public DetallesVenta_Repository DetallesVenta { get; private set; } 


        public void Dispose()
        {
            _db.Dispose();
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
