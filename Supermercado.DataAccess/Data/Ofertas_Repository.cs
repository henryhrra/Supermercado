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
    public class Ofertas_Repository : Repository<Ofertas>, Ofertas_Interface
    {
        private readonly ApplicationDbContext _db;
        public Ofertas_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Ofertas oferta)
        {
            var objDesdeDb = _db.Ofertas.FirstOrDefault(a => a.idOferta == oferta.idOferta);
            objDesdeDb.activo = oferta.activo;
            objDesdeDb.Filtro = oferta.Filtro;
            objDesdeDb.fecha_De_inicio = oferta.fecha_De_inicio;
            objDesdeDb.porcentaje = oferta.porcentaje;
            objDesdeDb.duracion_De_Oferta = oferta.duracion_De_Oferta;
            objDesdeDb.descripcion = oferta.descripcion;
            _db.SaveChanges();
        }
    }
}
