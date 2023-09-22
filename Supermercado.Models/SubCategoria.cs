using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperMercado.Models
{
    public class SubCategoria
    {
        [Key]
        public int idSubCategoria { get; set; }
        
        public int idCategoria { get; set; }

        [ForeignKey("idCategoria")]
        public Categoria Categoria { get; set; }

        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de Subcategoría")]
        [Required(ErrorMessage = "Camplo Obligatorio")]
        [RegularExpression(@"^[A-Za-zÀ-ÿ ]*$", ErrorMessage = "No se permiten caracteres especiales ni números")]
        public string Nombre { get; set; }

        [MaxLength(150)]
        [DataType(DataType.Text)]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }

        [DataType(DataType.ImageUrl)]
        [Display(Name = "Fotografia")]
        public string Foto { get; set; }
    }
}