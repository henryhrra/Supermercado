using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SuperMercado.Models
{
    public class Slider
    {
        [Key]
        public int idSlider { get; set; }
        /********************************************************************/
        [DataType(DataType.ImageUrl)]
        [Display(Name = "Imagen Principal")]
        [Required(ErrorMessage ="Camplo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string imagenPrincipal { get; set; }
        [DataType(DataType.Text)]
        [Display(Name = "Accion Botón Izqierdo")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string boton1 { get; set; }
        [DataType(DataType.Text)]
        [Display(Name = "Accion Botón Derecho")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string boton2 { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Título")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string titulo { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Párrafo")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string parrafo { get; set; }
    }

}
