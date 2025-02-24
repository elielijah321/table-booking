using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class Initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reservations_BusinessId",
                schema: "dbo",
                table: "Reservations",
                column: "BusinessId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Businesses_BusinessId",
                schema: "dbo",
                table: "Reservations",
                column: "BusinessId",
                principalSchema: "dbo",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Businesses_BusinessId",
                schema: "dbo",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_BusinessId",
                schema: "dbo",
                table: "Reservations");
        }
    }
}
