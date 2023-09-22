using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SuperMercado.Models;
using SuperMercado.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SuperMercado.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public RegisterModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender,
            RoleManager<IdentityRole> roleManager, IWebHostEnvironment webHostEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _roleManager = roleManager;
            _webHostEnvironment = webHostEnvironment;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required(ErrorMessage = "Campo Obligatorio")]
            [StringLength(100, ErrorMessage = "Correo no válido")]
            [EmailAddress(ErrorMessage = "Correo no válido")]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Campo Obligatorio")]
            [StringLength(20, ErrorMessage = "El minimo de caractedes es 6 y maximo de 20", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            [RegularExpression(@"^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{8,20}$", ErrorMessage = "Contraseña no válida debe contener al menos <br>1 Mayúscula<br>1 Minúscula<br>1 Número<br>1 Caracter especial<br>6 Caracteres mínimos y 20 máximo")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirm password")]
            [Compare("Password", ErrorMessage = "Las contraseñas no coinciden")]
            public string ConfirmPassword { get; set; }

            public string PhoneNumber { get; set; }

            [MaxLength(50)]
            [DataType(DataType.Text)]
            [Display(Name = "Nombres")]
            [Required(ErrorMessage = "Campo Obligatorio")]
            [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
            public string Nombres { get; set; }

            [MaxLength(50)]
            [DataType(DataType.Text)]
            [Display(Name = "Apellidos")]
            [Required(ErrorMessage = "Campo Obligatorio")]
            [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
            public string Apellidos { get; set; }

            [MaxLength(15)]
            [DataType(DataType.Date)]
            [Display(Name = "Fecha de Nacimiento")]
            [Required(ErrorMessage = "Campo Obligatorio")]
            public string Fecha_nacimiento { get; set; }

            [DataType(DataType.Date)]
            [Display(Name = "Fecha de Contratación")]
            public DateTime Fecha_registro { get; set; }

            [MaxLength(200)]
            [DataType(DataType.Text)]
            [Display(Name = "Direccion de Residencia")]
            [Required(ErrorMessage = "Campo Obligatorio")]
            public string Direccion_residencia { get; set; }

            [MaxLength(35)]
            [DataType(DataType.Text)]
            [Display(Name = "Ciudad")]
            [Required(ErrorMessage = "Campo Obligatorio")]
            public string Ciudad { get; set; }

            [MaxLength(9)]
            [DataType(DataType.Text)]
            [Display(Name = "Sexo")]
            [Required(ErrorMessage = "Campo Obligatorio")]
            public string Sexo { get; set; }

            [Display(Name = "Fotografía")]
            [DataType(DataType.ImageUrl)]
            public string Foto { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
              
                /*
                string rutaPrincipal = _webHostEnvironment.WebRootPath;
                var archivo = HttpContext.Request.Form.Files;
                var folder = Path.Combine(rutaPrincipal, @"imgs\usuarios");

                var FotoPic = "";
                if (archivo.Count > 0)
                {


                    int index = 0;

                    var check = Path.Combine(folder, index.ToString() + Path.GetExtension(archivo[0].FileName));
                    while (System.IO.File.Exists(check))
                    {
                        index++;
                        check = Path.Combine(folder, index.ToString() + Path.GetExtension(archivo[0].FileName));
                    }
                    var imagen = index + Path.GetExtension(archivo[0].FileName);
                    using (var fileStreams = new FileStream(Path.Combine(folder, imagen), FileMode.Create))
                    {
                        archivo[0].CopyTo(fileStreams);
                    }
                    FotoPic = @"\imgs\usuarios\" + imagen;
                }
                else
                {
                    FotoPic = @"\imgs\noFoto.jpg";
              
                }*/
                var user = new ApplicationUser
                {
                    UserName = Input.Email,
                    Email = Input.Email,
                    Nombres = Input.Nombres,
                    Apellidos = Input.Apellidos,
                    Fecha_nacimiento = Input.Fecha_nacimiento,
                    Fecha_registro = DateTime.Now.ToString("MM/dd/yyyy"),
                    Direccion_residencia = Input.Direccion_residencia,
                    Ciudad = Input.Ciudad,
                    Sexo = Input.Sexo,
                    Foto = @"\imgs\noFoto.jpg",
                    PhoneNumber = Input.PhoneNumber,
                    EmailConfirmed = true
                };
                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    if (!await _roleManager.RoleExistsAsync(CNT.Admin))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(CNT.Admin));
                        await _roleManager.CreateAsync(new IdentityRole(CNT.User));
                        await _roleManager.CreateAsync(new IdentityRole(CNT.Gerente));
                        await _roleManager.CreateAsync(new IdentityRole(CNT.Cajero));
                        await _roleManager.CreateAsync(new IdentityRole(CNT.supervisorVentas));
                    }

                    string role = Request.Form["roleUser"].ToString();
                    if (role == CNT.Admin)
                    {
                        await _userManager.AddToRoleAsync(user, CNT.Admin);
                
                    } else
                            await _userManager.AddToRoleAsync(user, CNT.User);
                   
                      
                       
                  
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return LocalRedirect(returnUrl);
                    _logger.LogInformation("User created a new account with password.");

                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    //var callbackUrl = Url.Page(
                    //    "/Account/ConfirmEmail",
                    //    pageHandler: null,
                    //    values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                    //    protocol: Request.Scheme);

                    //await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                    //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    //{
                    //    return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    //}
                    //else
                    //{
                    //    await _signInManager.SignInAsync(user, isPersistent: false);
                    //    return LocalRedirect(returnUrl);
                    //}
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}