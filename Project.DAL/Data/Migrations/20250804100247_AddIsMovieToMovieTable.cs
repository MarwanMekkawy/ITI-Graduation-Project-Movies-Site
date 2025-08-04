using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIsMovieToMovieTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMovie",
                table: "Movies",
                type: "bit",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMovie",
                table: "Movies");
        }
    }
}
