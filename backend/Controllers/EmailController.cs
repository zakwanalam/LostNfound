using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Azure.Core;
using System.Security.Claims;
using LostnFound.Models;
using _.Models;
using Microsoft.VisualBasic;


public class EmailRequest
{
    public string To { get; set; }
    public string ItemId { get; set; }
    public string ItemName { get; set; }
    public string ItemImageUrl { get; set; }
    public string ClaimerId { get; set; }
    public string ClaimerName { get; set; }
    public string ClaimerEmail { get; set; }
    public string PhoneNumber { get; set; }
}

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly DBproductsContext _context;

    public EmailController(IConfiguration configuration, DBproductsContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("sendemail")]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)

    {
        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(request));

        var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailTemplate.html");
        string htmlBody = System.IO.File.ReadAllText(templatePath);
        htmlBody = htmlBody
            .Replace("{{ITEM_NAME}}", request.ItemName)
            .Replace("{{ITEM_ID}}", request.ItemId)
            .Replace("{{ITEM_IMAGE_URL}}", request.ItemImageUrl)
            .Replace("{{CLAIMER_NAME}}", request.ClaimerName)
            .Replace("{{CLAIMER_EMAIL}}", request.ClaimerEmail)
            .Replace("{{CLAIMER_PHONE}}", request.PhoneNumber);

        UserClaim claim = new UserClaim
        {
            ItemID=  Convert.ToInt32(request.ItemId),
            ClaimantID = request.ClaimerId,
            ClaimDate = DateTime.Now,
            ClaimStatus = "Pending",
        };
        try
        {
            _context.UserClaim.Add(claim);
            await _context.SaveChangesAsync();
        }
        catch(Exception e)
        {
            return Ok(new {error=e.Message,msg="Claim already exists" });
        }
        try
        {
            var subject = "Claim Request";
            EmailProvider emailService = new EmailProvider(_configuration);
            emailService.SendEmail(request.To, subject, htmlBody);
        }
        catch(Exception e){ 
            return BadRequest(new{error=e.Message,msg="Could not send email"});
        }

        return Ok(new { message = "Email sent successfully." });
    }
       
}
   

