using _.Models;
using LostnFound.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace _.Controllers
{
    public partial class SaveItemRequest
    {
        public string UserId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public DateOnly DateReported { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public  IFormFile file { get; set; }
    }

    [ApiController]
    [Route("api/item")]
    public class ItemController:ControllerBase
    {
        private readonly DBproductsContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public ItemController(IHttpClientFactory httpClientFactory, DBproductsContext context, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("getItems")]
        public async Task<IActionResult> GetItems()
        {
            if (_context.Items == null)
            {
                return NotFound("Item Not found");
            }

            var itemsWithUsers = await _context.Items
           .Include(i => i.User)   
           .Select(i => new ItemWithUserDto
           {
               ItemId = i.ItemId,
               ItemName = i.ItemName,
               Description = i.Description,
               DateReported = i.DateReported,
               Location = i.Location,
               ImagePath = i.ImagePath,
               ItemType = i.ItemType,
               Status = i.Status,
               UserId = i.User.UserId,
               FirstName = i.User.FirstName,
               LastName = i.User.LastName,
               Email = i.User.Email,
               ProfilePictureUrl = i.User.ProfilePictureUrl,
               PhoneNumber = i.User.PhoneNumber
           })
           .ToListAsync();


            return Ok(itemsWithUsers);
        }
        [HttpPost("saveItem")]
        public async Task<IActionResult> saveItem([FromForm] SaveItemRequest request)
        {
            try
            {
                // Save file locally
                string uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadDirectory))
                {
                    Directory.CreateDirectory(uploadDirectory);
                }

                string filePath = Path.Combine(uploadDirectory, request.file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.file.CopyToAsync(stream);
                }

                // Generate accessible URL (adjust base URL/port if needed)
                string fileUrl = $"http://localhost:5086/Uploads/{request.file.FileName}";
                Console.WriteLine(fileUrl);

                //Save item to DB
                Item item = new Item
                {
                    ItemName = request.ItemName,
                    UserId  = request.UserId,
                    Description = request.Description,
                    DateReported = request.DateReported,
                    Location = request.Location,
                    ImagePath = fileUrl,
                    ItemType = "Lost", // set based on your UI/logic
                    Status = request.Status
                };

                _context.Items.Add(item);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Item saved successfully", fileUrl });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving item: {ex.Message}");
                return BadRequest("Error saving the item.");
            }
        }



    }
}
