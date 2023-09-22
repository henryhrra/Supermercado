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
    public class Municipio_Repository : Repository<Municipio>, Municipio_Interface
    {
        private readonly ApplicationDbContext _db;
        public Municipio_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListMunicipios()
        {
            return _db.Municipio.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idMunicipio.ToString()
            });
        }
        public void Update(Municipio municipio)
        {
            var objDesdeDb = _db.Municipio.FirstOrDefault(a => a.idMunicipio == municipio.idMunicipio);
            objDesdeDb.Nombre = municipio.Nombre;
            objDesdeDb.idDepartamento = municipio.idDepartamento;
            _db.SaveChanges();
        }
    }
}
