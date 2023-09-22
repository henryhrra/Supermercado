using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
    public class CargoLaboral
    {
        [Key]
        public int idCargoLaboral { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Cargo Laboral")]
        [Required(ErrorMessage ="Camplo Obligatorio")]
        public string Nombre { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Descripción")]
        [Required(ErrorMessage = "Camplo Obligatorio")]
        public int Descripcion { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [Display(Name = "Salario Mensual")]
        [Required(ErrorMessage = "Camplo Obligatorio")]
        public float Salario_mensual { get; set; }
    }
}

