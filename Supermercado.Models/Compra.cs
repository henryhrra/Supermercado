using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
    public class ValidarFechaAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)// Return a boolean value: true == IsValid, false != IsValid
        {
            DateTime d = Convert.ToDateTime(value);
            return d < DateTime.Now; //Dates Greater than or equal to today are valid (true)

        }
    }
    public class Compra
    {
        [Key]
        public int idCompra { get; set; }
        /*******************************************************************1*/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Descripción")]
    
        public string Descripcion { get; set; }
        /*******************************************************************2*/

        [Required(ErrorMessage = "Fecha Compra: Éste campo es obligatorio")]
        [DataType(DataType.DateTime , ErrorMessage = "Fecha Compra: Éste campo es obligatorio")]
        [ValidarFecha(ErrorMessage = "Fecha Compra: No se permiten fechas  Furutas")]
        [Display(Name = "Fecha de Compra")]
        public DateTime? Fecha_compra { get; set; }
        /*******************************************************************3*/


        [Required(ErrorMessage = "Cantidad: Este Campo es obligatorio")]
        [RegularExpression(@"^\d{1,4}$", ErrorMessage = "Cantidad: Solo se aceptan numeros menores a 10000")]
        public int Cantidad { get; set; }
        /*******************************************************************4*/
        [Required(ErrorMessage = "Este Campo es obligatorio")]
        [RegularExpression(@"^\d{1,5}(?:[.]\d{3})*(?:[.,]\d{1,2})$", ErrorMessage = "El formato es #####.##")]
        [Display(Name ="Precio de Compra")]
        public float Precio_Compra { get; set; }
        /*******************************************************************5*/
        [Required]
        [Display(Name = "Producto")]
        public int idProducto { get; set; }

        [ForeignKey("idProducto")]
        public Producto Producto { get; set; }

        /*******************************************************************6*/

        [DataType(DataType.DateTime)]
        public DateTime? Fecha_registro { get; set; }

    }
}

