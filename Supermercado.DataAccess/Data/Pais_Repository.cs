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
    public class Pais_Repository : Repository<Pais>, Pais_Interface
    {
        private readonly ApplicationDbContext _db;
        public Pais_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListPaises()
        {
            return _db.Pais.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idPais.ToString()
            });
        }
        public void Update(Pais pais)
        {
            var objDesdeDb = _db.Pais.FirstOrDefault(a => a.idPais == pais.idPais);
            objDesdeDb.Nombre = pais.Nombre;
            objDesdeDb.Bandera = pais.Bandera;
            objDesdeDb.Gentilicio = pais.Gentilicio;
            objDesdeDb.Idioma = pais.Idioma;
            _db.SaveChanges();
        }
    }
}
