
using backend.Data;
using backend.Respositories;
using backend.Respositories.Interfaces;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ApplicationDbContext>(options => {
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddScoped<IGameService, GameService>();
            builder.Services.AddScoped<IGameRepository, GameRepository>();
            builder.Services.AddSingleton<ISessionService, SessionService>();
            builder.Services.AddScoped<ISessionRepository, SessionRepository>();

            builder.WebHost.UseUrls("http://0.0.0.0:80");

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            // Apply migrations automatically
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                // Retry database migration logic
                var maxRetryCount = 5;
                var retryDelay = TimeSpan.FromSeconds(5);

                for (int attempt = 1; attempt <= maxRetryCount; attempt++)
                {
                    try
                    {
                        dbContext.Database.Migrate(); // Apply migrations
                        Console.WriteLine("Database connected and migrations applied successfully.");
                        break; // Exit loop on success
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Attempt {attempt} failed: {ex.Message}");
                        if (attempt == maxRetryCount)
                        {
                            throw; // Re-throw exception if all retries fail
                        }
                        Console.WriteLine("Retrying in 5 seconds...");
                        Thread.Sleep(retryDelay);
                    }
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowFrontend");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
