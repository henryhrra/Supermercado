using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
 
    public class Venta
    {
        [Key]
        public int idVenta { get; set; }
        /*******************************************************************1*/

        [DataType(DataType.DateTime)]
        [Display(Name = "Fecha de Venta")]
        public DateTime? Fecha_venta { get; set; }
        /*******************************************************************3*/

        public bool? Aprobada { get; set; }

        [Display(Name = "Cliente")]
        public string idCliente { get; set; }
        [ForeignKey("idCliente")]
        public ApplicationUser ApplicationUser { get; set; }


    }
}

