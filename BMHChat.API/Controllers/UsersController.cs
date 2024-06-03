using BMHChat.API.Data;
using BMHChat.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMHChat.API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _contex;
        public UsersController(DataContext contex) 
        { 
            _contex = contex;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _contex.Users.ToListAsync();

            return users;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _contex.Users.FindAsync(id);

        }

    }
}
