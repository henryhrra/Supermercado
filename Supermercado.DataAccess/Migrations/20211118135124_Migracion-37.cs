using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMercado.DataAccess.Migrations
{
    public partial class Migracion37 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "buscarEn",
                table: "Ofertas");

            migrationBuilder.AddColumn<DateTime>(
                name: "fecha_De_inicio",
                table: "Ofertas",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "fecha_De_inicio",
                table: "Ofertas");

            migrationBuilder.AddColumn<string>(
                name: "buscarEn",
                table: "Ofertas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
