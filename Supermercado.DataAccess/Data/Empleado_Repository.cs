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
    public class Empleado_Repository : Repository<Empleado>, Empleado_Interface
    {
        private readonly ApplicationDbContext _db;
        public Empleado_Repository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public IEnumerable<SelectListItem> GetListEmpleados()
        {
            return _db.Empleado.Select(i => new SelectListItem()
            {
                Text = i.Numero_identidad,
                Value = i.idEmpleado.ToString()
            });
        }
        public void Update(Empleado empleado)
        {
            var objDesdeDb = _db.Empleado.FirstOrDefault(a => a.idEmpleado == empleado.idEmpleado);

            //objDesdeDb.Fecha_registro = empleado.Fecha_registro;
            objDesdeDb.Numero_identidad   = empleado.Numero_identidad;
            objDesdeDb.Horas_Laborales_Mensuales   = empleado.Horas_Laborales_Mensuales;
            objDesdeDb.Numero_identidad   = empleado.Numero_identidad;
            objDesdeDb.Numero_nit   = empleado.Numero_nit;
            _db.SaveChanges();
        }
    }
}
