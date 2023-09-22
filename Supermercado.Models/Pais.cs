using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SuperMercado.Models
{
    public class Pais
    {
        [Key]
        public int idPais { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de País")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Nombre { get; set; }
        /********************************************************************/
        [MaxLength(10)]
        [DataType(DataType.Text)]
        [Display(Name = "Código de Bandera")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Bandera { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Idioma")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Idioma { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Gentilicio")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Gentilicio { get; set; }
    }
}
