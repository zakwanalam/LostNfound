namespace LostnFound.Models;

public class UserRegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string CountryCode { get; set; }
    public string PhoneNumber { get; set; }
}