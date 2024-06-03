using BMHChat.API.Data;
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


            return services;
        }
    }
}
