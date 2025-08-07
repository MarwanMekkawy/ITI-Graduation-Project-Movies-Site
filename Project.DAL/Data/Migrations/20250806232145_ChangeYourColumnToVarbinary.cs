using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project.DAL.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeYourColumnToVarbinary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "UserImage",
                table: "Users",
                type: "VARBINARY(MAX)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserImage",
                table: "Users",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "VARBINARY(MAX)",
                oldNullable: true);
        }
    }
}
