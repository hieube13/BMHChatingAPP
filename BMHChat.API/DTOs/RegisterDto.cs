﻿using System.ComponentModel.DataAnnotations;

namespace BMHChat.API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string KnowAs { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime DateOfbirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
