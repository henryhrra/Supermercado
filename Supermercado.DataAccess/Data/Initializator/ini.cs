using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SuperMercado.Models;
using SuperMercado.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SuperMercado.DataAccess.Data.Initializator
{
    public class ini :ini_interface
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ini(ApplicationDbContext db,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public void Initializator()
        {
            try
            {
                if (_db.Database.GetPendingMigrations().Count() > 0) 
                {
                    _db.Database.Migrate();
                }
            }
            catch (Exception)
            {}
            if (_db.Roles.Any(role => role.Name == CNT.Admin))
            {
                return;
            }
            //Creating Roles
            _roleManager.CreateAsync(new IdentityRole(CNT.Admin)).GetAwaiter().GetResult();
            _roleManager.CreateAsync(new IdentityRole(CNT.User)).GetAwaiter().GetResult();
            _roleManager.CreateAsync(new IdentityRole(CNT.Gerente)).GetAwaiter().GetResult();
            _roleManager.CreateAsync(new IdentityRole(CNT.Cajero)).GetAwaiter().GetResult();
            _roleManager.CreateAsync(new IdentityRole(CNT.supervisorVentas)).GetAwaiter().GetResult();
            //Creating Users
            _userManager.CreateAsync(new ApplicationUser
            {
                UserName = "admin@supermercado.com",
                Email = "admin@supermercado.com",
                EmailConfirmed = true,
                Nombres = "DeTodo",
                Apellidos="",
                Fecha_nacimiento=DateTime.Now.ToString("MM/dd/yyyy"),
                Ciudad="Ilobasco",
                Direccion_residencia="",
                Foto = @"\imgs\Logo-alt.svg",
                Sexo =""

        },"Admin123!").GetAwaiter().GetResult();
            ApplicationUser user = _db.ApplicationUser.Where(u => u.Email == "admin@supermercado.com").FirstOrDefault();
            _userManager.AddToRoleAsync(user, CNT.Admin).GetAwaiter().GetResult();
        }
    }
}
