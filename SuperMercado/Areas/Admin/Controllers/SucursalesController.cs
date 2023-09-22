using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SuperMercado.DataAccess.Data;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using SuperMercado.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SuperMercado.Areas.admin.Controllers
{
    [Area("admin")]
    public class SucursalesController : Controller
    {
        private readonly UContainer_Work_Repository _UContainer_Work;
        public SucursalesController(UContainer_Work_Repository UContainer_Work)
        {
            _UContainer_Work = UContainer_Work;
        }
        public IActionResult Index(string id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            ViewData["TitleActive"] = id;
            return View();
        }
        #region
        [HttpGet]
        public IActionResult GetAll() 
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            object[] data = new object[] { _UContainer_Work.Sucursal.GetAll(), _UContainer_Work.Departamento.GetAll(),_UContainer_Work.Municipio.GetAll() };
            return Json(new { data = data });
        }
        [HttpGet]
        public IActionResult Get(int id) 
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            Sucursal sucursal = _UContainer_Work.Sucursal.Get(id);
            Municipio municipio = _UContainer_Work.Municipio.Get(sucursal.idMunicipio);
            Departamento departamento = _UContainer_Work.Departamento.Get(municipio.idDepartamento);
            object[] data = new object[] {sucursal, municipio, departamento};
            return Json(new {data = data });
        }
        [HttpGet]
        public IActionResult GetD(int id) 
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            return Json(new {data = _UContainer_Work.Departamento.Get(id) });
        }
        [HttpGet]
        public IActionResult GetM(int id) 
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            return Json(new {data = _UContainer_Work.Municipio.Get(id) });
        }
        [HttpGet]
        public IActionResult GetDepartamentosMunicipios() 
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            object[] data = new object[] { _UContainer_Work.Municipio.GetAll() ,_UContainer_Work.Departamento.GetAll()};
            return Json(new { data = data });
        }
        [HttpPost]
        public async Task<IActionResult> Registrar(Sucursal sucursal)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (ModelState.IsValid)
            {

                _UContainer_Work.Sucursal.Add(sucursal);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Sucursal agregada Correctamente", id = sucursal.idSucursal });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                          .Where(y => y.Count > 0)
                          .ToList();
            return Json(new { success = false, message = errors });
        }
        [HttpPost]
        public async Task<IActionResult> RegistrarD(Departamento departamento)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (ModelState.IsValid)
            {

                _UContainer_Work.Departamento.Add(departamento);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Departamento agregado Correctamente", id = departamento.idDepartamento });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                         .Where(y => y.Count > 0)
                         .ToList();
            return Json(new { success = false, message = errors });
        }
        [HttpPost]
        public async Task<IActionResult> RegistrarM(Municipio municipio)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");

            if (ModelState.IsValid)
            {

                _UContainer_Work.Municipio.Add(municipio);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Municipio Agregado Correctamente", id = municipio.idMunicipio });
            }
            var errors = ModelState.Select(x => x.Value.Errors)
                          .Where(y => y.Count > 0)
                          .ToList();
            return Json(new { success = false, message = errors });
        }
        //Metodo para eliminar las Sucursales
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            Sucursal sucursal = _UContainer_Work.Sucursal.Get(id);
            if (sucursal == null)
            {
                return Json(new { success = false, message = "Error borrando sucursal" });
            }
            _UContainer_Work.Sucursal.Remove(sucursal);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Sucursal borrada Correctamente" });
        }
        //Metodo para eliminar los Departamentos
        [HttpPost]
        public async Task<IActionResult> DeleteD(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            Departamento departamento = _UContainer_Work.Departamento.Get(id);
            if (departamento == null)
            {
                return Json(new { success = false, message = "Error borrando departamento" });
            }
            _UContainer_Work.Departamento.Remove(departamento);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Departamento borrado Correctamente" });
        }  
        //Metodo para eliminar los municipios
        [HttpPost]
        public async Task<IActionResult> DeleteM(int id)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            Municipio municipio = _UContainer_Work.Municipio.Get(id);
            if (municipio == null)
            {
                return Json(new { success = false, message = "Error borrando municipio" });
            }
            _UContainer_Work.Municipio.Remove(municipio);
            _UContainer_Work.Save();
            return Json(new { success = true, message = "Municipio borrado Correctamente" });
        }
        [HttpPost]
        public async Task<IActionResult> Actualizar(Sucursal sucursal)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (ModelState.IsValid)
            {
                _UContainer_Work.Sucursal.Update(sucursal);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Sucursal Actualizada Correctamente", id = sucursal.idSucursal });
            }
            return Json(new { success = false, message = "Sucursal no Actualizada Correctamente" });
        } 
        [HttpPost]
        public async Task<IActionResult> ActualizarD(Departamento departamento)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (ModelState.IsValid)
            {
                _UContainer_Work.Departamento.Update(departamento);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Departamento Actualizado Correctamente", id = departamento.idDepartamento });
            }
            return Json(new { success = false, message = "Departamento no Actualizado Correctamente" });
        }
        [HttpPost]
        public async Task<IActionResult> ActualizarM(Municipio numicipio)
        {
            if (!User.IsInRole(CNT.Admin))
                return View("Detdead");
            if (ModelState.IsValid)
            {
                _UContainer_Work.Municipio.Update(numicipio);
                _UContainer_Work.Save();
                return Json(new { success = true, message = "Municipio Actualizado Correctamente", id = numicipio.idMunicipio });
            }
            return Json(new { success = false, message = "Municipio no Actualizado Correctamente" });
        }

        #endregion
    }
}
