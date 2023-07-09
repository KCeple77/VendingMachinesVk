using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;
using System.Net;

namespace VendingMachinesSysWebApp.Services
{
    public class EmailSender : IEmailSender
    {

        private const string myEmail = "kceple7@gmail.com";
        private const string myEmailPassword = "qudqpwfjojjvyowa";

        public EmailSender()
        {}

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            using var client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential(EmailSender.myEmail, EmailSender.myEmailPassword)
            };

            var mailMessage = new MailMessage(EmailSender.myEmail, email, subject, htmlMessage)
            {
                IsBodyHtml = true
            };

            await client.SendMailAsync(mailMessage);
        }
    }
}
