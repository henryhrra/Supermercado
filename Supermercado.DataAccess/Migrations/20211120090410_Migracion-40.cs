using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMercado.DataAccess.Migrations
{
    public partial class Migracion40 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Producto_idProducto",
                table: "Venta");

            migrationBuilder.DropIndex(
                name: "IX_Venta_idProducto",
                table: "Venta");

            migrationBuilder.DropColumn(
                name: "idProducto",
                table: "Venta");

            migrationBuilder.CreateTable(
                name: "DetallesVenta",
                columns: table => new
                {
                    idDetallesVenta = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cantidad = table.Column<int>(maxLength: 100, nullable: false),
                    descuento = table.Column<float>(nullable: false),
                    idVenta = table.Column<int>(nullable: false),
                    idProducto = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetallesVenta", x => x.idDetallesVenta);
                    table.ForeignKey(
                        name: "FK_DetallesVenta_Producto_idProducto",
                        column: x => x.idProducto,
                        principalTable: "Producto",
                        principalColumn: "idProducto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetallesVenta_Venta_idVenta",
                        column: x => x.idVenta,
                        principalTable: "Venta",
                        principalColumn: "idVenta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetallesVenta_idProducto",
                table: "DetallesVenta",
                column: "idProducto");

            migrationBuilder.CreateIndex(
                name: "IX_DetallesVenta_idVenta",
                table: "DetallesVenta",
                column: "idVenta");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetallesVenta");

            migrationBuilder.AddColumn<int>(
                name: "idProducto",
                table: "Venta",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Venta_idProducto",
                table: "Venta",
                column: "idProducto");

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Producto_idProducto",
                table: "Venta",
                column: "idProducto",
                principalTable: "Producto",
                principalColumn: "idProducto",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
