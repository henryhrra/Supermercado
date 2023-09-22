using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SuperMercado.Models
{
    public class Departamento
    {
        [Key]
        public int idDepartamento { get; set; }
        /********************************************************************/
        [MaxLength(50)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de Departamento")]
        [Required(ErrorMessage ="Camplo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Nombre { get; set; }
    }
}
