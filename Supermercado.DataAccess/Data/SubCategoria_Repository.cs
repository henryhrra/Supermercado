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
    public class SubCategoria_Repository : Repository<SubCategoria>, SubCategoria_Interface
    {
        private readonly ApplicationDbContext _db;
        public SubCategoria_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListSubCategorias()
        {
            return _db.SubCategoria.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idSubCategoria.ToString()
            });
        }
        public void Update(SubCategoria subcategoria)
        {
            var objDesdeDb = _db.SubCategoria.FirstOrDefault(a => a.idSubCategoria == subcategoria.idSubCategoria);
            objDesdeDb.Nombre = subcategoria.Nombre;
            objDesdeDb.idCategoria = subcategoria.idCategoria;
            objDesdeDb.Descripcion = subcategoria.Descripcion;
            objDesdeDb.Foto = subcategoria.Foto;
            _db.SaveChanges();
        }
    }
    
}
