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
    public class Slider_Repository : Repository<Slider>, Slider_Interface
    {
        private readonly ApplicationDbContext _db;
        public Slider_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }


        public void Update(Slider slider)
        {
            var objDesdeDb = _db.Slider.FirstOrDefault(a => a.idSlider == slider.idSlider);
            objDesdeDb.imagenPrincipal = slider.imagenPrincipal;
            objDesdeDb.boton1 = slider.boton1;
            objDesdeDb.boton2 = slider.boton2;
            objDesdeDb.parrafo = slider.parrafo;
            objDesdeDb.titulo = slider.titulo;
            _db.SaveChanges();
        }
    }
}
