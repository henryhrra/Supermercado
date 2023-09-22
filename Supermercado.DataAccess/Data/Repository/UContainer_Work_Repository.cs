using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SuperMercado.DataAccess.Data.Repository
{
    public interface UContainer_Work_Repository:IDisposable
    {
        Pais_Repository Pais { get; }
        Categoria_Repository Categoria { get; }
        SubCategoria_Repository SubCategoria { get; }
        Sucursal_Repository Sucursal { get; }
        Departamento_Repository Departamento { get; }
        Municipio_Repository Municipio { get; }
        Cliente_Repository Cliente { get; }
        Empleado_Repository Empleado { get; }
        CargoLaboral_Repository CargoLaboral { get; }
        Producto_Repository Producto { get; }
        Proveedor_Repository Proveedor { get; }
        Compra_Repository Compra { get; }
        Venta_Repository Venta { get; }
        Usuario_Repository Usuario { get; }
        Slider_Repository Slider { get; }
        Ofertas_Repository Ofertas { get; }
        DetallesVenta_Repository DetallesVenta { get; }

        void Save();
    }
}
