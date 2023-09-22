using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SuperMercado.Models
{
    public class Proveedor
    {
        [Key]
        public int idProveedor { get; set; }
        /********************************************************************/
        [MaxLength(200)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ^\,. ]*$", ErrorMessage = "Nombre: No se permiten caracteres especiales ni números")]
        public string Nombre { get; set; }


        /********************************************************************/
        [MaxLength(200, ErrorMessage = "Giro: Maximo de caracteres es 200")]
        [DataType(DataType.Text)]
        [Display(Name = "Giro")]
        public string Giro { get; set; }


        /********************************************************************/
        [DataType(DataType.Date)]
        public string Fecha_de_Registro { get; set; }



        /********************************************************************/
        [MaxLength(254, ErrorMessage = "Correo: Maximo de caracteres es 254")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Correo Electrónico")]
        public string Correo { get; set; }



        /********************************************************************/
        [MaxLength(50, ErrorMessage = "Correo: Maximo de caracteres es 50")]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de contacto")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string NombreContacto { get; set; }



        /********************************************************************/
        [MaxLength(10, ErrorMessage = "Correo: Maximo de caracteres es 10")]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Teléfono")]
        [RegularExpression(@"^\(?([0-9]{4})\)?[-. ]?([0-9]{4})$", ErrorMessage = "El formato es ####-####")]
        public string telefono { get; set; } 



        /********************************************************************/
        [MaxLength(10, ErrorMessage = "Correo: Maximo de caracteres es 10")]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Teléfono de contacto")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^\(?([0-9]{4})\)?[-. ]?([0-9]{4})$", ErrorMessage = "El formato es ####-####")]
        public string telefonoContacto { get; set; }


        /********************************************************************/
        [MaxLength(254, ErrorMessage = "Correo: Maximo de caracteres es 254")]
        [DataType(DataType.Url)]
        [Display(Name = "Pagina web")]
        public string pagina_Web { get; set; }


        /********************************************************************/
        [MaxLength(254, ErrorMessage = "Correo: Maximo de caracteres es 254")]
        [DataType(DataType.Text)]
        [Display(Name = "Dirección")]
        public string Direccion { get; set; }


        /********************************************************************/
        [Display(Name = "Fotografía")]
        [DataType(DataType.ImageUrl)]
        public string Foto { get; set; }

    }
}
