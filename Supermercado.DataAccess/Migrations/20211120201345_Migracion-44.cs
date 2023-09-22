using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMercado.DataAccess.Migrations
{
    public partial class Migracion44 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aprovada",
                table: "Venta");

            migrationBuilder.AddColumn<bool>(
                name: "Aprobada",
                table: "Venta",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aprobada",
                table: "Venta");

            migrationBuilder.AddColumn<bool>(
                name: "Aprovada",
                table: "Venta",
                type: "bit",
                nullable: true);
        }
    }
}
