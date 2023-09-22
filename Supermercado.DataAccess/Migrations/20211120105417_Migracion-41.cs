using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMercado.DataAccess.Migrations
{
    public partial class Migracion41 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Cliente_idCliente",
                table: "Venta");

            migrationBuilder.DropColumn(
                name: "Cantidad",
                table: "Venta");

            migrationBuilder.DropColumn(
                name: "Descripcion",
                table: "Venta");

            migrationBuilder.AlterColumn<string>(
                name: "idCliente",
                table: "Venta",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_AspNetUsers_idCliente",
                table: "Venta",
                column: "idCliente",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_AspNetUsers_idCliente",
                table: "Venta");

            migrationBuilder.AlterColumn<int>(
                name: "idCliente",
                table: "Venta",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cantidad",
                table: "Venta",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Descripcion",
                table: "Venta",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Cliente_idCliente",
                table: "Venta",
                column: "idCliente",
                principalTable: "Cliente",
                principalColumn: "idCliente",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
