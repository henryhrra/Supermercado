using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMercado.DataAccess.Migrations
{
    public partial class Migracion39 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "descripcion",
                table: "Ofertas",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "descripcion",
                table: "Ofertas");
        }
    }
}
