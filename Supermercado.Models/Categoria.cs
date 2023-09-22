using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SuperMercado.Models
{
    public class Categoria
    {
        [Key]
        public int idCategoria { get; set; }
        /********************************************************************/
        [MaxLength(100)]
        [DataType(DataType.Text)]
        [Display(Name = "Nombre de Categoría")]
        [Required(ErrorMessage ="Camplo Obligatorio")]
        public string Nombre { get; set; }
        /********************************************************************/
        [MaxLength(255)]
        [DataType(DataType.Text)]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }
        [Display(Name = "Fotografía")]
        [DataType(DataType.ImageUrl)]
        public string Foto { get; set; }
    }
}
