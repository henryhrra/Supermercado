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
    public class CargoLaboral_Repository : Repository<CargoLaboral>, CargoLaboral_Interface
    {
        private readonly ApplicationDbContext _db;
        public CargoLaboral_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListCargoLaborales()
        {
            return _db.CargoLaboral.Select(i => new SelectListItem()
            {
                Text = i.Nombre,
                Value = i.idCargoLaboral.ToString()
            });
        }
        public void Update(CargoLaboral cargoLaboral)
        {
            var objDesdeDb = _db.CargoLaboral.FirstOrDefault(a => a.idCargoLaboral == cargoLaboral.idCargoLaboral);
            objDesdeDb.Nombre = cargoLaboral.Nombre;
            objDesdeDb.Descripcion = cargoLaboral.Descripcion;
            objDesdeDb.Salario_mensual = cargoLaboral.Salario_mensual;
            _db.SaveChanges();
        }
    }
}
