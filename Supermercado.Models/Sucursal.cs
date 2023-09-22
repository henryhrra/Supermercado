using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperMercado.Models
{
    public class Sucursal
    {
        [Key]
        public int idSucursal { get; set; }

        /********************************************************************/

        [MaxLength(50)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de la Sucursal")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Nombre { get; set; }

        /********************************************************************/

        [MaxLength(35)]
        [DataType(DataType.Text)]
        [Display(Name = "Ciudad")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Ciudad { get; set; }

        /********************************************************************/

        [MaxLength(10)]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Teléfono")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        [RegularExpression(@"^\(?([0-9]{4})\)?[-. ]?([0-9]{4})$", ErrorMessage = "El formato es ####-####")]
        public string Telefono { get; set; }

        /********************************************************************/

        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Dirección")]
        [Required(ErrorMessage = "Campo Obligatorio")]
        public string Direccion { get; set; }

        /********************************************************************/

        [Required]
        public int idMunicipio { get; set; }

        [ForeignKey("idMunicipio")]
        public Municipio Municipio { get; set; }

        /********************************************************************/
    }
}