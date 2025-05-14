using System.Net.Mail;
using System.Net;


    public class EmailProvider
    {
        private readonly IConfiguration _configuration;
        public EmailProvider(IConfiguration configuration) {

        _configuration = configuration;
        }   
        public void SendEmail(string toEmail, string subject, string body)
        {   
            
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(_configuration["Email:EmailAddress"], _configuration["Email:AppPassword"]),
                EnableSsl = true,
            };
            
        if (_configuration["Email:EmailAddress"] != null)
        {

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["Email:EmailAddress"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            
            mailMessage.To.Add(toEmail);
            smtpClient.Send(mailMessage);
        }
        
        }
        
    }

