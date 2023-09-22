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
    public class Categoria_Repository : Repository<Categoria>, Categoria_Interface
    {
        private readonly ApplicationDbContext _db;
        public Categoria_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListCategorias()
        {
            return _db.Categoria.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idCategoria.ToString()
            });
        }
        public void Update(Categoria categoria)
        {
            var objDesdeDb = _db.Categoria.FirstOrDefault(a => a.idCategoria == categoria.idCategoria);
            objDesdeDb.Nombre = categoria.Nombre;
            objDesdeDb.Descripcion = categoria.Descripcion;
            objDesdeDb.Foto = categoria.Foto;
            _db.SaveChanges();
        }
    }
}
