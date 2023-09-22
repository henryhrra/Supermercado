using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SuperMercado.DataAccess.Data;
using SuperMercado.DataAccess.Data.Initializator;
using SuperMercado.DataAccess.Data.Repository;
using SuperMercado.Models;
using SuperMercado.Utilidades;
using SuperMercado.Utilities;

namespace SuperMercado
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection2")));
            services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddErrorDescriber<MensajesDeError>()
                .AddDefaultTokenProviders();
            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddScoped<UContainer_Work_Repository, UContainer_Work>();
            services.AddScoped<ini_interface, ini>();
            services.AddControllersWithViews();
            services.AddRazorPages();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ini_interface dbInit)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }



            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 ||
                context.Response.StatusCode == 500 ||
                context.Response.StatusCode == 503 ||
                context.Response.StatusCode == 403)
                {
                    context.Request.Path = "/NotFound";
                    await next();
                }
            });

   
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            dbInit.Initializator();
            app.UseAuthentication();
            app.UseAuthorization();


           
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{area=cliente}/{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
