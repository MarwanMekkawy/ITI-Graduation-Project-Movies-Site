
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Project.BLL.Extentions;
using Project.BLL.Mappings;
using Project.DAL.Data;
using System.Text;

namespace ITI_Graduation_Project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            //DI services extention method call
            builder.Services.AddApplicationServices(builder.Configuration);

            //automapper config
            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingConfig>();
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //authintication
            builder.Services.AddAuthentication(cfg => cfg.DefaultAuthenticateScheme = "AuthSchema").AddJwtBearer("AuthSchema", option =>
            {
                var key = Encoding.ASCII.GetBytes("jhnaksdhndjbajhasdjhaskhdasjdhasjdhkasjdhjkhasdjh");
                var securitykey = new SymmetricSecurityKey(key);
                option.TokenValidationParameters=new TokenValidationParameters()
                {
                    IssuerSigningKey=securitykey,
                    ValidateAudience=false,
                    ValidateIssuer=false,
                };
            });

            //cors policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
