using BMHChat.API.Data;
using BMHChat.API.Helpers;
using BMHChat.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BMHChat.API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
            {
                var connection = config.GetConnectionString("BMHChating");
                options.UseSqlServer(connection);
            });
            services.AddCors();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

            return services;
        }
    }
}
