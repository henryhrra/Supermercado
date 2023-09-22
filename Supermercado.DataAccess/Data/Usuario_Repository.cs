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
    public class Usuario_Repository : Repository<ApplicationUser>, Usuario_Interface
    {
        private readonly ApplicationDbContext _db;
        public Usuario_Repository(ApplicationDbContext db) : base(db)   
        {
            _db = db;
        }

        public void BlockUser(string Usuario)
        {
            var UsuarioDB = _db.ApplicationUser.FirstOrDefault(l => l.Id == Usuario);
            UsuarioDB.LockoutEnd = DateTime.Now.AddDays(30);
            _db.SaveChanges();
        }



        public void UnblockUser(string Usuario)
        {
            var UsuarioDB = _db.ApplicationUser.FirstOrDefault(l => l.Id == Usuario);
            UsuarioDB.LockoutEnd = DateTime.Now;
            _db.SaveChanges();
        }
    }
}
