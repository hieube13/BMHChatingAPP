using AutoMapper;
using BMHChat.API.Data;
using BMHChat.API.DTOs;
using BMHChat.API.Entities;
using BMHChat.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMHChat.API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _contex;
        private readonly IUserRepository _userRrepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper) 
        { 
            _userRrepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //var users = await _userRrepository.getUsersAsync();
            //var result = _mapper.Map<IEnumerable<MemberDto>>(users);

            //return Ok(result);

            var users = await _userRrepository.GetMembersAsync();

            return Ok(users);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //var user = await _userRrepository.GetUserByUserNameAsync(username);
            //var result = _mapper.Map<MemberDto>(user);

            //return Ok(result);

            return await _userRrepository.GetMemberAsync(username);
        }

    }
}
