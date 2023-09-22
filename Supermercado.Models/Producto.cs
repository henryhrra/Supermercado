using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperMercado.Models
{
    public class Producto
    {
        [Key]
        public int idProducto { get; set; }

        /********************************************************************/

        [MaxLength(200)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre del Producto")]
        [Required(ErrorMessage = "Camplo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ0-9/.,#&%\- ]*$", ErrorMessage = "Solo se permiten caracteres especiales como .,#&%")]
        public string Nombre { get; set; }

        /********************************************************************/

        [DataType(DataType.Date)]
        public string Fecha_registro { get; set; }

        /********************************************************************/

        [Display(Name = "Precio de Compra")]
        public float? Precio_de_Compra { get; set; }

        /********************************************************************/

        [Display(Name = "Precio de Venta")]
        [Required(ErrorMessage = "Camplo Obligatorio")]
        public float? Precio_de_Venta { get; set; }

        /********************************************************************/
        public int Existencias { get; set; }
        /********************************************************************/
        public int? Existencias_Minimas { get; set; }
        /********************************************************************/

        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }

        /********************************************************************/
        public string descuento { get; set; }
        /********************************************************************/
        [Display(Name = "Fotografía")]
        [DataType(DataType.ImageUrl)]
        public string Foto { get; set; }

        /********************************************************************/

        [Required]
        [Display(Name = "Subcategoría")]
        public int idSubCategoria { get; set; }

        [ForeignKey("idSubCategoria")]
        public SubCategoria SubCategoria { get; set; }

        /********************************************************************/

        [Required]
        [Display(Name = "Proveedor")]
        public int idProveedor { get; set; }

        [ForeignKey("idProveedor")]
        public Proveedor Proveedor { get; set; }

        /********************************************************************/

        [Required]
        [Display(Name = "Sucursal")]
        public int idSucursal { get; set; }

        [ForeignKey("idSucursal")]
        public Sucursal Sucursal { get; set; }
    }
}