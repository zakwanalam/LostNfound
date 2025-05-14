using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using _.Models;
using LostnFound.Models;

namespace LostnFound.Models
{
    [Table("Claims")]
    public class UserClaim
    {
        [Key]
        public int ClaimID { get; set; }
        public int ItemID { get; set; }
        [Required, StringLength(6)]
        public string ClaimantID { get; set; }
        public DateTime ClaimDate { get; set; } = DateTime.Now;

        [Required, StringLength(20)]
        public string ClaimStatus { get; set; }
        public virtual Item Item { get; set; }
        public virtual User Claimant { get; set; }
    }
}
