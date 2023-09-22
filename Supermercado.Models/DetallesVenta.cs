using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
 
    public class DetallesVenta
    {
        [Key]
        public int idDetallesVenta { get; set; }
        /*******************************************************************1*/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Cantidad")]
        [Required(ErrorMessage = "Cantidad: Este Campo es obligatorio")]
    
        public int cantidad { get; set; }
        /*******************************************************************2*/

        [Required(ErrorMessage = "Descuento: Este Campo es obligatorio")]
        [Display(Name = "Descuento")]
        public float? descuento { get; set; }

        [Required(ErrorMessage = "Precio: Este Campo es obligatorio")]
        [Display(Name = "Descuento")]
        public float? precio_por_unidad { get; set; }
        /*******************************************************************3*/

        [Required(ErrorMessage = "Descuento: Este Campo es obligatorio")]
        [Display(Name = "Cliente")]
        public int idVenta { get; set; }
        [ForeignKey("idVenta")]
        public Venta Venta { get; set; }

        [Display(Name = "Producto")]
        public int idProducto { get; set; }

        [ForeignKey("idProducto")]
        public Producto Producto { get; set; }

    }
}

