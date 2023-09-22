using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SuperMercado.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(50)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombres")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Nombres { get; set; }

        /*******************************************************************2*/

        [MaxLength(50)]
        [DataType(DataType.Text)]
        [Display(Name = "Apellidos")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Apellidos { get; set; }

        /*******************************************************************2*/

        [MaxLength(15)]
        [DataType(DataType.Date)]
        [Display(Name = "Fecha de Nacimiento")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Fecha_nacimiento { get; set; }

        /*******************************************************************2*/

        [DataType(DataType.Date)]
        [Display(Name = "Fecha de Registro")]
        public string Fecha_registro { get; set; }

        /*******************************************************************2*/

        [MaxLength(200)]
        [DataType(DataType.Text)]
        [Display(Name = "Dirección de Residencia")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[#.0-9a-zA-Z\s,-]+$", ErrorMessage = "No se permiten caracteres especiales")]
        public string Direccion_residencia { get; set; }

        /*******************************************************************5*/

        [MaxLength(35)]
        [DataType(DataType.Text)]
        [Display(Name = "Ciudad")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Ciudad { get; set; }

        /*******************************************************************6*/

        [MaxLength(1)]
        [DataType(DataType.Text)]
        [Display(Name = "Sexo")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[M{1,1}|F{1,1}]$", ErrorMessage = "Sexo inválido, sólo Masculino o Femenino")]
        public string Sexo { get; set; }

        /*******************************************************************10*/

        [Display(Name = "Fotografía")]
        [DataType(DataType.ImageUrl)]
        public string Foto { get; set; }
    }
}