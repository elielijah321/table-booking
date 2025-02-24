using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddDefaultOffering : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DefaultOfferingName",
                schema: "dbo",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DefaultOfferingPrice",
                schema: "dbo",
                table: "Businesses",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultOfferingName",
                schema: "dbo",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "DefaultOfferingPrice",
                schema: "dbo",
                table: "Businesses");
        }
    }
}
