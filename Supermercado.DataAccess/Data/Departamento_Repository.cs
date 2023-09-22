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
    public class Departamento_Repository : Repository<Departamento>, Departamento_Interface
    {
        private readonly ApplicationDbContext _db;
        public Departamento_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListDepartamentos()
        {
            return _db.Departamento.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idDepartamento.ToString()
            });
        }
        public void Update(Departamento departamento)
        {
            var objDesdeDb = _db.Departamento.FirstOrDefault(a => a.idDepartamento == departamento.idDepartamento);
            objDesdeDb.Nombre = departamento.Nombre;
            _db.SaveChanges();
        }
    }
}
