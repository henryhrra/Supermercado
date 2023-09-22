using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
    public class Empleado
    {
        [Key]
        public int idEmpleado { get; set; }
       
        /*******************************************************************3*/
    
        /*******************************************************************4*/
        [MaxLength(15)]
        [DataType(DataType.Date)]
        [Display(Name = "Fecha de Contratación")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Fecha_contratacion { get; set; }
        /*******************************************************************5*/

        [MaxLength(10)]
        [Display(Name = "Número único de identidad (DUI)")]
        [RegularExpression(@"^\(?([0-9]{8})\)?[-. ]?([0-9]{1})$", ErrorMessage = "El formato es ########-#")]
        public string Numero_identidad { get; set; }
        [MaxLength(10)]
        [DataType(DataType.Text)]
        [Display(Name = "Número de identidad Tributaria (NIT)")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^\(?([0-9]{8})\)?[-. ]?([0-9]{1})$", ErrorMessage = "El formato es ####-####")]
        public string Numero_nit { get; set; }
        /*******************************************************************13*/
        [Display(Name = "Cargo Laboral")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public int idCargo_Laboral { get; set; }
        [ForeignKey("idCargo_Laboral")]
        public CargoLaboral CargoLaboral { get; set; }
        /*******************************************************************14*/
        [MaxLength(3)]
        [Display(Name = "Horas Laborales Mensuales")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public int Horas_Laborales_Mensuales { get; set; }
        /*******************************************************************15*/
        [Required]
        public int idSucursal { get; set; }
        [ForeignKey("idSucursal")]
        public Sucursal Sucursal { get; set; }



    }
}
