using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class userimagenullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieEpisode_Movies_MovieId",
                table: "MovieEpisode");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieEpisode",
                table: "MovieEpisode");

            migrationBuilder.RenameTable(
                name: "MovieEpisode",
                newName: "MovieEpisodes");

            migrationBuilder.RenameIndex(
                name: "IX_MovieEpisode_MovieId",
                table: "MovieEpisodes",
                newName: "IX_MovieEpisodes_MovieId");

            migrationBuilder.AlterColumn<string>(
                name: "UserImage",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieEpisodes",
                table: "MovieEpisodes",
                column: "EpisodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieEpisodes_Movies_MovieId",
                table: "MovieEpisodes",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieEpisodes_Movies_MovieId",
                table: "MovieEpisodes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieEpisodes",
                table: "MovieEpisodes");

            migrationBuilder.RenameTable(
                name: "MovieEpisodes",
                newName: "MovieEpisode");

            migrationBuilder.RenameIndex(
                name: "IX_MovieEpisodes_MovieId",
                table: "MovieEpisode",
                newName: "IX_MovieEpisode_MovieId");

            migrationBuilder.AlterColumn<string>(
                name: "UserImage",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieEpisode",
                table: "MovieEpisode",
                column: "EpisodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieEpisode_Movies_MovieId",
                table: "MovieEpisode",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "MovieId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
