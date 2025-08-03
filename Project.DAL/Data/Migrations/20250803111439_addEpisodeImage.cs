using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class addEpisodeImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "MovieEpisode");

            migrationBuilder.AddColumn<string>(
                name: "EpisodeImage",
                table: "MovieEpisode",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EpisodeImage",
                table: "MovieEpisode");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "MovieEpisode",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
