using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using LostnFound.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly DBproductsContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(DBproductsContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST: api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return BadRequest("Email already exists");

        var user = new User
        {
            UserId = GenerateUserId(),
            Email = request.Email,
            PasswordHashed = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            CountryCode = request.CountryCode,
            PhoneNumber = request.PhoneNumber
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { user.UserId, user.Email });
    }

    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto request)
    {
        // Find user by email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
            return BadRequest(new { message = "Invalid credentials" });

        // Verify password (using the hashed password from your SQL schema)
        if (!VerifyPasswordHash(request.Password, user.PasswordHashed))
            return BadRequest(new { message = "Invalid credentials" });

        // Generate JWT token
        var token = GenerateJwtToken(user);

        return Ok(new
        {
            user.UserId,
            user.Email,
            user.FirstName,
            user.LastName,
            Token = token
        });
    }

    // POST: api/auth/oauth (for Google/Facebook/Apple login)
    [HttpPost("oauth")]
    public async Task<IActionResult> OAuthLogin(OAuthRequest request)
    {
        // Find user by OAuth provider and ID
        var user = await _context.Users
            .FirstOrDefaultAsync(u =>
                u.OauthProvider == request.Provider &&
                u.OauthId == request.ProviderId);

        if (user == null)
        {
            // Create new user if not exists
            user = new User
            {
                UserId = GenerateUserId(),
                Email = request.Email,
                OauthProvider = request.Provider,
                OauthId = request.ProviderId,
                FirstName = request.FirstName,
                LastName = request.LastName
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        // Generate JWT token
        var token = GenerateJwtToken(user);

        return Ok(new
        {
            user.UserId,
            user.Email,
            user.FirstName,
            user.LastName,
            Token = token
        });
    }

    // Helper methods
    private bool VerifyPasswordHash(string password, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, storedHash);
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            },
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateUserId()
    {
        return Guid.NewGuid().ToString().Substring(0, 6);
    }
}

// DTOs kept in this file (alternative to separate files)
public class OAuthRequest
{
    public string Provider { get; set; } // "google", "facebook", "apple"
    public string ProviderId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}