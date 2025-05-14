using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using LostnFound.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.SqlServer;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using _.Models;

public class FacebookSignupRequest
{
    public string accessToken { get; set; }
    public string countryCode { get; set; }
    public string phoneNumber { get; set; }
}


public class FacebookLoginRequest
{
    public string accessToken { get; set; }
}


public class FacebookDebugData
{
    public string AppId { get; set; }
    public string Type { get; set; }
    public string Application { get; set; }
    public long DataAccessExpiresAt { get; set; }
    public long ExpiresAt { get; set; }
    public bool IsValid { get; set; }
    public List<string> Scopes { get; set; }
    public string UserId { get; set; }
}


public class FacebookUserData
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public Picture Picture { get; set; }
}

public class Picture
{
    [JsonPropertyName("data")]
    public required PictureData PictureData { get; set; }
}

public class PictureData
{
    public int Height { get; set; }

    [JsonPropertyName("is_silhouette")]
    public bool IsSilhouette { get; set; }
    public string Url { get; set; }
    public int Width { get; set; }
}

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly DBproductsContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public AuthController(IHttpClientFactory httpClientFactory, DBproductsContext context, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
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

    [HttpPost("verifyToken")]
    public async Task<IActionResult> VerifyToken()
    {
        var token = Request.Cookies["AuthToken"];
        Console.WriteLine(token);
        if (string.IsNullOrEmpty(token))
        {
            return Unauthorized(new { error = "Missing token", msg = "No AuthToken cookie found" });
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var validationsParams = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidAudience = _configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]))
        };

        tokenHandler.ValidateToken(token, validationsParams, out var validatedToken);
        try
        {
            if (validatedToken != null)
            {
               return Ok(new { msg = "Token verified successfully" });
            }
            else
            {
                throw new SecurityTokenException("Invalid Security Token");
            }
        }
        catch(SecurityTokenException ex) {
            return Unauthorized(new { error = ex.Message, msg = "Token validation failed" });
        }
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
        HttpContext.Response.Cookies.Append("AuthToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddHours(24),
            Domain = "localhost"
        });
        return Ok(new
        {
            user.UserId,
            user.Email,
            user.FirstName,
            user.LastName,
            user.CountryCode,
            user.PhoneNumber,
            user.ProfilePictureUrl
        });
    }
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        Response.Cookies.Append("AuthToken", "", new CookieOptions
        {
            Expires = DateTime.UtcNow.AddDays(-1), 
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Domain = "localhost"
        });

        return Ok(new { msg = "Logged out successfully" });
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
    //Facebook
    private string GenerateUserId()
    {
        return Guid.NewGuid().ToString().Substring(0, 6);
    }

    [HttpPost("facebook")]
    public async Task<IActionResult> FacebookLogin([FromBody] FacebookSignupRequest request)
    {
        Console.WriteLine(request.phoneNumber);
        var client_id = _configuration["FacebookConfig:FacebookAppID"];
        var client_secret = _configuration["FacebookConfig:FacebookClientSecret"];
         
        var client = _httpClientFactory.CreateClient();
        string userDataUrl = $"https://graph.facebook.com/me?fields=id,name,email,picture&access_token={request.accessToken}";
        //Makes a get request call to the userInfoUrl
        try
        {
            var facebookUserData = await client.GetFromJsonAsync<FacebookUserData>(userDataUrl);

            User user = new User
            {
                UserId = GenerateUserId(),
                Email = facebookUserData.Email,
                OAuthProvider = "Facebook",
                OAuthId = client_id,
                FirstName = facebookUserData.Name.Split(" ")[0],
                LastName = facebookUserData.Name.Split(" ")[1],
                CountryCode = request.countryCode,
                PhoneNumber = request.phoneNumber,
                ProfilePictureUrl = facebookUserData.Picture.PictureData.Url
            };

            var doesUserExist = await _context.Users.AnyAsync(u => u.Email == user.Email);
            if (!doesUserExist)
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                var token = GenerateJwtToken(user);
                HttpContext.Response.Cookies.Append("AuthToken", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddHours(24),
                    Domain = "localhost"
                });
                return Ok(user);
            }
            else
            {
                throw new Exception("Email Already Exists");
            }

        }
        catch (Exception e)
        {
            return StatusCode(500, new { error = e.Message, msg = "Failed to Register" });
        }
    }

    [HttpPost("loginFacebook")]
    public async Task<IActionResult> LoginFacebook([FromBody] FacebookLoginRequest request)
    {
        var client_id = _configuration["FacebookConfig:FacebookAppID"];
        var client_secret = _configuration["FacebookConfig:FacebookClientSecret"];

        var client = _httpClientFactory.CreateClient();
        string userDataUrl = $"https://graph.facebook.com/me?fields=id,name,email,picture&access_token={request.accessToken}";
        //Makes a get request call to the userInfoUrl
        try
        {
            var facebookUserData = await client.GetFromJsonAsync<FacebookUserData>(userDataUrl);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == facebookUserData.Email);
            if (user!=null)
            {
                var token = GenerateJwtToken(user);
                HttpContext.Response.Cookies.Append("AuthToken", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddHours(24),
                    Domain = "localhost"
                });
                return Ok(user);
            }
            else
            {
                throw new Exception("User is not registered");
            }

        }
        catch (Exception e)
        {
            return StatusCode(500, new { error = e.Message, msg = "Failed to Register" });
        }
    }
}
