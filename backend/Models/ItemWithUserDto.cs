namespace _.Models
{
    public class ItemWithUserDto
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public DateOnly DateReported { get; set; }
        public string Location { get; set; }
        public string ImagePath { get; set; }
        public string ItemType { get; set; }
        public string Status { get; set; }

        // user info
        public string UserId { get; set; }
        public string ProfilePictureUrl { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
