using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LostnFound.Models
{
    [Table("users")] // Maps to your table name
    public class User
    {
        [Key]
        [Column("user_id")]
        [StringLength(6)]
        public string UserId { get; set; }

        [Required]
        [Column("email")]
        [StringLength(50)]
        public string Email { get; set; }

        [Column("oauth_provider")]
        [StringLength(50)]
        public string? OAuthProvider { get; set; }

        [Column("oauth_id")]
        [StringLength(100)]
        public string? OAuthId { get; set; }

        [Column("password_hashed")]
        [StringLength(255)]
        public string? PasswordHashed { get; set; }

        [Required]
        [Column("first_name")]
        [StringLength(30)]
        public string FirstName { get; set; }

        [Required]
        [Column("last_name")]
        [StringLength(30)]
        public string LastName { get; set; }

        [Required]
        [Column("country_code")]
        [StringLength(5)]
        public string CountryCode { get; set; }

        [Required]
        [Column("phone_number")]
        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [Column("profile_picture")]
        [StringLength(255)]
        public string? ProfilePictureUrl { get; set; }
    }
}