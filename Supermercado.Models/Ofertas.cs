using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SuperMercado.Models
{
    public class Ofertas
    {
        [Key]
        public int idOferta { get; set; }
        /********************************************************************/
        [Display(Name = "Estado")]
        [Required(ErrorMessage ="Activo: Camplo Obligatorio")]
        public bool activo { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Filtro de Busqueda")]
        [Required(ErrorMessage = "Filtro: Campo Obligatorio")]
        public string Filtro { get; set; }


        [Display(Name = "Porcentaje de descuento")]
        [Required(ErrorMessage = "Porcentaje: Campo Obligatorio")]
        public int porcentaje { get; set; }



        [Display(Name = "Fecha de inicio de oferta")]
        [Required(ErrorMessage = "Inicio: Campo Obligatorio")]
        public DateTime fecha_De_inicio { get; set; }

        [Display(Name = "Duración de Oferta (días)")]
        [Required(ErrorMessage = "Duracción: Campo Obligatorio")]
        public int duracion_De_Oferta { get; set;}

        [Display(Name = "Descripción")]
        [Required(ErrorMessage = "Descripción: Campo Obligatorio")]
        public int descripcion { get; set; }

    }

}
