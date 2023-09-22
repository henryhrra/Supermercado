using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SuperMercado.Models
{
    public class Cliente
    {
        [Key]
        public int idCliente { get; set; }
        /*******************************************************************1*/

        public string idUsuario { get; set; }
        [ForeignKey("idUsuario")]
        public ApplicationUser ApplicationUser { get; set; }
        /*******************************************************************3*/

        /*******************************************************************4*/


    }
}
