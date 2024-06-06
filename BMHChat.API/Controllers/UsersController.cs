using AutoMapper;
using BMHChat.API.Data;
using BMHChat.API.DTOs;
using BMHChat.API.Entities;
using BMHChat.API.Extensions;
using BMHChat.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BMHChat.API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _contex;
        private readonly IUserRepository _userRrepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) 
        { 
            _userRrepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;
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


        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //var user = await _userRrepository.GetUserByUserNameAsync(username);
            //var result = _mapper.Map<MemberDto>(user);

            //return Ok(result);

            return await _userRrepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.GetUserName();

            var user = await _userRrepository.GetUserByUserNameAsync(username);

            _mapper.Map(memberUpdateDto, user);

            _userRrepository.Update(user);

            if(await _userRrepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userRrepository.GetUserByUserNameAsync(User.GetUserName());

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };

            if(user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if(await _userRrepository.SaveAllAsync() )
            {
                //return _mapper.Map<PhotoDto>(photo);

                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Probelem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRrepository.GetUserByUserNameAsync(User.GetUserName());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if(photo.IsMain)
            {
                return BadRequest("This is already tour main photo");
            }

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);

            if(currentMain != null)
            {
                currentMain.IsMain = false;
            }

            photo.IsMain = true;

            if(await _userRrepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRrepository.GetUserByUserNameAsync(User.GetUserName());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("you cannot delete your main photo");

            if(photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if(await _userRrepository.SaveAllAsync())
            {
                return Ok(); 
            }

            return BadRequest("Failed to delete photo"); 
        }

    }
}
