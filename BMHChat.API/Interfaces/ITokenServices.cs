using BMHChat.API.Entities;

namespace BMHChat.API.Interfaces
{
    public interface ITokenServices
    {
        string CreateToken(AppUser user);
    }
}
