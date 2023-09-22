using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
    public class Municipio
    {
        [Key]
        public int idMunicipio { get; set; }
        /********************************************************************/
        [MaxLength(50)]
        [DataType(DataType.Text)]
        [Display(Name = "Municipio")]
        [Required(ErrorMessage ="Camplo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Nombre { get; set; }
        /********************************************************************/
        [Required]
        public int idDepartamento { get; set; }
        [ForeignKey("idDepartamento")]
        public Departamento Departamento { get; set; }
    }
}

