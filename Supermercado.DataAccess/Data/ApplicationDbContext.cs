using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SuperMercado.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SuperMercado.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Pais> Pais { get; set; }
        public DbSet<Departamento> Departamento { get; set; }
        public DbSet<Municipio> Municipio { get; set; }
        public DbSet<Sucursal> Sucursal { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Empleado> Empleado { get; set; }
        public DbSet<CargoLaboral> CargoLaboral { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<Proveedor> Proveedor { get; set; }
        public DbSet<SubCategoria> SubCategoria { get; set; }
        public DbSet<Compra> Compra { get; set; }
        public DbSet<Venta> Venta { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Slider> Slider { get; set; }
        public DbSet<Ofertas> Ofertas { get; set; }
        public DbSet<DetallesVenta> DetallesVenta { get; set; }
     
    }
}
